import express from 'express';
import bodyParser from 'body-parser';
import users from './routes/admin'
import employee from './routes/employees';
import { resolve } from  'path'

require("babel-polyfill");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static(resolve(__dirname, 'src/public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/v1/auth", users);
app.use("/v1/gifs", employee);







export default app;