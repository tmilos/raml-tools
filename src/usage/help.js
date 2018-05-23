module.exports = [
    require('./_general'),
    {
        header: "Synopsis",
        content: "$ raml-tools command"
    },
    {
        header: "Command list",
        content: [
            { 
                name: "help {underline command}",
                description: "Display help info for the tool or specific command"
            },
            {
                name: "flat",
                description: "Flattens RAML into signle file, run {gray.bold raml-tool help flat} for details"
            }, {
                name: "swagger",
                description: "Generates swagger file from given flat RAML file"
            }, {
                name: "ui",
                description: "Generates swagger ui for the given swagger file"
            }, {
                name: "http",
                description: "Runs static http server"
            }
        ]
    }
]
