const express = require('express');
const app = express();
const path = require('path');
const reddictData = require('./data.json');
// console.log(reddictData); 

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/cat',(req,res)=>{
    const cats = ['blue','green','yellow','pink','reddish']
    res.render('cats',{cats})
})

app.get('/rand',(req,res)=>{
   const num =  Math.floor(Math.random()*10+1);
    res.render('random',{num});
})


app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params;
    const data = reddictData[subreddit];
    // console.log(data);
    if(data){
        res.render('subreddit',{...data});
    }else{
        res.render('notfound',{subreddit});
    }
    
})
app.get('/r/:subreddit/:postId',(req,res)=>{
    const {subreddit,postId} = req.params;
    
    res.send(`<h1> Browsing the ${subreddit} subreddit and post ID is ${postId}</h1>`)
})
app.post('/cats',(req,res)=>{
    res.send('This is Post request to /cat .this is different then a get request');
})

app.get('/cats',(req,res)=>{
    res.send('MEOW!!!');
})

app.get('/dogs',(req,res)=>{
    res.send('WOOF!!');
})

app.listen(3000,()=>{
    console.log("Listening to the port 3000!");
})