const port = 5000;
const routes = require('./routes');
const express = require('express');
const expressConfig = require('./config/express');

//Initialize App
const app = express();
expressConfig(app);

//Routes
app.use(routes);

//Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}...`));