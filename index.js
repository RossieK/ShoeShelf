const { port } = require('./config/config');
const routes = require('./routes');
const express = require('express');
const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');

//Initialize App
const app = express();
expressConfig(app);
mongooseConfig(app);

//Routes
app.use(routes);

//Server initialization
app.listen(port, () => console.log(`Server listening on port ${port}...`));