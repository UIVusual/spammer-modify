const axios = require('axios')
const chalk = require('chalk')
const ttyTable = require('tty-table')

const header = [
    {
        value: 'TIME',
        width: 10
    },
    {
        value: 'METHOD',
        width: 8,
        formatter: (value) => {
            if (value == 'CALL') return chalk.black.bgRed(value)
            return chalk.black.bgYellow(value)
        }
    },
    {
        value: 'NUMBER',
        width: 13
    },
    {
        value: 'UUID',
        width: 38
    }
]

const table = ttyTable(
    header,
    [],
    {
        align: 'center',
        color: 'green',
        headerColor: 'blue',
        borderColor: 'cyan'
    }
)

module.exports = async (data) => {
    await axios({
        method: 'post',
        url: data.url,
        data: data.data
    }).then((res) => {
        var date = new Date()
        var time = date.toLocaleString('th-TH', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })

        table.push(
            [time, data.data.method, data.data.phoneNumber, res.data.challengeID]
        )

        console.clear()
        console.log(
            table.render()
        )
    }).catch((err) => { })
}
