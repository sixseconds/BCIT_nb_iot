package com.blobs.quickstart;

import java.io.*;
import java.util.ArrayList;

/**
 * Runs the app and prints all measurement data in blob, organized by device ID
 */
public class App 
{
    // TODO Replace connection string with your Blob storage's connection string
    private static final String CONNECT_STR = "DefaultEndpointsProtocol=https;" +
            "AccountName=lewistesting;" +
            "AccountKey=B5Yd8qlB5a356KLF78iNJqo926fjiVQksT0QaPw47VUwKyi1oM1bdPcrrVB7zT1WyBl5BSW5lu+dIV1yELq+nQ==;" +
            "EndpointSuffix=core.windows.net";
    // TODO Replace Container name with the container your data is located at
    private static final String CONTAINER_NAME = "test1";

    public static void main( String[] args ) throws IOException
    {
        BlobDataDownloader bdd = new BlobDataDownloader(CONNECT_STR, CONTAINER_NAME);

        // Download Blob data
        DeviceManager manager = bdd.download();
        ArrayList<DeviceReadings> deviceIdList;
        ArrayList<String> devices = manager.getDevices();

        System.out.println("\n-------PRINTING ALL DATA IN BLOB IN JSON FORMAT --------\n");
        for (String deviceId : devices) {
            deviceIdList = manager.getDeviceReadings(deviceId);

            if (deviceIdList.isEmpty()) {
                System.out.println(deviceId + " device has no data in Blob\n");
            } else {
                System.out.println(deviceId + " data: ");
                for (DeviceReadings reading : deviceIdList) {
                    System.out.println(reading.getJson().toString());
                }
            }
            System.out.println();
        }
    }
}
