const Get = require("./httpGet");

module.exports = (url) =>{
    return new Promise((resolve, reject) => {
        Get(url)
            .then(res => {
                const RegID = res.match(/videoId\: \'(\d+)\',/);
                const RegSeconds = res.match(/seconds\: \'\d+(\.\d+)?\',/);//seconds: '1420.07',
                const seconds = (RegSeconds)? RegSeconds[0].match(/\d+(\.\d+)?/) : null;
                const minutes = (seconds)? Math.ceil(Number(seconds[0]) / 60) : null;
                if(RegID && minutes){
                    console.log(`videoId: ${RegID[1]}, duration: ${minutes}min`);
                    resolve({ id: RegID[1], minutes });
                }else{
                    reject(null);
                }
            })
            .catch(reject)
    })
};

