module.exports = [
    {
        header: "Command: flat",
        content: "$ raml-tools flat file [options]"
    }, {
        header: "Description",
        content: "Flattens given RAML file into single RAML file by pulling-in and inlining all "+
            "externally referenced parts of the RAML like traits, schemas, examples..."
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
            }
        ]
    }
]
