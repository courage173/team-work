import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/admin'
require("babel-core/register");
require("babel-polyfill");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1/auth/',router)







export default app;