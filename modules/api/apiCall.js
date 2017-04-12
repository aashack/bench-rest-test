//http://resttest.bench.co/transactions/2.json
var http = require('http');
var request = require('request');
var async = require('async');
var _ = require('lodash');

exports.getApiData = function(callback) {
  var numOfItems = 0;
  var holdArray = [];
  var count = 0;
  async.doUntil(
    // Initial API Call
    function(callback) {
      count++;
      // move request into method to test indivually
      request('http://resttest.bench.co/transactions/' + count + '.json', function (error, response, body) {
        if(error !== null) {
          callback(err, null);
        }
        // callback data if recieved
        var data = JSON.parse(body);
        callback(null, data);
      });
    },
    function(element) {
      // If a element exists
      if(Boolean(element)) {
        // If nothing has been added, add the first one
        if (numOfItems === 0 ) {
          var amount = Math.ceil(element.totalCount / element.transactions.length);
          numOfItems = amount;
        }
          //Stack arrays on arrays to join.
          var tempArray = element.transactions;
          holdArray = _.concat(tempArray, holdArray);
      } else {
        console.log('Call retrieved nothing, moving to next value');
      }
      // End condition if false keep calling
      return count === numOfItems;
    },
    function() {
      //The error block, used to return data
      callback(holdArray);
    }
  )
};
