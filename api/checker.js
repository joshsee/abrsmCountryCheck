// const apiKey = require('./appConfig.js')
const accountSid = process.env.accountSid || apiKey.accountSid
const authToken = process.env.authToken || apiKey.authToken
const joshNumber = process.env.joshNumber || apiKey.joshNumber
const client = require('twilio')(accountSid, authToken);

const request = require('postman-request')

module.exports = (req, res) => { 
    const url = 'https://portal.abrsm.org/api/PublicVisit/GetCountries?filterForBooking=true'
    request({url, json: true}, function (error, {body}) {
        if (error){
            // console.log('Unable to connect abrsm API', undefined)
            res.status(500).send(error);
        } else {
            if (body.responseValue){
                for (i = 0; i < body.responseValue.length; i++) {
                    if(body.responseValue[i].isoCode == 'HK'){
                        res.status(200).send('Found Hong Kong');
                        // console.log('Found Hong Kong')
                        client.messages.create({
                            body: 'Hong Kong available in ABRSM',
                            from: 'ABRSMCHEKER',
                            to: joshNumber
                        }).then(message => console.log(message.sid));
                    }
                }
            } else {
                res.status(200).send('Not Found');
            }
        }
    })
};