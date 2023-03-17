//__________________________________________Loading_External_Modules______________________________________
var env = require('dotenv').config();
const express    = require('express');
const app    = express();
const mongoose   = require('mongoose');
const bodyParser  = require('body-parser');
var cors = require('cors')

//__________________________________________Loading_Internal_Modules______________________________________
const config   = require('./config');

app.use(cors())
app.set('port',process.env.PORT || 8095);
const { createLogger, format, transports } = require('winston');

mongoose.connect(config.path);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require("./lib/routes")(app);


const { combine, timestamp, label, printf } = format;
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
const logger = createLogger({
    format: combine(
      label({ label: 'WEBAPP ' }),
      timestamp(),
      customFormat
    ),
    transports: [new transports.Console()]
  });


// server running on below port
app.listen(process.env.PORT, () => {
    logger.info(`* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *`);
    logger.info(`* WEBAPP Environment Type : ${process.env.NODE_ENVIRONMENT} \t\t\t\t\t\t *`);
    logger.info(`* Server timezone ${process.env.NODE_ENVIRONMENT}, running at ` + new Date().toLocaleString() + `\t\t *`);
    logger.info(`* Server running on port ${process.env.PORT} \t\t\t\t\t\t\t *`);
    logger.info(`* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *`);
  });
//server connection...
