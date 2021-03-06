const express = require('express')
const app = express()
const port =5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// //application/json
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const mongoos = require('mongoose');
const { mongoURI } = require('./config/dev');
mongoos.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! ddㅎㅎ')
})

app.post('/register',(req,res)=> {
    
    const user = new User(req.body)
    user.save((err, usefInfo ) => {
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

