var fs = require('fs')
var commandLineArgs = require('command-line-args')
var error = require('./error')

var http = require('http')
var finalhandler = require('finalhandler')
var mock = require('osprey-mock-service')
var Router = require('osprey').Router
var morgan = require('morgan')

function main(argv) {
    console.log('mock')

    var defn = [
        { name: 'file', alias: 'f', type: String, multiple: false },
        { name: 'port', alias: 'p', type: Number, multiple: false }
    ]
    var options = commandLineArgs(defn, { argv: argv })
    options.port = options.port || 3001

    if (!options.file) {
        error('ERROR: Required file option missing')
    }
    try {
        if (!fs.statSync(options.file).isFile()) {
            error('ERROR: Specified input RAML not a file')
        }
    } catch (e) {
        error('ERROR: Invalid input file')
    }


    mock.loadFile(options.file, options)
    .then(function (app) {
      var router = new Router()
  
      // Log API requests.
      router.use(morgan('combined'))
      router.use(app)
  
      var server = http.createServer(function (req, res) {
        router(req, res, finalhandler(req, res))
      })
  
      server.listen(options.port, function () {
        console.log('Mock service running at http://localhost:' + server.address().port)
      })
    })
    .catch(function (err) {
      console.log(err && (err.stack || err.message))
      process.exit(1)
    })
  
}

module.exports = main
