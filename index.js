const express    = require('express');
const app    = express();
const mongoose   = require('mongoose');
const config   = require('./config');
const bodyParser  = require('body-parser');
const userAction   = require('./user_action');
app.set('port',process.env.PORT || 8090);
mongoose.connect(config.path);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post('/createUser',(req,res)=>userAction.createUser(req,res));
app.post('/userLogin',(req,res)=>userAction.userLogin(req,res));
app.get('/getUserDetails/:id',(req,res)=>userAction.getUserDetails(req,res));
app.put('/editUserDetails/:id',(req,res)=>userAction.editUserDetails(req,res));
app.delete('/removeUserDetails/:id',(req,res)=>userAction.removeUserDetails(req,res));
app.get('/getallUser',(req,res)=>userAction.getallUser(req,res));
app.listen(app.get('port'),()=>{
console.log(`Server listening on ${app.get('port')}`);
})