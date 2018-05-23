var commandLineArgs = require('command-line-args')
var httpServer = require('http-server/lib/http-server.js')
var opener = require('opener')
var error = require('./error')

function main(argv) {
    var defn = [
        { name: 'destination', alias: 'd', type: String, multiple: false },
        { name: 'open', alias: 'o', type: Boolean, multiple: false }
    ]
    var options = commandLineArgs(defn, { argv: argv })

    if (!options.destination) {
        error('Web server root directory must be specified. Use -d option')
    }

    var host = '0.0.0.0', port = 3000;
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host
    var protocol = 'http://'
    var url = `http://${canonicalHost}:${port}`

    var server = httpServer.createServer({
        root: options.destination
    });
    server.listen(port, host, function () {
        console.log(`Listening on ${url}`)
        console.log("Press Ctrl+C to stop")

        if (options.open) {
            opener(url)
        }
    })
}

module.exports = main