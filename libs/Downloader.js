const Get = require("./httpGet"),
    Converter = require("./Converter");

module.exports = class Downloader extends Converter {
    constructor(id, name, minutes) {
        super();
        return this.download(id, name, minutes);
    }

    getChunk(i, id, name) {
        return Get(`https://service.danmu.youku.com/list?mat=${ i }&mcount=1&ct=1001&iid=${ id }`)
            .then(data => {
                const $data = JSON.parse(data);
                this.parse($data);
            })
            .catch(err => {
                console.log("opps! ", err, {name, id});
            })
    }

    download(id, name, minutes) {
        return new Promise((resolve, reject) => {
            let tasks = [];
            for (let i = 0; i <= minutes; i++) {
                tasks.push(
                    this.getChunk(i, id, name)
                )
            }
            Promise.all(tasks)
                .then(() => {
                    resolve(this.end(this.xml));
                })
                .catch(reject);
        })
    }
};