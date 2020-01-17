package com.blobs.quickstart;

import java.util.ArrayList;

/**
 * Organize the device readings and group them by device id
 */
public class DeviceManager {

    private ArrayList<String> devices;
    private ArrayList<ArrayList<DeviceReadings>> readings;

    public DeviceManager(String file) {
        devices = new ArrayList<>();

        extractDeviceIds(file);

        readings = new ArrayList<ArrayList<DeviceReadings>>();
        for (int i = 0; i < devices.size(); i++) {
            readings.add(new ArrayList<DeviceReadings>());
        }
    }

    public void extractDeviceIds(String file) {
        String[] deviceIdLines = file.split("\n");
        int expectedLen1 = 8;
        int expectedLen2 = 4;
        int expectedLen3 = 12;
        int totalLength = expectedLen1 + expectedLen2 * 3 + expectedLen3 + 4;

        for (int i = 1; i < deviceIdLines.length; i++) {
            int index = deviceIdLines[i].indexOf("H") + 1;
            int indexEnd = index + totalLength;
            String actualEndingChar;

            try {
                actualEndingChar = deviceIdLines[i].substring(indexEnd, indexEnd + 1);
            } catch (StringIndexOutOfBoundsException e) {
                continue;
            }

            while (!actualEndingChar.trim().isEmpty() && !actualEndingChar.equals("\f") && indexEnd < (deviceIdLines[i].length() - totalLength)) {
                index = deviceIdLines[i].indexOf("H", index) + 1;
                indexEnd = index + totalLength;
            }

            if (actualEndingChar.trim().isEmpty() || actualEndingChar.equals("\f")) {
                devices.add(deviceIdLines[i].substring(index, indexEnd));
            }
        }
    }

    public void addReadings(DeviceReadings item) {
        int index = devices.indexOf(item.getConnectionDeviceId());
        readings.get(index).add(item);
    }

    public ArrayList<DeviceReadings> getDeviceReadings(String deviceId) {
        int index = -1;

        for (int i = 0; i < devices.size(); i++) {
            if (devices.get(i).equals(deviceId)) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            return null;
        }

        return readings.get(index);
    }

    public ArrayList<String> getDevices () {
        return devices;
    }

    public ArrayList<ArrayList<DeviceReadings>> getReadings () {
        return readings;
    }
}
