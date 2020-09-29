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
const tempOverviw = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
        
    }
    return output;
    



}

const server = http.createServer((req, res)=>{
    
    const { query, pathname } = url.parse(req.url, true);
    
    //overview
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el) ).join('');
        const output = tempOverviw.replace('{%PRODUCT_CARDS%}',cardsHtml);
        


        res.end(output)



    //product
    }else if( pathname === '/product'){
        //console.log(query);
        //console.log(url.parse(req.url, true));
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        


        res.end(output);
    }
    //api
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


