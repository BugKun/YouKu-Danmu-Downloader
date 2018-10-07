const fs = require("fs"),
    Downloader = require("./libs/Downloader"),
    getInfo = require("./libs/getInfo"),
    input = require("./input");


let progress = 0;

input.forEach(item => {
    getInfo(item.url)
        .then(({id, minutes}) => {
            new Downloader(id, item.name, minutes)
                .then(xml => {
                    fs.writeFileSync(`./output/${item.name}.xml`, xml ,"utf-8");
                    console.log(`pending => ${ ++progress / input.length * 100 }%`);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })
});