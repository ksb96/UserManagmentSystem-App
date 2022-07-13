const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config({ path:'config.env'})
const PORT = process.env.PORT || 8080

//log req
app.use(morgan(`tiny`));

//parse req. to body-parser
app.use(bodyparser.urlencoded({ extended: true}))

//set view-engine(EJS)
app.set("view-engine", "ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets(static folder)
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.get('/', (req,res) =>{
    res.send('crud application running');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});