This program executes a node service which will query a given database, aggregate certain
values across devices, and re-transmit a message into an Azure service, which in this case
is IoT Central.

In order to run this program, you must have Node.js installed on your local machine.
Download information can be found here: https://nodejs.org/en/download/

From the current directory, run the following commands in your preferred CLI:
npm install - this installs all the dependencies required to run this node service
node app.js - runs the program

If deploying a similar service, and are looking for templates, I have commented each section where the 
user ought to replace their connection values.\

Disclaimer: The database URI and access key specified in config.js
may have changed since the time of document posting. The connection string to 
IoT Central may also have changed. Contact the author for questions and support.