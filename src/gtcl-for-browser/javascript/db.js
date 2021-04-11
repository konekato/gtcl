export default class DB {
  constructor() {
    this.ver = 20210101;
    this.indexedDB =
      window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    this.IDBTransaction =
      window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.mozIDBTransaction;
    this.db = null;

    // classTimes[period]['start' or 'end']
    this.classTimes = {
      1: {start: "", end: ""},
      2: {start: "", end: ""},
      3: {start: "", end: ""},
      4: {start: "", end: ""},
      5: {start: "", end: ""},
    };

    // classNames[dotw][period]
    this.classNames = {
      1: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      2: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      3: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      4: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      5: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      6: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
    };

    // classUrls[dotw][period]
    this.classUrls = {
      1: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      2: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      3: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      4: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      5: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
      6: {
        1: "", 2: "", 3: "", 4: "", 5: "",
      },
    };
  }

  print(msg) {
    console.log(msg);
  }

  open() {
    const self = this;
    const reqOpen = self.indexedDB.open("gtclDB", this.ver);

    reqOpen.onupgradeneeded = function (err) {
      console.log('onupgradeneeded');
      self.db = reqOpen.result;
      self.db.createObjectStore("class-time", { keyPath: "period" });
      self.db.createObjectStore("class-name", { keyPath: ["period", "dotw"] });
      self.db.createObjectStore("class-url", { keyPath: ["period", "dotw"] });
    };
    reqOpen.onsuccess = function (err) {
      self.db = reqOpen.result;
      if (self.db.setVersion) {
        const reqVersion = self.setVersion(self.ver);
        reqVersion.onsuccess = function () {
          self.db.createObjectStore("class-time", { keyPath: "period" });
          self.db.createObjectStore("class-name", {
            keyPath: ["period", "dotw"],
          });
          self.db.createObjectStore("class-url", {
            keyPath: ["period", "dotw"],
          });
        };
      }
      self.selectClassTimes();
      self.selectClassNames();
      self.selectClassUrls();
    };
    reqOpen.onerror = function (e) {
      self.print("ERROR: " + e.code + ":" + e.message);
    };
    reqOpen.onblocked = function (err) {
      self.print("open() is BLOCKED");
    };
    console.log('ok');
  }

  /* (local const) classTime: {
        period: number;
        start: time?;
        end: time?;
    }[] */
  insertClassTimes(classTimes) {
    const self = this;
    if (classTimes.length == 0) return;

    const transaction = self.db.transaction(["class-time"], "readwrite");
    const store = transaction.objectStore("class-time");
    for (let i = 0; i < classTimes.length; i++) {
      const data = classTimes[i];
      const reqAdd = store.put(data);
      reqAdd.onsuccess = function (e) {
        self.classTimes[data['period']]['start'] = data['start'];
        self.classTimes[data['period']]['end'] = data['end'];
      };
      reqAdd.onerror = function (e) {
        self.print(e);
      };
    }
  }

  /* (local const) className: {
        period: number;
        dotw: number;
        name: string;
    }[] */
  insertClassName(className) {
    const self = this;
    if (className.length == 0) return;

    const transaction = self.db.transaction(["class-name"], "readwrite");
    const store = transaction.objectStore("class-name");
    for (let i = 0; i < className.length; i++) {
      const data = className[i];
      const reqAdd = store.put(data);
      reqAdd.onsuccess = function (e) {
        self.classNames[data['dotw']][data['period']] = data['name'];
      };
      reqAdd.onerror = function (e) {
        self.print(e);
      };
    }
  }

  /* (local const) classUrl: {
        period: number;
        dotw: number;
        url: string;
    }[] */
  insertClassUrl(classUrl) {
    const self = this;
    if (classUrl.length == 0) return;

    const transaction = self.db.transaction(["class-url"], "readwrite");
    const store = transaction.objectStore("class-url");
    for (let i = 0; i < classUrl.length; i++) {
      const data = classUrl[i];
      const reqAdd = store.put(data);
      reqAdd.onsuccess = function (e) {
        self.classUrls[data['dotw']][data['period']] = data['url'];
      };
      reqAdd.onerror = function (e) {
        self.print(e);
      };
    }
  }

  selectClassTimes() {
    const self = this;
    const transaction = self.db.transaction(["class-time"], "readonly");
    const reqGet = transaction.objectStore("class-time").openCursor();
    reqGet.onsuccess = function (e) {
      const cursor = reqGet.result;
      if (cursor == null) return;
      const data = cursor.value;
      const classTime = self.classTimes[cursor.key];
      classTime.start = data.start;
      classTime.end = data.end;
      cursor.continue();
    };
    reqGet.onerror = function (e) {
      self.print(e)
    };
  }

  selectClassNames() {
    const self = this;
    const transaction = self.db.transaction(["class-name"], "readonly");
    const reqGet = transaction.objectStore("class-name").openCursor();
    reqGet.onsuccess = function (e) {
      const cursor = reqGet.result;
      if (cursor == null) return;
      const data = cursor.value;
      self.classNames[cursor.key[1]][cursor.key[0]] = data.name;
      cursor.continue();
    };
    reqGet.onerror = function (e) {
      self.print(e)
    };
  }

  selectClassUrls() {
    const self = this;
    const transaction = self.db.transaction(["class-url"], "readonly");
    const reqGet = transaction.objectStore("class-url").openCursor();
    reqGet.onsuccess = function (e) {
      const cursor = reqGet.result;
      if (cursor == null) return;
      const data = cursor.value;
      self.classUrls[cursor.key[1]][cursor.key[0]] = data.url;
      cursor.continue();
    };
    reqGet.onerror = function (e) {
      self.print(e)
    };
  }

  // deleteDatabase() {
  //   const self = this;
  //   if (self.db) {
  //     self.db.close();
  //   }
  //   const reqDelete = self.indexedDB.deleteDatabase("gtclDB");
  //   reqDelete.onsuccess = function (e) {
  //   };
  //   reqDelete.onerror = function (e) {
  //     self.print(e);
  //   };
  //   reqDelete.onblocked = function (e) {
  //     self.print("deleteDatabase() is BLOCKED");
  //   };
  // }
}
