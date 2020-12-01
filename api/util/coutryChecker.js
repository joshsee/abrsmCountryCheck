const request = require('postman-request')
const url = 'https://portal.abrsm.org/api/PublicVisit/GetCountries?filterForBooking=true'

const country = () => {
    return new Promise((resolve, reject) => {
        request({url, json: true}, function (error, {body}) {    
            if (error){
                return reject('Unable to connect abrsm API')
            } else {
                resolve(body)
            }
        })
    })       
}

module.exports = country