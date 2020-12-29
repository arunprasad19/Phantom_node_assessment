Assets/files as all the files needed to perform the following operations:

//serve sample static data using express.js framework.
API get /staticfiles
http://localhost:3000/staticfiles/sample.json

//call some functions randomly using setTimeout,setInterval,setImmediate
API get /timers
http://localhost:3000/timers


//Read the file using File system 
API get /readFile
http://localhost:3000/timers
body:
{"filename":"sample.json"}

//Read the file using stream
API get /readFileStream
http://localhost:3000/readFileStream
body:
{"filename":"stream.txt"}

//Delete a file using file system 
API delete /deletefile
http://localhost:3000/deletefile
body:
 {"filename":"logo.txt"}

//call three functions using the below functionality
//a.callback
//b.Promises
//c.Async-await

API get /functions
http://localhost:3000/functions
body :
{
"color1": "red",
"color2": "blue",
"color3": "green"
}
