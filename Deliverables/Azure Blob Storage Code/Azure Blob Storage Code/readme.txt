This app downloads data from Azure Blob Storage, extract telemetry readings and produce readable Json files.

DeviceReading.java - Responsible to save all params on the downloaded avro file like temperature, humidy, pressure, etc.
It represents one device one payload at one time.

DeviceManager.java - Responsible to organize all DeviceReadings by deviceId.

BlobDataDownloader.java - Responsible for downloading blob storage data

App.java - Runs the app