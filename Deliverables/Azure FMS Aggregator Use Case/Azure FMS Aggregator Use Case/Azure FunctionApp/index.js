module.exports = function (context, IoTHubMessages) {
    //context.log(`JavaScript eventhub trigger function called for message array: ${JSON.stringify(IoTHubMessages)}`);
    var date = new Date();
    var ObjectName = "Aggregator";
    var ObjectType = "Aggregation Service";
    var Version = "Node Aggregator v1";
    var ReportingDevice = "N/A";
    var lat;
    var lon;
    var GPSTime;
    var GPSDate;
    var Temperature;
    var Humidity;
    var Pressure;
    var Tilt;
    var ButtonPress;
    var TOD;
    var TotalKMToday;
    var sentMsgs = 0;
    // Adding the specific fields for this device, this will appear as N/A unless you are this device
    var fleetKM = 1.0;
    var fleetCost = 1.0;

   IoTHubMessages.forEach(message => {
       context.log("Printing the raw message received...");
       context.log(JSON.stringify(message, null, 1));


        //context.log(`JavaScript eventhub trigger function called for message array: ${JSON.stringify(IoTHubMessages)}`);
        ObjectName = message.ObjectName;
        ObjectType = message.ObjectType;
        Version = message.Version;
        ReportingDevice = message.ReportingDevice;
        lat = message.location["lat"];
        lon = message.location["lon"];
        GPSTime = message.GPSTime;
        GPSDate = message.GPSTime;
        Temperature = message.Temperature;
        Humidity = message.Humidity;
        Pressure = message.Pressure;
        Tilt = message.Tilt;
        ButtonPress = message.ButtonPress;
        TOD = new Date().toLocaleString();
        TotalKMToday = message.TotalKMToday;
        sentMsgs = message.sentMsgs;
        // Adding the specific fields for this device, this will appear as N/A unless you are this device
        fleetKM = message.fleetKM;
        fleetCost = message.fleetCost;

    });

    var output = {

        "ObjectName": ObjectName,
        "ObjectType": ObjectType,
        "Version": Version,
        "ReportingDevice": ReportingDevice,
        "lat": lat,
        "lon": lon,
        "GPSTime": GPSTime,
        "GPSDate": GPSDate,
        "Temperature": Temperature,
        "Humidity": Humidity,
        "Pressure": Pressure,
        "Tilt": Tilt,
        "ButtonPress": ButtonPress,
        "TOD": TOD,
        "TotalKMToday": TotalKMToday,
        "sentMsgs": sentMsgs,
        "fleetKM" : fleetKM,
        "fleetCost" : fleetCost
    };

    //this will print your output object in a nicely formatted way:
       context.log(TOD);
       context.log(JSON.stringify(output, null, 1));

    context.bindings.outputDocument = JSON.stringify(output);

    context.done();
};