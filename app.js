const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');

const connectDB = require('./server/database/connection');

//init app
const app = express();

dotenv.config({ path:'config.env'})
const PORT = process.env.PORT || 8080

//log req
app.use(morgan(`tiny`));

//DB connection
connectDB();

//favicon middleware
app.use(favicon(path.join(__dirname, 'assets/img', 'favicon.ico')));

//parse req. to body-parser
app.use(bodyparser.urlencoded({ extended: true}))

//set view-engine(EJS)
app.set('view engine', '.ejs') //upto date syntax for ejs(must follow)

//load assets(static folder)
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routes
app.use('/', require('./server/routes/routes'))

//cors
const corsResolve = {
    origin: 'https://umanagmentapp.herokuapp.com/',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsResolve));
  

app.listen(PORT, ()=>{
    console.log(`Server is running`)
});