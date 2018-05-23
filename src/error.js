var chalk = require('chalk')

module.exports = function(errorMessage) {
    console.log(chalk.red(errorMessage))
    process.exit(1)
}