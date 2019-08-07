const electron = require("electron");
const fs = require("fs");
const path = require("path");

function log(data) {
  const logFileName = "grinding.log";
  // .app works for my the main process
  // .remote.app for render processes
  // "userData" returns the app data directory (depends on OS)
  const userDataPath = (electron.app || electron.remote.app).getPath(
    "userData"
  );
  console.log(userDataPath);
  const fullPath = path.join(userDataPath, logFileName);
  // flag : '"a" is for append mode
  console.log(fullPath);
  const logStream = fs.createWriteStream("my_file.txt", { flags: "a" });
  logStream.on("error", err => {
    console.log(err);
  });

  logStream.once("open", function(fd) {
    logStream.write(data + "\n");
    logStream.end();
  });
}
module.exports = log;
log("this is test 1");
log("this is test 2");
log("this is test 3");

/*
using fs.createWriteStream for first version 
fs.appendFile might be a better option for this use case


const logFileName = "grinding.log";
// .app works for my the main process
// .remote.app for render processes
// "userData" returns the app data directory (depends on OS)
const userDataPath = (electron.app || electron.remote.app).getPath("userData");
const fullPath = path.join(userDataPath, logFileName);
// flag : '"a" is for append mode
const logStream = fs.createWriteStream(fullPath, { flags: "a" });

logStream.on("open", fd => {
  console.log("file is open");
  console.log("fd: " + fd);
});


logStream.write();
*/
