import DB from './db.js';

const MON = "月曜日";
const TUE = "火曜日";
const WED = "水曜日";
const THU = "木曜日";
const FRI = "金曜日";
const SAT = "土曜日";
const DOTW = ["", MON, TUE, WED, THU, FRI, SAT];
const PERIOD = 5;

const db = new DB();
db.open();
const classTimes = db.classTimes;
const classNames = db.classNames;
const classUrls = db.classUrls;

function get(id) {
    return document.getElementById(id);
}

function create(tag) {
    return document.createElement(tag);
}

/*
<tr>
    <th></th>
    <th>月曜日</th>
    <th>火曜日</th>
    <th>水曜日</th>
    <th>木曜日</th>
    <th>金曜日</th>
    <th>土曜日</th>
</tr>
*/
export function createTableHeader() {
    const editTable = get("table");
    const rowHeader = create("tr");
    for (let i = 0; i < DOTW.length; i++) {
        const th = create("th");
        th.innerHTML = DOTW[i];
        rowHeader.appendChild(th);
    }
    editTable.appendChild(rowHeader);
}

/*
<tr>
    <td>
        <label>1時限</label>
        <div>xx:xx 〜 xx:xx</div>
    </td>
    <td>
        <a href="https://xxx.x" target="_blank" rel="noopener noreferrer">英語</a>
    </td>
    <td>
        <a href="https://xxx.x" target="_blank" rel="noopener noreferrer">数学</a>
    </td>
    ...
</tr>
<tr>
...
</tr>
*/
export function createTableBodyForHome() {
    const editTable = get("table");
    for (let i = 1; i <= PERIOD; i++) {
        const rowBody = create("tr");
        for (let j = 0; j < DOTW.length; j++) {
            const td = create("td");
            if (j == 0) {
                const label = create("label");
                label.innerHTML = i + "時限";
                const div = create("div");
                div.innerHTML =  classTimes[i]["start"] + ' 〜 ' + classTimes[i]["end"];

                td.appendChild(label);
                td.appendChild(div);
            } else {
                const a = create("a");
                a.setAttribute("href", classUrls[j][i]);
                a.setAttribute("target", "_blank");
                a.setAttribute("rel", "noopener noreferrer");
                a.innerHTML = classNames[j][i];
                td.appendChild(a);
            }
            rowBody.appendChild(td);
        }
        editTable.appendChild(rowBody);
    }
}

/*
<tr>
    <td>
        <label>1時限</label>
        <input type="time" id="start-time-1"> 〜 <input type="time" id="end-time-1">
    </td>
    <td>
        <label>講義名</label>
        <input type="text" id="name-1-1">
        <label>URL</label>
        <input type="text" id="url-1-1">
    </td>
    <td>
        <label>講義名</label>
        <input type="text" id="name-1-2">
        <label>URL</label>
        <input type="text" id="url-1-2">
    </td>
    ...
</tr>
<tr>
...
</tr>
*/
export function createTableBodyForEdit() {
    // const classTimes = db.classTimes;
    // const classNames = db.classNames;
    // const classUrls = db.classUrls;

    const editTable = get("table");
    for (let i = 1; i <= PERIOD; i++) {
        const rowBody = create("tr");
        for (let j = 0; j < DOTW.length; j++) {
            const td = create("td");
            if (j == 0) {
                const label = create("label");
                label.innerHTML = i + "時限";
                const inputStart = create("input");
                inputStart.setAttribute("type", "time");
                inputStart.setAttribute("id", "start-time-"+i);
                inputStart.setAttribute("value", classTimes[i]["start"]);
                const inputEnd = create("input");
                inputEnd.setAttribute("type", "time");
                inputEnd.setAttribute("id", "end-time-"+i);
                inputEnd.setAttribute("value", classTimes[i]["end"]);

                td.appendChild(label);
                td.appendChild(inputStart);
                td.innerHTML += " 〜 ";
                td.appendChild(inputEnd);
            } else {
                const labelName = create("label");
                labelName.innerHTML = "講義名";
                const inputName = create("input");
                inputName.setAttribute("type", "text");
                inputName.setAttribute("id", "name-"+i+"-"+j);
                inputName.setAttribute("value", classNames[j][i]);
            
                const labelUrl = create("label");
                labelUrl.innerHTML = "URL";
                const inputUrl = create("input");
                inputUrl.setAttribute("type", "text");
                inputUrl.setAttribute("id", "url-"+i+"-"+j);
                inputUrl.setAttribute("value", classUrls[j][i]);

                td.appendChild(labelName);
                td.appendChild(inputName);
                td.appendChild(labelUrl);
                td.appendChild(inputUrl);
            }
            rowBody.appendChild(td);
        }
        editTable.appendChild(rowBody);
    }
}

window.registerClassDetail = function () {
    const classTimes = []
    const classNames = []
    const classUrls = []
    for (let i = 1; i <= PERIOD; i++) {

        const start = get("start-time-"+i).value;
        const end = get("end-time-"+i).value;
        if (start === "" || end === "") {
            get("err-msg").innerHTML = i+"時限目の授業時間を入力してください。";
            return false;
        }
        classTimes.push({"period": i, "start": start, "end": end})
        
        for (let j = 0; j < DOTW.length; j++) {
            if (j == 0) continue;
            const name = get("name-"+i+"-"+j).value;
            const url = get("url-"+i+"-"+j).value;
            
            classNames.push({"period": i, "dotw": j, "name": name})
            classUrls.push({"period": i, "dotw": j, "url": url})
        }
    }

    db.insertClassTimes(classTimes);
    db.insertClassName(classNames);
    db.insertClassUrl(classUrls);

    // for dev
    // window.location.href = '/';
    window.location.href = 'https://konekato.github.io/gtcl/';

    return true;
}

window.gtclNow = function () {
    const now = new Date(); 
    const d = now.getDay();
    const h = now.getHours()
    const m = now.getMinutes();
    if (d == 0)  {
        console.log('範囲外');
        return false;
    }

    for (let i = 1; i <= PERIOD; i++) {
        const classTime = classTimes[i];
        const starts = classTime["start"].split(':');
        const ends = classTime["end"].split(':');

        if (isClassNow(h, m, Number(starts[0]), Number(starts[1]), Number(ends[0]), Number(ends[1]))) {
            const url = classUrls[d][i];
            if (url == '') {
                console.log('登録されていない');
                return false
            }
            window.open(url, '_blank');
            return true;
        }
    }

    return false;
}

function isClassNow(nowH, nowM, startH, startM, endH, endM) {
    const now = nowH * 60 + nowM;
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;

    if (now >= start && now <= end) return true;
    else return false;
}