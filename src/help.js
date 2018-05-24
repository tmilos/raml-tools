var chalk = require('chalk')
var commandLineUsage = require('command-line-usage')
var commandLineArgs = require('command-line-args')

var valid = {
    'help': './usage/help',
    'flat': './usage/flat',
    'swagger': './usage/swagger',
    'ui': './usage/ui',
    'http': './usage/http',
    'mock': './usage/mock'
}

function main(argv) {
    var cmd;
    if (Array.isArray(argv)) {
        var optionDefn = [
            { name: 'command', defaultOption: true }
        ]
        var options = commandLineArgs(optionDefn, { argv: argv })
        cmd = options.command
    } else if (typeof argv == "string" || !argv) {
        cmd = argv
    } else {
        throw new SyntaxError(`Invalid argument`)
    }
    cmd = cmd || 'help'

    run(cmd)
}

function run(command) {
    var fn = valid[command]
    if (!fn) {
        console.log(chalk.red(`ERROR: Invalid command ${command} to show help`))
        command = 'help'
        fn = valid[command]
    }

    var usage = require(fn)
    console.log(commandLineUsage(usage))

    process.exit(1)
}

module.exports = main