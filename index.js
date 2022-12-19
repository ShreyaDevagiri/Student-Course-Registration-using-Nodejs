var con = require('./db');
var express= require('express');
var app= express();
var bodyParser= require('body-parser');
const { commit } = require('./db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get('/',function(req,res){
    res.sendFile(__dirname + '/main.html');
});
app.post('/',function(req,res){
    var name= req.body.name;
    var password = req.body.password;
    if(name=="Shreya"&&password=="123"){
        res.redirect("/Admin");
    }
    else
    {
        res.redirect("/user");
    }
});
app.get('/Admin',function(req,res){
    res.render(__dirname + '/Admin');
});
app.get('/user',function(req,res){
    res.render(__dirname + '/user');
});
app.get('/display',function(req,res){
    var sql= "Select * from students";
    con.query(sql,function(error,result){
        if(error) throw error;
        res.render(__dirname + '/display',{students:result});
    });
});
app.get('/display2',function(req,res){
    var sql= "select * from students";
    con.query(sql,function(error,result){
        if(error) throw error;
        res.render(__dirname + '/display2',{students:result});
    });
});
app.get('/update-student',function(req,res){
    var sql = "select * from students where name=?";
    var name= req.query.name;
    con.query(sql,[name],function(error,result){
        if(error) throw error;
        res.render(__dirname + '/update-student',{students:result});
    });
});
app.post('/update-student',function(req,res){
    var name= req.body.name;
    var id = req.body.id;
    var email = req.body.email;
    var mno = req.body.mno;
    var sql= "update students set id=?, email=?, mno=? where name=?";
    con.query(sql,[id,email,mno,name],function(error,result){
        if(error) console.log(error);
        res.redirect('/display');
    });
});
app.get('/delete-student',function(req,res){
    var sql="delete from students where id=?"
    var id= req.query.id;
    con.query(sql,[id],function(error,result){
        if(error) console.log(error);
        res.redirect('/display');
    });
});
app.get('/search',function(req,res){
    var name= req.query.name;
    var sql = "select * from students where name Like '%"+name+"%' ";
    con.query(sql,function(error,result){
        if(error) console.log(error);
        res.render(__dirname + '/display2',{students:result});
    });
});
app.get('/insert',function(req,res){
    res.render(__dirname + '/insert_data');
});
app.post('/insert',function(req,res){
    var name= req.body.name;
    var id= req.body.id;
    var email= req.body.email;
    var mno= req.body.mno;
    var sql= "Insert into students(name, id, email, mno) values ('"+name+"','"+id+"','"+email+"','"+mno+"')";
    con.query(sql,function(error,result){
        if(error) throw error;
        res.redirect('display');
    });
});
app.listen(5000);