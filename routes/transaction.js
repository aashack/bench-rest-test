var callApi = require('../modules/api/apiCall.js');
var build = require('../modules/logic/buildData');

exports.getTransactionBasic = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  callApi.getApiData(function(data) {
    res.send(JSON.stringify(data));
  });
};

exports.getTransactionFormatted = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  callApi.getApiData(function(data) {
    build.formatFull(data, function(dataOut){
      res.send(dataOut);
    });
  });
};

exports.getTransactionDeDupe = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  callApi.getApiData(function(data) {
    build.formatFull(data, function(dataFormatted){
      build.sanitizeData(dataFormatted, function(dataSanatized){
        res.send(dataSanatized);
      });
    });
  });
};

exports.getExpenseReport = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  callApi.getApiData(function(data) {
    build.formatFull(data, function(dataFormatted){
      build.sanitizeData(dataFormatted, function(dataSanatized){
        build.createExpenseReport(dataFormatted, function(expenseOut){
          res.send(expenseOut);
        });
      });
    });
  });
};

exports.getDailyReport = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  callApi.getApiData(function(data) {
    build.formatFull(data, function(dataFormatted){
      build.sanitizeData(dataFormatted, function(dataSanatized){
        build.createDailyBalances(dataFormatted, function(reportOut){
          res.send(reportOut);
        });
      });
    });
  });
};
