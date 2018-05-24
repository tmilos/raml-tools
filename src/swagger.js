var fs = require('fs')
var commandLineArgs = require('command-line-args')
var error = require('./error')
var converter = require('oas-raml-converter');

function main(argv) {
    var defn = [
        { name: 'inFile', defaultOption: true, type: String, multiple: false },
        { name: 'save', type: String, multiple: false },
        { name: 'server', alias: 's', type: String, multiple: true },
        { name: 'clear-server', alias: 'c', type: Boolean, multiple: false },
        { name: 'base-uri', alias: 'b', type: String, multiple: false },
    ]
    var options = commandLineArgs(defn, { argv: argv })    
    if (!options.inFile) {
        error("ERROR: input RAML file argument is required")
    }
    if (!fs.statSync(options.inFile).isFile()) {
        error("ERROR: specified input RAML is not a file")
    }
    if (options.hasOwnProperty('save')) {
        if (!options.save || typeof options.save != "string") {
            error("ERROR: save option must provide a file where to save swagger")
        }
    }

    

    var ramlToOas20 = new converter.Converter(converter.Formats.RAML, converter.Formats.OAS30);
    ramlToOas20.convertFile(options.inFile)
        .then(function (swagger) {
            onConverted(swagger, options)
        })
        .catch(function (err) {
            console.log(err)
            error(err.message)
        })
}

function onConverted(swagger, options) {
    var json;
    if (typeof(swagger) == "string") {
        json = JSON.parse(swagger)
    } else {
        json = JSON.parse(JSON.stringify(swagger))
    }

    if (options['clear-server']) {
        json.servers = []
    }

    if (options['base-uri']) {
        json.servers.push({
            url: '{baseUri}',
            variables: {
                baseUri: {
                    default: options['base-uri']
                }
            }
        })
    }

    if (options.server) {
        options.server = Array.isArray(options.server) ? options.server: [options.server] 
        options.server.forEach(element => {
            json.servers.push({ url: element})
        });
    }

    var string = JSON.stringify(json, null, 4)
    if (options.save) {
        fs.writeFileSync(options.save, string)
        console.log(`Swagger saved to file ${options.save}`)
    } else {
        console.log(string)
    }
}

module.exports = main
