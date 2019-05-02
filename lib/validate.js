const inquirer = require('inquirer')

module.exports = () => {
    const questions = [
        {
            name: 'number',
            type: 'input',
            message: 'Input target phone number',
            validate: (value) => {
                if (
                    !isNaN(value) && value.startsWith('66') && value.length == 11 ||
                    !isNaN(value) && value.startsWith('06') && value.length == 10 ||
                    !isNaN(value) && value.startsWith('08') && value.length == 10 ||
                    !isNaN(value) && value.startsWith('09') && value.length == 10
                ) return true
                return 'Phone number validation failed'
            }
        },
        {
            name: 'method',
            type: 'checkbox',
            message: 'Select method',
            choices: ['SMS', 'CALL'],
            validate: (value) => {
                if (value.length) return true
                return 'Please select method'
            }
        }
    ]
    return inquirer.prompt(questions)
}
