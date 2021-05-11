const express = require('express');
const app = express();
const port = 3000;
const users = require('./controllers/user');

app.use('/user', users);
app.use(express.urlencoded({ extended: false}));

app.listen(port, () => {
    console.log("listening to port 3000");
})