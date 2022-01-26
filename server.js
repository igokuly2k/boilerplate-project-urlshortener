require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');

const app = express();
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
let arr=[];
app.get('/api/shorturl/:i',(req,res)=>{
res.redirect(arr[req.params.i-1]);
});
app.post('/api/shorturl',(req,res)=>{
  let url = req.body.url;
  dns.lookup(url.replace(/(^\w+:\/\/)|(\/.*$)/g,""),(err,address,family)=>{
    if(err) {
      console.log(err);
      res.json({error:'invalid url'});
  }
  else{
    console.log(url);
    arr.push(url);
    res.json({original_url:url,short_url:arr.length});
  }});
});
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
