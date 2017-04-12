var rewire = require('rewire');
var buildData = rewire('../modules/logic/buildData');
var sinon = require('sinon');
var expect    = require('chai').expect;
var helper = rewire('../modules/resources/helper');

var sanitizeData = {
'totalBalance': -117.81,
'totalCount': 1,
'transactions': [
  {
    'Date': '2013-12-13',
    'Ledger': 'Insurance Expense',
    'Amount': '-117.81',
    'Company': 'LONDON DRUGS POSTAL VANCOUVER BC'
  },
  {
    'Date': '2013-12-13',
    'Ledger': 'Insurance Expense',
    'Amount': '-117.81',
    'Company': 'LONDON DRUGS POSTAL VANCOUVER BC'
  }
]
};

describe('Build Data - add Expense', function(done) {
  it('should return a JSON object populated with data', function(done) {
    var actual = sanitizeData.transactions[0];
     var expected = { 'expense': 'Insurance Expense', 'totalAmount': -117.81,
              'transactions': [{ 'Date': '2013-12-13', 'Company': 'LONDON DRUGS POSTAL VANCOUVER BC', 'Amount': -117.81 }]};
    var output = helper.addExpense(actual);
    expect(output.expense).equal(expected.expense);
    done();
  });
});
