require('./config/config.js')
const express = require('express');

var app = express();
const port = process.env.PORT;

//fetch todos
app.get('/ping', (req, res) => {
    res.send({status:1,msg:'Success'});
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};
