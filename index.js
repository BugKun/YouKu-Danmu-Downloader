const fs = require("fs");
const Download = require("./libs/Download");
const getID = require("./libs/getID");
const input = require("./input");

input.forEach((item, i) => {
    getID(item.url)
        .then(id => {
            new Download(id, item.name, item.minutes)
                .then(xml => {
                    fs.writeFileSync(`./output/${item.name}.xml`, xml ,"utf-8");
                    console.log(`pending => ${ i / input.length * 100 }%`);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })
});