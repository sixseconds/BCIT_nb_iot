var express = require("express");
var AWS = require("aws-sdk");
var cors = require("cors");
var bodyParser = require("body-parser");

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
  region: "us-west-2"
});
var docClient = new AWS.DynamoDB.DocumentClient();

app.post("/aws_query_devices", (req, res) => {
  // check if required parameters in request body exist
  if (
    req.body.parameters &&
    req.body.start_timestamp &&
    req.body.end_timestamp &&
    req.body.devices
  ) {
    var response_arr = [];

    for (let i = 0; i < req.body.devices.length; i++) {
      let ProjectionExpression = req.body.parameters.join(", ");

      if (req.body.parameters.indexOf("temp") != -1)
        ProjectionExpression = ProjectionExpression.replace("temp", "#temp");

      let params = {
        TableName: "nb_iot",
        ProjectionExpression: ProjectionExpression,
        KeyConditionExpression:
          "deviceID = :device AND tsAWS BETWEEN :tsStart AND :tsEnd",
        ExpressionAttributeValues: {
          ":device": req.body.devices[i],
          ":tsStart": req.body.start_timestamp,
          ":tsEnd": req.body.end_timestamp
        }
      };

      if (req.body.parameters.indexOf("temp") != -1)
        params.ExpressionAttributeNames = {
          "#temp": "temp"
        };

      docClient.query(params, function(err, data) {
        if (err) {
          console.error(
            "Unable to query. Error:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("Query succeeded.");
          let dataObj = {
            deviceID: req.body.devices[i]
          };
          req.body.parameters.forEach(p => {
            dataObj[p] = data.Items.map(item => item[p]);
          });
          response_arr.push(dataObj);

          if (response_arr.length == req.body.devices.length)
            res.json(response_arr);
        }
      });
    }
  } else {
    res.status(400);
    res.send(
      "Bad request. Please change your request to include the right fields in the body."
    );
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
