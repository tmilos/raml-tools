module.exports = [
    {
        header: "Command: mock",
        content: "$ raml-tools mock [options]"
    }, {
        header: "Description",
        content: "Runs mock API server based on the given flat RAML file"
    }, {
        header: "Option list",
        optionList: [
            { 
                name: "file",
                alias: "f",
                typeLabel: "{underline file}",
                description: "Flat RAML file to use."
            }, {
                name: "port",
                alias: 'p',
                typeLabel: "{underline port}",
                description: "Port on which to run mock server, defaults to 3001."
            }
        ]
    }
]
