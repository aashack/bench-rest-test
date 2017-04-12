var rewire = require('rewire');
var buildData = rewire('../modules/logic/buildData');
var sinon = require('sinon');
var expect = require('chai').expect;

  var testDataRaw =
  [{
    'Date': '2013-12-13',
    'Ledger': 'Insurance Expense',
    'Amount': '-117.81',
    'Company': 'LONDON DRUGS 78 POSTAL VANCOUVER BC'
  }];
  var formattedData = {
  'totalBalance': -117.81,
  'totalCount': 2,
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
  var sanitizeData = {
  'totalBalance': -117.81,
  'totalCount': 1,
  'transactions': [
    {
      'Date': '2013-12-13',
      'Ledger': 'Insurance Expense',
      'Amount': '-117.81',
      'Company': 'LONDON DRUGS POSTAL VANCOUVER BC'
    }
  ]
  };

describe('Build Data - Format Full' , function() {
  var expectedData = {
  'totalBalance': -117.81,
  'totalCount': 1,
  'transactions': [
    {
      'Date': '2013-12-13',
      'Ledger': 'Insurance Expense',
      'Amount': '-117.81',
      'Company': 'LONDON DRUGS POSTAL VANCOUVER BC'
    }]
  };
  it('should call the callback function', function() {
    var callback = sinon.spy();

    buildData.formatFull(testDataRaw, callback);
    expect(callback.calledOnce);
  });

  it('should return formatted Data', function(done) {
    expect(buildData.formatFull(testDataRaw, function(data){
        expect(data.transactions.Company).equal(expectedData.transactions.Company);
        expect(data.transactions.Ledger).equal(expectedData.transactions.Ledger);
        expect(data.transactions.Amount).equal(expectedData.transactions.Amount);
        expect(data.transactions.Company).equal(expectedData.transactions.Company);
        done();
    }));
  });
  it('should return Proper Header', function(done) {
    expect(buildData.formatFull(testDataRaw, function(data){
        expect(data.totalCount).equal(expectedData.totalCount);
        expect(data.totalBalance).equal(expectedData.totalBalance);
        expect(data.transactions.length).equal(expectedData.transactions.length);

        done();
    }));
  });
});

describe('Build Data - sanitizeData' , function() {

  it('should call the callback function', function() {
    var callback = sinon.spy();

    buildData.sanitizeData(sanitizeData, callback);
    expect(callback.calledOnce);
  });

  it('should return formatted Data', function(done) {
    expect(buildData.sanitizeData(formattedData, function(data){
        expect(data.transactions.Company).equal(formattedData.transactions.Company);
        expect(data.transactions.Ledger).equal(formattedData.transactions.Ledger);
        expect(data.transactions.Amount).equal(formattedData.transactions.Amount);
        expect(data.transactions.Company).equal(formattedData.transactions.Company);
        done();
    }));
  });
  it('should return Proper Header', function(done) {
    expect(buildData.sanitizeData(formattedData, function(data){
        expect(data.totalCount).equal(formattedData.totalCount);
        expect(data.totalBalance).equal(formattedData.totalBalance);
        expect(data.transactions.length).equal(formattedData.transactions.length);
        expect(data.transactions.length).not.equal(formattedData.transactions.length+1);

        done();
    }));
  });
});

describe('Build Data - Expense Report' , function() {
  it('should call the callback function', function() {
    var callback = sinon.spy();

    buildData.createExpenseReport(sanitizeData, callback);
    expect(callback.calledOnce);
  });

  it('should return formatted expense Report', function(done) {
    expect(buildData.createExpenseReport(formattedData, function(data){
        expect(data.totalCount).equal(1);
        expect(data.expenses[0].expense).equal('Insurance Expense');
        expect(data.expenses[0].transactions.length).equal(1);
        expect(data.expenses[0].transactions[0].Date).equal('2013-12-13');
        expect(data.expenses[0].transactions[0].Company).equal('LONDON DRUGS POSTAL VANCOUVER BC');
        expect(data.expenses[0].transactions[0].Amount).equal(-117.81);
        done();
    }));
  });
});

var reportData = {
  "totalBalance": 18377.16,
  "totalCount": 36,
  "transactions": [
    {
      "Date": "2013-12-20",
      "Ledger": "Business Meals & Entertainment Expense",
      "Amount": "-120.00",
      "Company": "COMMODORE LANES BILL VANCOUVER BC"
    },
    {
      "Date": "2013-12-21",
      "Ledger": "Business Meals & Entertainment Expense",
      "Amount": "-9.88",
      "Company": "GUILT CO VANCOUVER BC"
    }
  ]
}
var expectedReport ={ '2013-12-20': { Total: -120, RunningTotal: '-120.00' },
  '2013-12-21': { Total: -17.98, RunningTotal: '-129.88' },
  '2013-12-22': { Total: -110.71, RunningTotal: '-248.69' } }
describe('Build Data - Daily Running Total' , function() {
  it('should call the callback function', function() {
    var callback = sinon.spy();
    buildData.createDailyBalances(reportData, callback);
    expect(callback.calledOnce);
  });

  it('should return formatted expense Report', function(done) {
    expect(buildData.createDailyBalances(reportData, function(data){
        expect(expectedReport['2013-12-20'].RunningTotal).equal(data['2013-12-20'].RunningTotal);
        expect(expectedReport['2013-12-21'].RunningTotal).equal(data['2013-12-21'].RunningTotal);

        done();
    }));
  });
});
