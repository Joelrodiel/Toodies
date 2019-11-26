const express = require('express');
const path    = require('path');

const app     = express();

app.use(express.static(__dirname + '/dist/Toodies'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Toodies/index.html'));
});

const port = process.env.PORT || 3001;

console.log("Listening on port " + port);

app.listen(port);
