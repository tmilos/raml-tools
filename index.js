#!/usr/bin/env node

var commandLineArgs = require('command-line-args')
var error = require('./src/error')

var defn = [
    { name: 'command', defaultOption: true }
]
var options = commandLineArgs(defn, {stopAtFirstUnknown: true})
var argv = options._unknown || []

var cmd

switch (options.command) {
    case 'help':
        cmd = require('./src/help')
        break;
    case 'flat': 
        cmd = require('./src/flat')
        break;
    case 'swagger':
        cmd = require('./src/swagger')
        break;
    case 'ui':
        cmd = require('./src/ui')
        break;
    case 'http':
        cmd = require('./src/http')
        break;
    default:
        console.log(`Unknown command ${options.command}`)
        cmd = require('./src/help')
}

cmd(argv)
