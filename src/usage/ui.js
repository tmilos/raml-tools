module.exports = [
    {
        header: "Command: ui",
        content: "$ raml-tools ui [options]"
    }, {
        header: "Description",
        content: "Generates swagger UI for the specified swagger file"
    }, {
        header: "Option list",
        optionList: [
            { 
                name: "source",
                alias: "s",
                typeLabel: "{underline file}",
                description: "Swagger file to use."
            }, {
                name: "destination",
                alias: 'd',
                typeLabel: "{underline directory}",
                description: "Destination directory where to generate swagger UI."
            }, {
                name: "open",
                alias: 'o',
                description: "Start http server and open generated swagger UI."
            }
        ]
    }
]
