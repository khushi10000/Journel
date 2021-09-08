//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const { request } = require("express");
var posts=[];
var newpost;
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
var post = mongoose.Schema;

var journel = new post({
  data: String,
  title: String
});

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(request,response){
  // response.sendFile(__dirname+"/home.ejs")
  response.render("home",{
    para1:homeStartingContent,
    posts:posts
  });
  // console.log(posts);
})
app.get("/about",function(request,response){
  response.render("about",{
    ac:aboutContent
  })
})

app.get("/contact",function(request,response){
  response.render("contact",{
    cc:contactContent
  })
})
app.get("/compose",function(request,response){
  
  response.render("compose")

})
app.get("/post/:some",function(request,response){
 
  
  for(var j=0;j<posts.length;j++){
    const t= request.params.some;
     const h=_.lowerCase(t);
     console.log(h);
  
    const v = _.lowerCase(posts[j].one); 
    if(h==v){
      const oneposttitle= posts[j].one;
      var onepostpost= posts[j].two;
      response.render("post",{
        oneposttitle:oneposttitle,
        onepostpost:onepostpost,
        

        
      });
      response.redirect("/post/:some");
      console.log("Match Found!!")

    }
    else{
      console.log("Error:")
    }

  };
  

});
app.post("/compose",function(req,res){
  // const addedtext= request.body.composedtext;
  // console.log(addedtext);
  // var addedtitle;
  
  

  newpost={
    one : req.body.postTitle,
    two : req.body.posttext
     

  };
  posts.push(newpost);
 
  // res.render("home",{
  //   n:posts
  // });
  
  res.redirect("/");
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});













