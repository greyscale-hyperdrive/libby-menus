require('newrelic');
const app = require('./application');

const port = process.env.PORT || 3005;
app.listen(port);
