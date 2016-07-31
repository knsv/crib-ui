const express = require('express');
var app = express();

console.log('Starting crib-ui, listening on port 4000!');
app.use('/static', express.static('/Users/knut/source/crib/crib-inst/node_modules/crib-ui/dist'));
app.use('/', express.static('/Users/knut/source/crib/crib-inst/node_modules/crib-ui'));

app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
});