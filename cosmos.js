const cosmos = require("@azure/cosmos");
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

/* 
* unixToDate converts a unix timestamp in Seconds into a Date object
*/
function unixToDate(unixtime) {
    return new Date(unixtime * 1000);
}

/* 
* dateToUnix converts a date string to a unix timestamp in Seconds by making a date object
*/
function dateToUnix(date) {
    return parseInt((new Date(date).getTime() / 1000).toFixed(0));
}

/*
* 
*/
async function getData(start_timestamp, end_timestamp) {
    const QUERY_COLUMNS = "c.Device, c._ts as Timestamp, c.Temperature, c.Humidity, c.Pressure, c.Mag1, c.Mag2, c.Mag3";
    const WHERE_FILTER = "WHERE (c._ts BETWEEN @DATE_FROM AND @DATE_TO)";
    let querySpec = {
        query: `SELECT TOP @MAX_NUMBER ${QUERY_COLUMNS} FROM c ${WHERE_FILTER}`,
        parameters: [
            {"name": "@MAX_NUMBER", "value": 400},
            {"name": "@DATE_FROM", "value": start_timestamp},
            {"name": "@DATE_TO", "value": end_timestamp},
        ]
    };

    let database = await client.database(databaseId);
    let container = await database.container(containerId);
    let items = await container.items.query(querySpec, queryOptions).fetchAll();

    let data = items.resources;
    // for(let i = 0; i < data.length; i++) {
    //     let device = data[i];
    //     console.log(unixToDate(device.Timestamp));
    //     console.log("Device #" +(i+1)+ " is: " + JSON.stringify(device));
    // }
    return data
};


async function handleError(error) {
    console.log("\nAn error with code '" + error.code + "' has occurred:");
    console.log("\t" + error.body || error);
	console.log(error);
}
module.exports = {
    getData: async (start_date, end_date) => {
        let start_time = dateToUnix(start_date || "2020.02.26");
        let end_time = dateToUnix(end_date || "2020.02.27");
        console.log("Start time: " + start_time + "\nEnd time: " + end_time);
        
        data = await getData(1582675200, 1582910703).catch(handleError);
        return data
    }

  };
  


let start_time = dateToUnix("2020.02.26");
let end_time = dateToUnix("2020.02.27");
// console.log("Start time: " + start_time + "\nEnd time: " + end_time);

getData(start_time, end_time).catch(handleError).then(data => {
    console.log(data);
});
// getData(start_time, end_time).catch(handleError);