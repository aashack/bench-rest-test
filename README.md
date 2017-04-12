# README #

* Sample Data: http://resttest.bench.co/transactions/1.json
** 1.json increments by 1
* Project info: http://resttest.bench.co/

### What is this repository for? ###

* This Project is a Rest API test for bench.co

### How do I get set up? ###

* Requires NPM and NODEJS
* Can be run with 'npm start'
* Can be run in debug with 'npm run dev 3000'
* No Database Connections
* Deployment instructions: run through console, view with localhost:3000

### URL Endpoints ###
* /transactions/all - return compile unformatted list of transactions
* /transactions/cleaned - return a compiled list with cleaned up names
* /transactions/sanitized - return a compiled list cleaned and free of duplicates
* /reports/expense - return a report of expenses for each category
* /reports/daily - return a report of daily calculated balances

### Who do I talk to? ###
* Aaron Shack: aaron@aaronshack.ca 

### Issues I wish I could get too ###
* Passing in url parameters to indicate order
* I should of written this in HapiJS ;)
