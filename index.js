const express=require('express');
const port=8003;
const path=require('path');
const db=require('./config/mongoose');
const Todo=require('./models/todo');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// to use encrypted data
app.use(express.urlencoded());
// using static files
app.use(express.static('assets'));

// rendering the TODO Page
app.get('/', function(req, res){
    Todo.find({}, function(err, todolist){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title: "Home",
            task: todolist
        });
    });
});

// creating TODO
app.post('/create_todo', function(req, res){
    //  console.log("Creating Task");
      
      Todo.create({
          description: req.body.description,
          category: req.body.category,
          date: req.body.date
          }, function(err, newtodo){
          if(err){
            console.log('error in creating task', err); 
            return;
        }
          
  
          console.log(newtodo);
          return res.redirect('back');
  
      });
  });


   // deleting Tasks
app.get('/delete-todo', function(req, res){
    // get the id from query
    console.log(req.query);
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Todo.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});


 

app.listen(port,function(err){
    if(err){
        console.log('Error is running the server',err);
    }
    console.log("my express sever is running on port",port);
});