const Get = require("./httpGet");

module.exports = (url) => new Promise((resolve, reject) => {
    Get(url)
        .then(res => {
            const RegID = res.match(/videoId\: \'(.+?)\'/),
                RegSeconds = res.match(/seconds\: \'(.+?)\'/),
                minutes = (RegSeconds) ? Math.ceil(Number(RegSeconds[1]) / 60) : null;

            if (RegID && minutes) {
                console.log(`videoId: ${ RegID[1] }, duration: ${ minutes }min`);
                resolve({ id: RegID[1], minutes });
            } else {
                reject(null);
            }
        })
        .catch(reject)
});

