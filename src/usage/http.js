module.exports = [
    {
        header: "Command: http",
        content: "$ raml-tools http"
    }, {
        header: "Description",
        content: "Runs static http serevr on given directory"
    }, {
        header: "Option list",
        optionList: [
            {
                name: "destination",
                alias: 'd',
                typeLabel: "{underline directory}",
                description: "Directory to use as server root"
            }, {
                name: "open",
                alias: 'o',
                description: "Open browser automatically"
            }
        ]
    }
]
