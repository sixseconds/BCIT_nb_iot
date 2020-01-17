package com.blobs.quickstart;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobItem;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

public class BlobDataDownloader {

    private BlobServiceClient blobServiceClient;
    private BlobContainerClient containerClient;
    private DeviceManager manager;

    public BlobDataDownloader(String connectionStr, String containerName) {
        blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionStr).buildClient();
        containerClient = blobServiceClient.getBlobContainerClient(containerName);
    }

    public DeviceManager download() {
        manager = new DeviceManager(getDevices());
        getMeasurements();
        return manager;
    }

    private String getDevices() {
        String dataStr = "";

        for (BlobItem blobItem : containerClient.listBlobs()) {

            if (blobItem.getName().contains("devices")) {

                // file name in container
                String blobLocation = blobItem.getName();

                // Get a reference to a blob
                BlobClient blobClient = containerClient.getBlobClient(blobLocation);

                OutputStream stream = new ByteArrayOutputStream();

                blobClient.download(stream);

                dataStr = new String(((ByteArrayOutputStream) stream).toByteArray());
            }
        }

        return dataStr;
    }

    private void getMeasurements() {

        for (BlobItem blobItem : containerClient.listBlobs()) {

            if (blobItem.getName().contains("measurements")) {

                // file name in container
                String blobLocation = blobItem.getName();

                System.out.println(blobLocation);

                // Get a reference to a blob
                BlobClient blobClient = containerClient.getBlobClient(blobLocation);

                OutputStream stream = new ByteArrayOutputStream();

                blobClient.download(stream);

                String dataStr = new String(((ByteArrayOutputStream) stream).toByteArray());

                String[] blobData = dataStr.split("toz");

                for (int i = 1; i < blobData.length; i++) {
                    DeviceReadings data = new DeviceReadings(blobData[i]);

                    manager.addReadings(data);
                }
            }
        }

//        String[] deviceIdArray = deviceIdSet.toArray(new String[0]);
//        System.out.println(readings.get(deviceIdArray[0]).getJson().toString());
    }
}
