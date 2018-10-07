const {URL} = require('url');

module.exports = url => {
    const protocol = (/https\:/.test(new URL(url).protocol)) ? require("https") : require("http");
    return new Promise((resolve, reject) => {
        protocol
            .get(url, res => {
                let data = "";
                res.setEncoding("utf8");
                res.on("data", chunk => {
                    data += chunk;
                });
                res.on("end", () => {
                    resolve(data);
                });
            })
            .on("error", reject);
    });
};
