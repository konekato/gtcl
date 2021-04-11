import DB from '../db.js';
const db = new DB();

db.open();

window.insertTest = function () {
    db.print("insertTast start.");
    db.insertClassTimes([
        {"period": 1, "start": "00:00", "end": "01:00"},
        {"period": 2, "start": "02:00", "end": "23:59"},
    ]);
    db.insertClassName([
        {"period": 1, "dotw": 1, "name": "英語"},
        {"period": 2, "dotw": 1, "name": "数学"},
    ]);
    db.insertClassUrl([
        {"period": 1, "dotw": 1, "url": "https://a.c"},
        {"period": 2, "dotw": 1, "url": "https://b.c"},
    ]);
    db.print("insertTast end.");
}

function selectTest() {
    db.print("selectTest start.");
    db.selectClassTimes();
    db.selectClassNames();
    db.selectClassUrls();
    db.print("selectTest end.");
}

function get() {
    console.log(db.classTimes[1]['end']);
    console.log(db.classNames[1][1]);
    console.log(db.classUrls[1][1]);
}

function deleteDatabaseTest() {
    db.print("deleteDatabaseTest start.");
    db.deleteDatabase();
    db.print("deleteDatabaseTest end.");
}

// db.deleteDatabase();