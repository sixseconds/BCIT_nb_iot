Written by: Justin Cervantes
Contact: cervantes.jfa@gmail.com

This index.js was written for use by the aggregator service proof-of-concept.
This code is inserted into Azure FunctionApp - it is triggered when the receiving service
receives an event - it pushes data into its output binding, which in this case is a CosmosDB.
Configuration setts for setting the input trigger and output binding are set in the cloud.