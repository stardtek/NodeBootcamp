const fs = require('fs');
const http = require('http');
const url = require('url');
///////////////////////////////////
////////FILES
/* const textIn = fs.readFileSync("./txt/input.txt",'utf-8');
const textOut = `This si what we know about the avocado: ${textIn} \n Created on ${Date.now}`

fs.writeFileSync('./txt/output.txt', textOut);
console.log("File wriete."); */

//Non-blocing, asynchronus way

/* fs.readFile("./txt/start.txt",'utf-8', (err, data1) =>{
    fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) =>{
        
        console.log(data2);
        fs.readFile(`./txt/append.txt`,'utf-8', (err, data3) =>{
            console.log(data3);
            
            fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`, 'utf-8', err => {
                console.log("File ahs been writen");
            });
    
        });
    });
});
console.log("will read file"); */
/////////////////////////////////////
///////////// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObject = JSON.parse(data);



const server = http.createServer((req, res)=>{
    const pathname = req.url;
    if(pathname === '/' || pathname === '/overview'){
        res.end('This is overview');    
    }else if( pathname === '/product'){
        res.end('This is product');
    }
    else if(pathname === '/api'){

        
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);
      

        


    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html'

        });
        res.end("<h1>page not found</h1>")
    }



});
server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening on port 8000");
})


