var http = require('http');
var express = require('express');
var app = express();
var benchRest = require('./routes/transaction');

app.set('port', process.env.PORT || 3000);

app.get('/transactions/all', benchRest.getTransactionBasic);
app.get('/transactions/cleaned', benchRest.getTransactionFormatted);
app.get('/transactions/sanitized', benchRest.getTransactionDeDupe);
app.get('/reports/expense', benchRest.getExpenseReport);
app.get('/reports/daily', benchRest.getDailyReport);


app.listen(app.get('port'), function(){
  console.log('Server runnning on port: ' + app.get('port'));
});
