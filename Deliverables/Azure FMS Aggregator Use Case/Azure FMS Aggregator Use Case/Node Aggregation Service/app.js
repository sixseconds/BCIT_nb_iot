/**
 *	Node Aggregation Service
 *  This application queries an Azure CosmosDB, and returns the value
 *  of the most recent record for each given device. 
 *  Contact: cervantes.jfa@gmail.com
 **/


//@ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
const url = require('url')
const endpoint = config.endpoint
const key = config.key
const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/Country'] }
const client = new CosmosClient({ endpoint, key })


/**
 * Application specific variables
 */
var nucleoboard2km;
var nucleoboard3km;
var date = new Date();

/**
 * Variables to make sure we transmit the same format as the other devices
 */
 
var ObjectName = "Aggregator";
var ObjectType = "Aggregation Service";
var Version = "Node Aggregator v1";
var ReportingDevice = "N/A";
var location = {
  "lat": "",
  "lon": ""
 };
var GPSTime = "N/A";
var GPSDate = "N/A";
var Temperature = "N/A";
var Humidity = "N/A";
var Pressure = "N/A";
var Tilt = "N/A";
var ButtonPress = "N/A";
var TOD = date.toLocaleString;
var TotalKMToday = "N/A";
var sentMsgs = 0;
// Adding the specific fields for this device, this will appear as N/A unless you are this device
var fleetKM = 1.0;
var fleetCost = 1.0;

/** 
 * Sending transmission code to move data to IoT Hub, this will get picked up by the FunctionApp service
 * The method which actually handles the sending is in the aggregateKms function. Replace the connection string with your own IoT Central
 */
var connectionString = 'HostName=iotc-000c0e58-161c-4800-b262-e83ffb100c36.azure-devices.net;DeviceId=8100acbe-8715-4d0b-bdad-edbdc19524c9;SharedAccessKey=2sR9rrAgsTKIT0g/BVG2k5O5DFMeyx84FuZD615mSgg=';
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;
var clientSend = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**
 * Create the database if it does not exist
 */
async function createDatabase() {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId
  })
  //console.log(`Created database:\n${database.id}\n`)
}

/**
 * Read the database definition
 */
async function readDatabase() {
  const { resource: databaseDefinition } = await client
    .database(databaseId)
    .read()
  //console.log(`Reading database:\n${databaseDefinition.id}\n`)
}

/**
 * Create the container if it does not exist
 */
async function createContainer() {
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    )
  //console.log(`Created container:\n${config.container.id}\n`)
}

/**
 * Read the container definition
 */
async function readContainer() {
  const { resource: containerDefinition } = await client
    .database(databaseId)
    .container(containerId)
    .read()
  //console.log(`Reading container:\n${containerDefinition.id}\n`)
}


/**
 * Cleanup the database and collection on completion
 */
async function cleanup() {
  await client.database(databaseId).delete()
}

/**
 * Exit the app with a prompt
 * @param {string} message - The message to display
 */
function exit(message) {
  console.log(message)
  console.log('Press any key to exit')
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', process.exit.bind(process, 0))
}


/**
 * Calls for the latest transmission received from device NUCLEOBOARD2
 * It would be more efficient to run one query which returns all records where 
 * you collect the latest transmission from each unique ObjectName, however
 * I was not able to implement this during the 2019 project term.
 */
async function executeQuery1() {
	console.log();
	
	const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query('SELECT TOP 1 r.ObjectName, r.TotalKMToday, r._ts FROM root r WHERE r.ObjectName = "NUCLEOBOARD2"  ORDER BY r._ts DESC') // Replace with your own
    .fetchAll();
	
	console.log(results);
	nucleoboard2km = results[0]["TotalKMToday"];

}


/**
 * Calls for the latest transmission received from device NUCLEOBOARD3
 * It would be more efficient to run one query which returns all records where 
 * you collect the latest transmission from each unique ObjectName, however
 * I was not able to implement this during the 2019 project term.
 */
async function executeQuery2() {

	const { resources: results } = await client
		.database(databaseId)
		.container(containerId)
		.items.query('SELECT TOP 1 r.ObjectName, r.TotalKMToday, r._ts FROM root r WHERE r.ObjectName = "NUCLEOBOARD3"  ORDER BY r._ts DESC') // Replace with your own
		.fetchAll();
		
		
	console.log(results);
	nucleoboard3km = (results[0]["TotalKMToday"]);
	console.log();
	
}


/**
 * This function takes the totalKMs for each device, and adds them together 
 * and stores them in variable totalKM. Then, the message is sent.
 */
function aggregateKms () {

	// This manages message sending
	setInterval(function(){
	// Simulate telemetry.
		sentMsgs++;
		executeQuery1();
		executeQuery2();
		fleetKM = parseFloat(nucleoboard2km) + parseFloat(nucleoboard3km) * 1000;
		fleetCost = fleetKM * .54;
		var message = new Message(JSON.stringify({
			ObjectName : ObjectName,
			ObjectType : ObjectType,
			Version : Version,
			ReportingDevice : ReportingDevice,
			location : location,
			GPSTime : GPSTime,
			GPSDate : GPSDate,
			Temperature : Temperature,
			Humidity : Humidity,
			Pressure : Pressure,
			Tilt : Tilt,
			ButtonPress : ButtonPress,
			TOD : new Date().toLocaleString(),
			TotalKMToday : TotalKMToday,
			sentMsgs : sentMsgs,
			fleetKM : fleetKM,
			fleetCost : fleetCost
		}));

		console.log('Sending message: ' + message.getData());

		// Send the message.
		clientSend.sendEvent(message, function (err) {
			if (err) {
				console.error('send error: ' + err.toString());
			} else {
				console.log("Message sent at: " + new Date().toLocaleString());
			}
			});
	}, 3000); // Sends every 3000ms
}



/**
 * This drives the program and queries the devices, but will enter a setInterval 
 * loop at aggregateKms which runs the transmission every 15000ms
 */
createDatabase()
  .then(() => readDatabase())
  .then(() => createContainer())
  .then(() => readContainer())
  .then(() => aggregateKms())
  .then(() => {
    exit(`Completed successfully - transmission reports will display as they are sent...`)
  })
  .catch(error => {
    exit(`Completed with error ${JSON.stringify(error)}`)
})
