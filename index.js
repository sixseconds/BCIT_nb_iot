var app = require('express');
var AWS = require('aws-sdk');

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

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "id": "1",
        "device": "device1"
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});




