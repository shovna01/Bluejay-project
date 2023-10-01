const { Console } = require('console');
const fs = require('fs'); //node module to read the CSV file

// Reading CSV File and Creating Employee Objects
function readCSVFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const lines = data.trim().split('\n');
  const employees = [];

  for (const line of lines) {
    const [positionID, positionStatus, timeIn, timeOut, timecardHours, payCycleStartDate, payCycleEndDate, employeeName, fileNumber] = line.split(',');

    if (employeeName && positionID) { // Ensure all required fields are present
      const employee = {
        employeeName: employeeName.trim(),
        position: positionStatus.trim(),
        timeIn: new Date(timeIn.trim()),
        timeOut: new Date(timeOut.trim()),
        timecardHours: parseFloat(timecardHours.trim()),
      };

      employees.push(employee);
    }
  }

  return employees;
}


// Reading the file
const employees = readCSVFile('Assignment_Timecard_bluejay.csv');

// Implementing the logic
analyzeEmployees(employees);
function analyzeEmployees(employees) {
  for (let i = 0; i < employees.length; i++) {
    const currentEmployee = employees[i];

    // a) Employees who worked for 7 consecutive days
    
    let consecutiveDays = 1;

    for (let j = i + 1; j < employees.length; j++) {
      const nextEmployee = employees[j];
      const timeDifference = nextEmployee.timeIn - currentEmployee.timeOut;
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference < 24 && hoursDifference > 0) {
        consecutiveDays++;
      } else {
        break; // Not consecutive
      }

      if (consecutiveDays === 7) {
        console.log('Employee Name (who worked for 7 consecutive days) :', currentEmployee.employeeName);
        console.log('Position (Of the Employee who worked for 7 consecutive days) :', currentEmployee.position);
        console.log();
        console.log();
        break;
      }
    }

    // b) Employees with less than 10 hours between shifts but greater than 1 hour

    if (employees[i + 1] && currentEmployee.timeOut < employees[i + 1].timeIn) {
      const hoursBetweenShifts = (employees[i + 1].timeIn - currentEmployee.timeOut) / (1000 * 60 * 60);

      if (hoursBetweenShifts < 10 && hoursBetweenShifts > 1) {
        console.log('Employee Name (with less than 10 hours between shifts but greater than 1 hour) :', currentEmployee.employeeName);
        console.log('Position (Of the Employees with less than 10 hours between shifts but greater than 1 hour) :', currentEmployee.position);
        console.log();
        console.log();
      }
    }

    // c) Employees who worked for more than 14 hours in a single shift

    if (currentEmployee.timecardHours > 14) {
        console.log('Employee Name (Who worked for more than 14 hours in a single shift) :', currentEmployee.employeeName);
        console.log('Position (Of the Employee who worked for more than 14 hours daily in a single shift) :', currentEmployee.position);
        console.log();
        console.log();
        }
    }
}

