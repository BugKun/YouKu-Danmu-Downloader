const Get = require("./httpGet");

module.exports = (url) => new Promise((resolve, reject) => {
    Get(url)
        .then(res => {
            const RegID = res.match(/videoId\: \'(.+?)\'/),
                id = (RegID) ? RegID[1] : null,
                RegSeconds = res.match(/seconds\: \'(.+?)\'/),
                minutes = (RegSeconds) ? Math.ceil(Number(RegSeconds[1]) / 60) : null,
                RegTitle = res.match(/\<meta name\=\"title\" content\=\"(.+?)\" \/\>/),
                name = (RegTitle)? RegTitle[1] : null;

            if (id && minutes) {
                console.log(`videoId: ${ id }, duration: ${ minutes }min`);
                resolve({ id, minutes, name });
            } else {
                reject(null);
            }
        })
        .catch(reject)
});

