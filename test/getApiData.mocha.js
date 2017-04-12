var rewire = require('rewire');
var apiCallModule = rewire('../modules/api/apiCall.js');
var sinon = require('sinon');
var expect    = require('chai').expect;


callApiMock = {};

// apiCallModule.__set__('path', '/dev/null');
// apiCallModule.__get__('path'); // = '/dev/null'
// {
//     'Date': '2013-12-18',
//     'Ledger': 'Business Meals & Entertainment Expense',
//     'Amount': '-8.94',
//     'Company': 'NESTERS MARKET #x0064 VANCOUVER BC'
//   },

// callApiMock.getApiInfo = sinon.stub().callsArgWith(
//   [{Date: '2013-12-18', Ledger: 'Book', Amount: '-8.94', Company: 'Nesters'}]);
//
//   before(function() {
//     apiCallController.__set__({
//
//     });
//
//   });

// TODO: Add tests for Async doUntil method.
describe('getApiData' , function() {

  it('should call the callback function', function() {
    var callback = sinon.spy()

    apiCallModule.getApiData(callback);
    expect(callback.calledOnce);

  });
  });
