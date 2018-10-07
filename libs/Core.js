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

    randomHash(len) {
        const randomArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
        let random = "";
        for (let i = 0; i < len; i++) {
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
            this.xml += `<d p="${ playat },${ ct },${ size },${ color },1430559225,0,${this.randomHash(8)},${this.randomTime()}">${ content }</d>\n`
        });
        return true;
    }

    end() {
        this.xml += '</i>';
        return this.xml;
    }

};
