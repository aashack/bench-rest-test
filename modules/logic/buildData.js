var api = require('../api/apiCall');
var _ = require('lodash');
var numeral = require('numeral');
var helper = require('../resources/helper');

exports.formatFull = function(data, callback) {
    var dataOut = {
      totalBalance: 0,
      totalCount: 0,
      transactions: null,
    }
    // clean the data
    data.forEach(function(x) {
      dataOut.totalBalance += Number(x.Amount);
      var cleanString = x.Company
      //Remove non capital Letters
      cleanString = cleanString.replace(/[^A-Z]/g, ' ');
      //Remove resulting white spaces
      x.Company = cleanString.replace( / +/g, ' ' ) ;
      // Change blank Ledger items to Deposits
      x.Ledger = (x.Ledger === '') ? 'Deposits' : x.Ledger;
    });
    //format total to currency value
    dataOut.totalCount = data.length;
    dataOut.transactions = data;
    callback(dataOut);
}

exports.sanitizeData = function(data, callback) {
  //expects formated values;
  var holdArray = data.transactions;
  // Sort List By Date ASC: query param to choose sort?
  holdArray = holdArray.sort( function(a,b) {
    if(a.Date > b.Date) return 1;
    if(a.Date < b.Date) return -1;
    return 0;
  });
  data.transactions = helper.removeDuplicates(holdArray);
  data.totalCount = data.transactions.length;

  callback(data);
}
// Expense : Something,
// TotalAmount : 222.22,
// Transactions: {
//        Company: Something,
//        Amount : 0.000
// }
exports.createExpenseReport = function(data, callback) {
  var transactionRecords = [];
  var totalAmount = 0;
  data.transactions.forEach(function(transaction) {
    // if nothing is added add it as the first item.
    if( transactionRecords.length === 0) {
      transactionRecords.push(helper.addExpense(transaction));
    } else {
      // find the index of the transaction with the same name
       var index =  _.findIndex(transactionRecords, {'expense': transaction.Ledger});
       // if -1 (doesn't exist) add it to the array.
       if(index > 0) {
         transactionRecords[index].totalAmount += parseFloat(transaction.Amount);
         transactionRecords[index].transactions.push({ 'Date': transaction.Date, 'Company': transaction.Company, 'Amount': parseFloat(transaction.Amount) });
       } else {
         transactionRecords.push(helper.addExpense(transaction));
       }
    }
    totalAmount += parseFloat(transaction.Amount);
  });
  var dataOut = {
    totalCount: transactionRecords.length,
    expenses: transactionRecords
  };
  callback(dataOut);
}

exports.createDailyBalances = function(data, callback) {
  var balancesDate = [];
  var groupedTotal=[];
  var runningTotal = 0;
  // Create
  var balancesDate = data.transactions.reduce(function (res, tranx) {
    if (res[tranx.Date]==null) {
        res[tranx.Date] = {
            'Total': 0,
            'RunningTotal': 0
        };
        groupedTotal.push(res[tranx.Date]);
    }
    runningTotal += parseFloat(tranx.Amount);
    res[tranx.Date].RunningTotal = runningTotal.toFixed(2);
    res[tranx.Date].Total += parseFloat(tranx.Amount);
    return res;
  }, {}); // without [initialValue] at the end, it skips the first value...

  callback(balancesDate);
}
