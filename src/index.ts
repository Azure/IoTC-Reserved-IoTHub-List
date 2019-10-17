#!/usr/bin/env node
import * as yargs from 'yargs';
import * as process from 'process';
import chalk from 'chalk';
import { parse } from 'url';
const request = require('request');

process.chdir(process.cwd());


interface options {
    url?: string;
    token?: string;
}

async function main() {
    const args = yargs.options({
        'url': {
            alias: 'u',
            describe: 'URL for the IoTC application',
            type: 'string'
        },
        'token': {
            alias: 't',
            describe: 'API token from the IoTC application',
            type: 'string'
        }
    }).argv;

    try {
        const options = await parseOptions(args);
        
        request(
            {
                url : options.url + '/system/iothub/reserved',
                headers : {
                    "Authorization" : options.token
                }
            },
            function (error: any, response: any, body: any) {
                if (error) {
                    throw error;
                }
                else if (response) {
                    const hubList = JSON.parse(body);

                    console.log('\n<=============================================================================>');
                    console.log('\n ******* IoTHub FQDNs associated with the provided IoTC application *******\n');
                    console.log('<=============================================================================>\n');
                    
                    let currHubNum = 1;
                    let numberHubs = Object.keys(hubList).length;
                    for (const hub in hubList){
                        if (currHubNum < numberHubs) {
                            console.log(`HubName${currHubNum}: ` + hubList[hub]);
                            currHubNum++;
                        }
                    }
                    console.log('\n<=============================================================================>\n');
                }
            }
        );

    } catch (err) {
        console.log(`${chalk.red('Error')}: ${err}`);
    }
}

async function parseOptions(args: any): Promise<options> {
    let options: options = {};

    for (const arg of Object.getOwnPropertyNames(args)) {
        switch (arg) {
            case 'url':
                options.url = args.url;
                break;
            case 'token':
                options.token = args.token;
                break;
        }
    }

    validateOptions(options);
    return options;
}

function validateOptions(options: options) {
    if (!options.url) {
        throw new Error('Invalid arugments. Expected IoTC application url argument not specified.');
    }
    if (!options.token) {
        throw new Error('Invalid arguments. Expected API token argument not specified.')
    }
}


main().catch((err: Error) => console.log('Failed: %s', err.message));
