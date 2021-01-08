var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json())
var count=1;
//serve sample static data using express.js framework.
app.use('/staticfiles', express.static('assets/files'))

//call some functions randomly using setTimeout,setInterval,setImmediate
app.get('/timers', function (req, res) {

setTimeout(function() {
    timercheck1();
}, 5000);

setInterval(function() {
timercheck2();
 
}, 3000);

setImmediate(function() {
    timercheck3();
});
res.send("running")
})

function timercheck1()
{
    return console.log("hello Settimeout for 5s");
}
function timercheck2(){
    count=count+1;
console.log("counting for every 3s "+count)
}
function timercheck3(){
    
    console.log('I am an immediate with initail count '+count);

}


//Read the file using File system with body {"filename":"sample.json"}
app.get('/readFile', function (req, res) {
fs.readFile( __dirname + "/assets/files/" + req.body.filename, 'utf8', function (err, data) {
       if(err)
       {
           console.log(err)
           res.status(404).json({message:"cannot read file"})
           return
       }
   res.status(200).send( data );
    });
})

//Read the file using streams- with body {"filename":"stream.txt"}
app.get('/readFileStream', function (req, res) {
var Stream = fs.createReadStream(__dirname + "/assets/files/"+req.body.filename,{encoding: 'utf8'});
logs(Stream);
res.send("reading")
});

    async function logs(Stream) {
        for await (const stream of Stream) {
            console.log("streaming...")
          console.log(stream);
        }
      }

//Delete a file using file system with body {"filename":"logo.txt"}
app.delete('/deletefile', function (req, res) {
    fs.unlink(__dirname + "/assets/files/" + req.body.filename, (err,data) => {
        if (err) {
          console.error(err)
          res.status(404).json({message:"cannot delete file "})
          return
        }
      res.status(200).json({message:"deleted file "+req.body.filename})
        //file removed
      });

    })

    //call three functions using the below functionality
    //a.callback
    //b.Promises
    //c.Async-await
    //with body :
    // {
    //     "color1": "red",
    //     "color2": "blue",
    //     "color3": "green"
    // }
    app.get('/functions', function (req, res) {
  var one= req.body.color1
  var two= req.body.color2
  var three= req.body.color3

        mergeAll(one,two,three)
        res.status(200).json({message:"CallBacks"})
        })

    async function mergeAll(one,two,three){
        let toPrint = await ('', one)
        toPrint = await merge(toPrint, two)
        toPrint = await merge(toPrint, three)
        getcolors(toPrint)
        //toPrint = toPrint + ' hello';
        console.log(toPrint) // Prints out " A B C"
      }

      function merge(previous, current){
        return new Promise((resolve, reject) => {
          setTimeout(
            () => {
              resolve(previous + ' ' + current) //Async function
            }, 
            Math.floor(Math.random() * 100) + 1
          )
        })
      }
 
      function getcolors(color){
          let array=color.split(" ")
          console.log(array)
      }
    //server listening to 3000
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
