const apiKey = require('./appConfig.example.js')
const accountSid = process.env.accountSid || apiKey.accountSid
const authToken = process.env.authToken || apiKey.authToken
const joshNumber = process.env.joshNumber || apiKey.joshNumber
const client = require('twilio')(accountSid, authToken);
const request = require('postman-request')
const country = require('./util/coutryChecker')

module.exports = async (req, res) => { 
// const checkStatus = async () => {
    try{
        const result = await country()
        if (result.responseValue){
            for (i = 0; i < result.responseValue.length; i++) {
                if(result.responseValue[i].isoCode == 'IE'){
                    res.status(200).send('Found Hong Kong');
                    // console.log('Found Hong Kong')
                    client.messages.create({
                        body: 'Hong Kong available in ABRSM',
                        from: 'ABRSMCHEKER',
                        to: joshNumber
                    });
                }
            }
        } else {
            // console.log('Not Found');
            res.status(200).send('Not Found');
        }
    } catch(e){
        res.status(400).send(e)
    }
};