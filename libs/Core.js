module.exports = class {
    constructor(json) {
        this.xml = `<?xml version="1.0" encoding="UTF-8"?>
      <i>
      <chatserver>chat.bilibili.com</chatserver>
      <chatid>57994199</chatid>
      <mission>0</mission>
      <maxlimit>1000</maxlimit>
      <state>0</state>
      <real_name>0</real_name>
      <source>k-v</source>\n`;
        if(json) this.parse(json);
    }

    randomTime() {
        let time = Math.random() * Math.pow(10, 9);
        return Math.floor(time);
    }

    ramdomUser() {
        //定义字符串变量colorValue存放可以构成十六进制颜色值的值
        const randomValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f"; //以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
        const randomArray = randomValue.split(",");
        let random = ""; //定义一个存放十六进制颜色值的字符串变量，先将#存放进去 //使用for循环语句生成剩余的六位十六进制值
        for (let i = 0; i < 8; i++) {
            //colorArray[Math.floor(Math.random()*16)]随机取出
            // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
            //字符串相加后，得出的仍是字符串
            random += randomArray[Math.floor(Math.random() * 16)];
        }
        return random;
    }

    parse(json) {
        if (!json || !json.result || json.result.length < 1) return false;
        json.result.forEach((item, i) => {
            if (/<|>|&|\u0000|\b/.test(item.content)) {
                return; //标志是否有非法XML字符
            }
            let playat = item.playat / 1000; //弹幕发送时间
            let propertis = item.propertis ? JSON.parse(item.propertis) : {};
            let color = (propertis.color) ? propertis.color : 16777215; // 获取颜色
            let ct = 1; //弹幕样式
            let size = 19;  //字体大小
            let content = item.content; //弹幕内容
            this.xml += `<d p="${ playat },${ ct },${ size },${ color },1430559225,0,${this.ramdomUser()},${this.randomTime()}">${ content }</d>\n`
        });
        return true;
    }

    end() {
        this.xml += '</i>';
        return this.xml;
    }

};
