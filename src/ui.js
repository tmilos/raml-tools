var fs = require('fs')
var commandLineArgs = require('command-line-args')
var httpServer = require('http-server/lib/http-server.js')
var rimraf = require('rimraf')
var opener = require('opener')
var error = require('./error')
var ncp = require('ncp').ncp;
ncp.limit = 8

function main(argv) {
    var defn = [
        { name: 'source', alias: 's', type: String, multiple: false },
        { name: 'destination', alias: 'd', type: String, multiple: false },
        { name: 'open', alias: 'o', type: Boolean, multiple: false },
        { name: 'force', alias: 'f', type: Boolean, multiple: false }
    ]
    var options = commandLineArgs(defn, { argv: argv })
    if (!options.source) {
        error("ERROR: input swager file argument is required")
    }
    if (!fs.statSync(options.source).isFile()) {
        error("ERROR: specified input swager file does not exist")
    }
    if (!options.destination) {
        error("ERROR: destination directory is required")
    }

    var destinationStat;
    try {
        destinationStat = fs.statSync(options.destination)
    } catch (e) {}

    if (destinationStat && !options.force) {
        error('ERROR: destination directory already exist')
    }
    if (destinationStat && options.force) {
        if (destinationStat.isFile() || destinationStat.isSymbolicLink()) {
            console.log("Destination exists as file, unlining...")
            fs.unlinkSync(options.destination)
        } else {
            console.log("Deleting destination directory...")
            rimraf(options.destination, function (err) {
                if (err) {
                    console.log(err)
                    process.exit(1)
                }
                console.log("Destination directory deleted")
            })
        }
    }

    setTimeout(function() {
        copy(options)
    }, 500)
}

function copy(options) {
    console.log("Generating swagger UI...")
    ncp(__dirname+'/../node_modules/swagger-ui-dist', options.destination, function (err) {
        if (err) {
            error(err)
        }
        onCopy(options)
    })
}

function onCopy(options) {
    var host = '0.0.0.0', port = 3000;
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host
    var protocol = 'http://'
    var url = `http://${canonicalHost}:${port}`

    console.log(`Swagger UI generated in ${options.destination}`)

    var html = fs.readFileSync(options.destination+'/index.html').toString()
    html = html.replace(/url\s*:\s*["'].*["']/g, 'url: "swagger.json"')
    fs.writeFileSync(options.destination+'/index.html', html)
    
    fs.copyFileSync(options.source, options.destination+'/swagger.json')
    console.log(`Source swagger file added to UI`)

    if (options.open) {
        var server = httpServer.createServer({
            root: options.destination
        });
        server.listen(port, host, function () {
            console.log(`Listening on ${url}`)
            console.log("Press Ctrl+C to stop")

            opener(url)
        })
    }
}

module.exports = main
