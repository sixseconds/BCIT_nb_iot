var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://nb-iot:e3SUOf0p3Vnd6FVzQdPgkHR8zL3GBoRblxYYDp30wZ8zXoQNRUeJHKAwYOqbrUatiOFjdPFkiHMzVBn1nCGyZw==@nb-iot.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@nb-iot@';
var query = { "deviceID" : "NB-IOT Level 3", "tsAzure" : { $gt :  1583971831, $lt : 1583971931 }}
var findData = function(db, callback) {
    var cursor =db.collection('nbIOTstore').find( query).project({"mag1":0, "mag2":0, "mag3":0} );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
    };

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db('nbIOT');
    findData(db, function() {
        console.log("done");
    });
    });