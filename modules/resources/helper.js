var _ = require('lodash');
var numeral = require('numeral');


// Simple method that returns an Json object, didn't want to repeat it.
exports.addExpense = function(transaction) {
  return { 'expense': transaction.Ledger, 'totalAmount': parseFloat(transaction.Amount),
           'transactions': [{ 'Date': transaction.Date, 'Company': transaction.Company, 'Amount': parseFloat(transaction.Amount) }]
         }
}

// remove Duplicate JSON objects from array
exports.removeDuplicates = function(arr) {
  var cleaned = [];
  arr.forEach(function(itm) {
      var unique = true;
      cleaned.forEach(function(itm2) {
          if (_.isEqual(itm, itm2)) unique = false;
      });
      if (unique)  cleaned.push(itm);
  });
  return cleaned;
}
