const request = require('request');
const querystring = require("querystring");
module.exports = async (apiUrl, data) => {
    let url = apiUrl+'?'+querystring.stringify(data);
    let rspBody;
    console.log(url);
    var options = {
        url:url,
        // encoding: null,
        headers: {
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:52.0) Gecko/20100101 Firefox/52.0",
            'Cookie':'__cfduid=ded630a06c506e1acfa9aa8317fc156881491058058; PHPSESSID=5qudpvsqcosfmhqb24hhis03g0'
        }
    };
    function callApi(){
        return new Promise(function(resolve,reject){
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // rspBody =  body;
                    resolve(body);
                }else{
                    console.log('出错了:'+error);
                }
                
            });
        });
    }
    rspBody = await callApi()
    console.log(rspBody);
    return rspBody;
}