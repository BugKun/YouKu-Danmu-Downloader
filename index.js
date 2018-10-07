const fs = require("fs");
const Download = require("./libs/Download");
const getInfo = require("./libs/getInfo");
const input = require("./input");

let progress = 0;
input.forEach((item) => {
    getInfo(item.url)
        .then(({id, minutes}) => {
            new Download(id, item.name, minutes)
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