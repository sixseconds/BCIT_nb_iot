var express = require('express');
var AWS = require('aws-sdk');
var cors = require('cors');



var app = express();


app.use(cors());

// AWS.config.update({region: 'us-west-2'});

// var ddb = new AWS.DynamoDB.DocumentClient();

// console.log(ddb);

// var params = {
//     TableName: 'bcit-iot',
//     Key:{
//         HashKey: "1"
//     }
// };
  
// ddb.get(params, function(err, data) {
//     if (err) {
//         console.log("Error", err, err.stack);
//     } else {
//         console.log("Success", data);
//     }
// });

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "bcit-iot";

// var params = {
//     TableName:table,
//     Key:{
//         "id": Date.now()
//     }
// };

var params = {
    TableName: "bcit-iot",
    ProjectionExpression: "#id, device, humidity, #temp, pressure",
    FilterExpression: "#id between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#id": "id",
        "#temp": "temp"
    },
    ExpressionAttributeValues: {
         ":start_yr": (Date.now() - 100000).toString(),
         ":end_yr": (Date.now()).toString()
    }
}


app.get('/getdata', (req, res) => {
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("got item:", JSON.stringify(data, null, 2));
            res.json(data.Item);
        }
    });
})

app.listen(3010);


