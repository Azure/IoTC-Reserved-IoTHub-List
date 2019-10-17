# Lists the IotHub FQDNs for the IotC application 
This projects is a utility to get the list of hub names associated with an IoTC application.

## Pre-requisites
- NodeJS 10+

## Installing
Run the following command to link the CLI command to run the utility.

```npm run install-cli```

This command will run ```npm install``` and build the project. Once built it will link the ```reserved-hubs``` command on your path. To run the utility use the follwing command:

```reserved-hubs```

## Arguments
The following arguments should be used with this utility

```-u | --url ```: Application URL of the IoTC app. For e.g. https://sample-test-app.azureiotcentral.com

``` -t | --token ```: The API token from the IoTC application which authenticated the user using this script
