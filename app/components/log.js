/*

The main grinding log object used to access the system stored log file.

will handle:
> Write Logs
> Reade Logs

@TODO Create custom object types 'gLogEntry' & 'gLogLocation'

*/

const logName = 'gLog';
const tempLogName = 'tempLog';

const getLogData = key =>
  localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;

function createNewLog(key) {
  // this can be used to create some future log header information;
  const logFirstEntry = [];
  window.localStorage.setItem(key, JSON.stringify(logFirstEntry));
  return logFirstEntry;
}

function setLogData(key, logData) {
  /*
   * NOTE: This function can easily wipe log data!
   * Might want to provide and auto backup feature
   * to prevent bugs from wiping entire history
   */

  window.localStorage.setItem(key, JSON.stringify(logData));

  // Might want to return a false on fails to write
  return true;
}

function append(key, gLogEntry) {
  // gLogEntry: {gTime: number
  //             startTime: number, tag: string, goal: string,
  //             stopTime: number, mood: string, comment: string,
  //             }
  console.log(`Appending new logEntry ${gLogEntry}`);
  const logData = getLogData(key) || createNewLog(key);
  console.log({ logData });
  const updatedLog = logData.concat(gLogEntry);

  // This function will completely replace the existing log! Be Careful!
  setLogData(logName, updatedLog);
  console.log('grindingLog has been updated!');
}

function removeTempLog() {
  window.localStorage.removeItem(tempLogName);
  console.log('Temp Log Removed');
}

const log = {
  start(gLogStart) {
    // gLogStart: {start: number,tag: string,goal: string}

    // check if temp session is already started
    if (getLogData(tempLogName)) return false;

    setLogData(tempLogName, gLogStart);
    console.log(`temp log started: ${gLogStart}`);
    return true;
  },
  stop(gLogStop) {
    // gLogStop: {stop: number,mood: string,comment: string, gTime: number}

    const gLogStart = getLogData(tempLogName);

    // should throw error to prevent stop with no start. For now I will just return false
    if (!gLogStart) return false;

    const gLogEntry = Object.assign({}, gLogStart, gLogStop);
    append(logName, gLogEntry);
    removeTempLog();

    return true;
  },

  read() {
    return getLogData(logName);
  }
};

export default log;
