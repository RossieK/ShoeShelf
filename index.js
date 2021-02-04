const port = 5000;
const express = require('express');
const expressConfig = require('./config/express');

//Initialize App
const app = express();
expressConfig(app);

//Routes
app.get('/', (req, res) => {
    res.send("Hello there!").end();
});

//Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}...`));