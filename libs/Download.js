const Get = require("./httpGet");
const Core = require("./Core");

module.exports = class extends Core{
    constructor(id, name, minutes){
        super();
        this.tasks = [];
        this.count = 0;
        return this.download(id, name, minutes);
    }

    getChunk(i, id, name){
        this.tasks.push(
            Get(`http://service.danmu.youku.com/list?mat=${ i }&mcount=1&ct=1001&iid=${ id }`)
                .then(data => {
                    const $data = JSON.parse(data);
                    this.parse($data);
                })
                .catch(err => {
                    console.log("opps! ", err, {name, id});
                })
        )
    }

    download(id, name, minutes){
        return new Promise((resolve, reject) => {
            if (typeof minutes === "number") {
                for (let i = 0; i <= minutes; i++) {
                    this.getChunk(i, id, name)
                }
                Promise.all(this.tasks)
                    .then(() => {
                        resolve(this.end(this.xml));
                    })
                    .catch(reject);
            } else {
                this.autoDownload(name, id, () => {
                    resolve(this.end(this.xml));
                });
            }
        })
    }

    autoDownload(name, id, callback){
        let i = this.count;
        Get(`http://service.danmu.youku.com/list?mat=${ i }&mcount=1&ct=1001&iid=${ id }`)
            .then(data => {
                const $data = JSON.parse(data);
                const res = this.parse($data);
                if(res){
                    this.count++;
                    return this.autoDownload(name, id, callback);
                }else{
                    callback();
                }
            })
            .catch(err => {
                console.log("opps! ", err, {name, id});
            })
    }
}