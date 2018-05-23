module.exports = [
    {
        header: "Command: swagger",
        content: "$ raml-tools swagger file [options]"
    }, {
        header: "Description",
        content: "Generates swagger file from the given flat RAML file"
    }, {
        header: "Arguments",
        content: [
            { 
                name: 'file',
                description: 'RAML file to flatten into single RAML file'
            }
        ]
    }, {
        header: "Option list",
        optionList: [
            { 
                name: "save",
                typeLabel: "{underline file}",
                description: "Save flatten RAML into specified file"
            }, {
                name: "server",
                alias: 's',
                typeLabel: "{underline serverUrl}",
                description: "Additional server url(s). Can be repeated multiple times."
            }, {
                name: "base-uri",
                alias: 'b',
                typeLabel: "{underline default_value}",
                description: "Add server url as variable with the given value."
            }, {
                name: "clear-server",
                alias: 'c',
                description: "Clears any servers defined in RAML, so the result will contain only those added with {bold.gray -s} option."
            }
        ]
    }
]
