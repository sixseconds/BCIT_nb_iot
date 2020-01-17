package com.blobs.quickstart;

import org.json.JSONObject;

public class DeviceReadings {

    public static final String DEVICE_ID = "connectionDeviceId";
    public static final String OBJECT_NAME = "ObjectName";
    public static final String OBJECT_TYPE = "ObjectType";
    public static final String VERSION = "Version";
    public static final String REPORTING_DEVICE = "ReportingDevice";
    public static final String MAG1 = "mag1";
    public static final String MAG2 = "mag2";
    public static final String MAG3 = "mag3";
    public static final String TEMPERATURE = "Temperature";
    public static final String HUMIDITY = "Humidity";
    public static final String PRESSURE = "Pressure";
    public static final String TILT = "Tilt";
    public static final String BUTTON_PRESS = "ButtonPress";
    public static final String TOD = "TOD";
    public static final String LOCATION = "location";
    public static final String LATITUDE = "lat";
    public static final String LONGITUDE = "lon";

    private String connectionDeviceId;
    private String objectName;
    private String objectType;
    private String version;
    private String reportingDevice;
    private float mag1;
    private float mag2;
    private float mag3;
    private float temperature;
    private float humidity;
    private float pressure;
    private float tilt;
    private boolean buttonPress;
    private String dateTime;
    private float latitude;
    private float longitude;

    private boolean locationExist;
    private boolean magExist;

    public DeviceReadings (String rawData) {
        locationExist = false;
        magExist = false;
        parseData(rawData);
    }

    /**
     * Retrieve data from the encrypted avro file
     *
     * @param rawData string of
     */
    private void parseData(String rawData) {
        String data = rawData.replace("\":\"", "");

        int dateTimeIdx = data.lastIndexOf(TOD) + TOD.length();
        int btnPressIdx = data.lastIndexOf(BUTTON_PRESS, dateTimeIdx) + BUTTON_PRESS.length();
        int tiltIdx = data.lastIndexOf(TILT, btnPressIdx) + TILT.length();
        int pressureIdx = data.lastIndexOf(PRESSURE, tiltIdx) + PRESSURE.length();
        int humidIdx = data.lastIndexOf(HUMIDITY, pressureIdx) + HUMIDITY.length();
        int tempIdx = data.lastIndexOf(TEMPERATURE, humidIdx) + TEMPERATURE.length();
        int mag3Idx = data.lastIndexOf(MAG3, tempIdx) + MAG3.length();
        int mag2Idx = data.lastIndexOf(MAG2, mag3Idx) + MAG2.length();
        int mag1Idx = data.lastIndexOf(MAG1, mag2Idx) + MAG1.length();
        int lonIdx = data.lastIndexOf(LONGITUDE, tempIdx) + LONGITUDE.length();
        int latIdx = data.lastIndexOf(LATITUDE, lonIdx) + LATITUDE.length();
        int rptDeviceIdx = data.lastIndexOf(REPORTING_DEVICE) + REPORTING_DEVICE.length();
        int versionIdx = data.lastIndexOf(VERSION, rptDeviceIdx) + VERSION.length();
        int objTypeIdx = data.lastIndexOf(OBJECT_TYPE, versionIdx) + OBJECT_TYPE.length();
        int objNameIdx = data.lastIndexOf(OBJECT_NAME, objTypeIdx) + OBJECT_NAME.length();
        int deviceIdIdx = data.indexOf(DEVICE_ID) + DEVICE_ID.length() + 1; // connectionDeviceIdH <- one extra H at the end

        connectionDeviceId = data.substring(deviceIdIdx, data.indexOf("(", deviceIdIdx));
        objectName = data.substring(objNameIdx, data.indexOf("\"", objNameIdx));
        objectType = data.substring(objTypeIdx, data.indexOf("\"", objTypeIdx));
        version = data.substring(versionIdx, data.indexOf("\"", versionIdx));
        reportingDevice = data.substring(rptDeviceIdx, data.indexOf("\"", rptDeviceIdx));

        dateTime = data.substring(dateTimeIdx, data.indexOf("\"", dateTimeIdx));

        temperature = Float.valueOf(data.substring(tempIdx, data.indexOf("\"", tempIdx)));
        humidity = Float.valueOf(data.substring(humidIdx, data.indexOf("\"", humidIdx)));
        pressure = Float.valueOf(data.substring(pressureIdx, data.indexOf("\"", pressureIdx)));
        tilt = Float.valueOf(data.substring(tiltIdx, data.indexOf("\"", tiltIdx)));

        if (latIdx < tempIdx && latIdx > rptDeviceIdx) {
            locationExist = true;
            latitude = Float.valueOf(data.substring(latIdx, data.indexOf("\"", latIdx)));
            longitude = Float.valueOf(data.substring(lonIdx, data.indexOf("\"", lonIdx)));
        }

        String btnPressStr = data.substring(btnPressIdx, data.indexOf("\"", btnPressIdx));
        buttonPress = !btnPressStr.equals("0");

        if (mag3Idx < tempIdx && mag3Idx > rptDeviceIdx) {
            magExist = true;
            mag1 = Float.valueOf(data.substring(mag1Idx, data.indexOf("\"", mag1Idx)));
            mag2 = Float.valueOf(data.substring(mag2Idx, data.indexOf("\"", mag2Idx)));
            mag3 = Float.valueOf(data.substring(mag3Idx, data.indexOf("\"", mag3Idx)));
        }

    }

    /**
     * Create Json object
     *
     * @return json object
     */
    public JSONObject getJson() {
        JSONObject jsonBlob = new JSONObject();

        jsonBlob.put(DEVICE_ID, connectionDeviceId);
        jsonBlob.put(TOD, dateTime);
        jsonBlob.put(OBJECT_NAME, objectName);
        jsonBlob.put(OBJECT_TYPE, objectType);
        jsonBlob.put(VERSION, version);
        jsonBlob.put(REPORTING_DEVICE, reportingDevice);

        JSONObject measurements = new JSONObject();

        measurements.put(TEMPERATURE, temperature);
        measurements.put(PRESSURE, pressure);
        measurements.put(HUMIDITY, humidity);
        measurements.put(TILT, tilt);
        measurements.put(BUTTON_PRESS, buttonPress);

        jsonBlob.put("Device data", measurements);

        if (magExist) {
            JSONObject magReadings = new JSONObject();

            magReadings.put(MAG3, mag3);
            magReadings.put(MAG2, mag2);
            magReadings.put(MAG1, mag1);

            jsonBlob.put("mag", magReadings);
        }

        if (locationExist) {
            JSONObject location = new JSONObject();

            location.put(LATITUDE, latitude);
            location.put(LONGITUDE, longitude);

            jsonBlob.put(LOCATION, location);
        }

        return jsonBlob;
    }

    public String getConnectionDeviceId () {
        return connectionDeviceId;
    }
}
