const Get = require("./httpGet");

module.exports = (url) =>{
    return new Promise((resolve, reject) => {
        Get(url)
            .then(res => {
                const RegID = res.match(/videoId\: \'(\d+)\',/);
                if(RegID){
                    resolve(RegID[1]);
                }else{
                    reject(null);
                }
            })
            .catch(reject)
    })
};

