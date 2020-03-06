var express = require('express');
var AWS = require('aws-sdk');
var cosmos = require("@azure/cosmos");
var cors = require('cors');
var bodyParser = require('body-parser');

//initial config
const PORT = 3010;
var app = express();

//use cors
app.use(cors());

//body parser for json
app.use(bodyParser.json());

//AWS
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2"});
var docClient = new AWS.DynamoDB.DocumentClient();

app.post('/aws_query_devices', (req, res) => {
    // check if required parameters in request body exist
    if (req.body.parameters && 
        req.body.start_timestamp && 
        req.body.end_timestamp &&
        req.body.devices) {
            var response_arr = [];
            
            for (let i = 0; i < req.body.devices.length; i++) {
                let ProjectionExpression = req.body.parameters.join(", ");
                
                if(req.body.parameters.indexOf("temp") != -1)
                    ProjectionExpression = ProjectionExpression.replace("temp", "#temp");
                
                let params = {
                    TableName: "nb_iot",
                    ProjectionExpression: ProjectionExpression,
                    KeyConditionExpression: "deviceID = :device AND tsAWS BETWEEN :tsStart AND :tsEnd",
                    ExpressionAttributeValues: {
                        ":device": req.body.devices[i],
                        ":tsStart": req.body.start_timestamp,
                        ":tsEnd": req.body.end_timestamp
                    }
                }
                
                if(req.body.parameters.indexOf("temp") != -1)
                    params.ExpressionAttributeNames = {
                        "#temp": "temp"
                    }
                
                docClient.query(params, function(err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Query succeeded.");
                        let dataObj = {
                            deviceID: req.body.devices[i],
                        }
                        req.body.parameters.forEach(p => {
                            dataObj[p] = data.Items.map(item => item[p])
                        });
                        response_arr.push(dataObj)
                        
                        if (response_arr.length == req.body.devices.length)
                            res.json(response_arr)
                    }
                });
                
            }
            
        } else {
            res.status(400);
            res.send('Bad request. Please change your request to include the right fields in the body.');
        }
})

// Cosmos
// COPIED FROM AWS
async function handleError(error) {
    console.log("\nAn error with code '" + error.code + "' has occurred:");
    console.log("\t" + error.body || error);
	console.log(error);
}
app.post('/azure_query_devices', async (req, res) => {
    // Connecting to cosmos
    const CosmosClient = cosmos.CosmosClient;
    const endpoint = "https://undergroundcosmos.documents.azure.com:443/";
    const masterKey = "XBJzouHSIAYeO3OhF7C2hasnUpqRR9xWcUECFcfQBGH58FVvKGkf1pK1liGxXDA9x5gtpq03q2ftb5hYErlusg=="; 
    const connectionString = `AccountEndpoint=${endpoint};AccountKey=${masterKey};`;
    const client = new CosmosClient(connectionString);
    const databaseId  = "outDatabase";
    const containerId  = "UndergroundData";

    const queryOptions = { 
        enableCrossPartitionQuery: true,
    };

    const MAX_ITEMS = 40;
    
    // check if required parameters in request body exist
    if (req.body.parameters && 
        req.body.start_timestamp && 
        req.body.end_timestamp &&   
        req.body.devices) {
            var response_arr = [];
            
            for (let i = 0; i < req.body.devices.length; i++) {
                // Columns in AWS are all lowercase versions of Azures
                let query_columns = req.body.parameters.map(x => "c." + x.charAt(0).toUpperCase() + x.slice(1)).join(", ");
                // let QUERY_COLUMNS = "c.Device, c._ts as Timestamp, c.Temperature, c.Humidity, c.Pressure, c.Mag1, c.Mag2, c.Mag3";
                
                // to match cosmos columns
                console.log("index of temp is: " + req.body.parameters.indexOf("temp"))
                if(req.body.parameters.indexOf("temp") != -1)
                    query_columns = query_columns.replace("c.Temp", "c.Temperature");
                if(req.body.parameters.indexOf("deviceID") != -1)
                    query_columns = query_columns.replace("c.DeviceID", "c.Device");
                if(req.body.parameters.indexOf("tsAWS") != -1)
                query_columns = query_columns.replace("c.TsAWS", "c._ts");

                console.log("query columns is: " + query_columns);
                
                
                const WHERE_FILTER = "WHERE c.Device = @DEVICE_ID AND (c._ts BETWEEN @DATE_FROM AND @DATE_TO)";
                let querySpec = {
                    query: `SELECT TOP @MAX_NUMBER ${query_columns} FROM c ${WHERE_FILTER}`,
                    parameters: [
                        {"name": "@MAX_NUMBER", "value": MAX_ITEMS},
                        {"name": "@DEVICE_ID", "value": req.body.devices[i]},
                        {"name": "@DATE_FROM", "value": req.body.start_timestamp},
                        {"name": "@DATE_TO", "value": req.body.end_timestamp},
                    ]
                };
                console.log("query spec is:");
                console.log(querySpec);
                
                

                // let params = {
                //     ProjectionExpression: ProjectionExpression,
                //     KeyConditionExpression: "deviceID = :device AND tsAWS BETWEEN :tsStart AND :tsEnd",
                //     ExpressionAttributeValues: {
                //         ":device": req.body.devices[i],
                //         ":tsStart": req.body.start_timestamp,
                //         ":tsEnd": req.body.end_timestamp
                //     }
                // }

                let database = await client.database(databaseId);
                let container = await database.container(containerId);
                let items = await container.items.query(querySpec, queryOptions).fetchAll();

                let data = items.resources;
                res.json(data);
                console.log(data)


                // docClient.query(params, function(err, data) {
                //     if (err) {
                //         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                //     } else {
                //         console.log("Query succeeded.");
                //         let dataObj = {
                //             deviceID: req.body.devices[i],
                //         }
                //         req.body.parameters.forEach(p => {
                //             dataObj[p] = data.Items.map(item => item[p])
                //         });
                //         response_arr.push(dataObj)
                        
                //         if (response_arr.length == req.body.devices.length)
                //             res.json(response_arr)
                //     }
                // });
                
            }
            
        } else {
            res.status(400);
            res.send('Bad request. Please change your request to include the right fields in the body.');
        }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


