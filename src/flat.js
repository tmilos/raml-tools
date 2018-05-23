var fs = require('fs')
var commandLineArgs = require('command-line-args')
var error = require('./error')
var flattener = require('flat-raml')

function main(argv) {
    console.log('Flat RAML')
    var optionDefn = [
        { name: 'inFile', defaultOption: true },
        { name: 'save' }
    ]

    var options = commandLineArgs(optionDefn, { argv: argv })
    if (!options.inFile) {
        error("ERROR: input RAML file argument is required")
    }
    if (!fs.statSync(options.inFile).isFile()) {
        error("ERROR: specified input RAML is not a file")
    }
    if (options.hasOwnProperty('save')) {
        if (!options.save || typeof options.save != "string") {
            error("ERROR: save option must provide a file where to save flatten RAML")
        }
    }

    flattener.asString(options.inFile)
        .then(serialized => {
            if (options.save) {
                fs.writeFileSync(options.save, serialized)
                console.log(`Flat RAML saved to ${options.save}`)
            } else {
                console.log(serialized)
            }
        })
        .catch(error => {
            console.log(error)
            console.log("Error "+error.context+": "+error.message)
            console.log("Line: "+error.problem_mark.line)
            console.log("Column: "+error.problem_mark.column)
        })
}


module.exports = main