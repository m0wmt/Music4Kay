// https://github.com/mariadb-corporation/dev-example-todo/blob/master/api/nodejs/basic/routes/tasksRoutes.js

const express = require('express')
// const db = require('./db')
const app = express()
const cors = require('cors');

const port = 3010
const bodyParser = require('body-parser');
const path = require('path');

const musicRouter = require('./routes/music');
const statusRouter = require('./routes/status');
const bookRouter = require('./routes/book');
const songRouter = require('./routes/songRoutes');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/api/v1/music', musicRouter);
app.use('/api/v1/status', statusRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/songs', songRouter);

app.use((err, req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(422).send({ error: err._message });
});

app.use((err, req, res, next) => {
    console.log("Error: ", req);
    res.set('Access-Control-Allow-Origin', '*');
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'))
});

app.listen(port, () => console.log(`Listening on port ${port}`));