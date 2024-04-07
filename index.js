function createEmployeeRecord(elements) {
    return {
        firstName: elements[0],
        familyName: elements[1],
        title: elements[2],
        payPerHour: elements[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records) {
    return records.map(function (record) {
        return createEmployeeRecord(record);
    });
}
// "2018-02-28 1400"
function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function hoursWorkedOnDate(dateMatched) {
    let inEvent = this.timeInEvents.find(function (e) {
        return e.date === dateMatched;
    });
    let outEvent = this.timeOutEvents.find(function (e) {
        return e.date === dateMatched;
    });
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(matchedDate) {
    let wageOnDate = hoursWorkedOnDate.call(this, matchedDate) * this.payPerHour;
    return parseFloat(wageOnDate.toString());
}

function calculatePayroll(employeesRecords) {
    return employeesRecords.reduce(function (memo, rec) {
        return memo + allWagesFor.call(rec);
    }, 0);
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(function(record){
        return record.firstName === firstNameString;
});
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

