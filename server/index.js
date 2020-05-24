// importing the express module into our code
const express = require('express');

// importintg web3 for smart contracts
const web3 = require('web3');

// sets up our HTTP connection to our local blockchain
const provider = new web3.providers.HttpProvider('http://localhost:8545');

// sets up web3 to use that htto connection (aka provider)
const web3Conn = new web3(provider);

const account = web3Conn.eth.accounts.privateKeyToAccount("0x9b6fed8c18bbb65e069d0cc04f2afa86e0bf4b98820023c5ae01f678b67e1ba9") // from ganache-cli terminal
web3Conn.eth.accounts.wallet.add(account);
web3Conn.eth.defaultAccount = account.address;

// using the filesystem module to read in the json interface for our smart contract
const fs = require('fs');

// json interface is a byte buffer (Buffer object)
const jsonInterface = fs.readFileSync('../build/contracts/VideoAuth.json');

// convert the Buffer into a JSON string
const jsonString = jsonInterface.toString();

// parsing our jsonString into an object interface to pass to web3
const jsonObject = JSON.parse(jsonString);

// create a RPC to the actual smart contract called videoAuth using contract ABI
const videoAuth = new web3Conn.eth.Contract(jsonObject.abi, "0xe4eAa5dd5FeAE4f4855492C20C1C6eF1EF52101D"); // from truffele migrate

console.log(videoAuth.methods);

// -- SERVER STUFF -- 

//creating a new instance of our server
// we need to bind it to a port
const app = express();

//creating a web handler for the localhost:8088/api route
//handler takes in a request and response object
// and manipulates the response before sesnding it back to the user
/*
// practice
app.get('/api/:id', (req, res) => {
    console.log(req.params, req.query)
    res.send("Hello to the api webpage");
});
*/

app.get("/api", async (req, res) => {
    compare_hash = await videoAuth.methods.compare_hash("xyz").call(); // should return false
    console.log(compare_hash);
    const store_hash = await videoAuth.methods.store_hash("xyz").send({ // will fail without provided gas
        from:"0xB728765487FF4ec881fe3F6Ee04C9D161262B67A", // from ganache-cli terminal
        gas: "250000", // not quite sure how to calculate these numbers
        gasPrice: "20000000" // not quite sure how to calculate these numbers
    }); 
    //console.log(store_hash);
    compare_hash = await videoAuth.methods.compare_hash("xyz").call(); //should return true
    console.log(compare_hash);
    compare_hash = await videoAuth.methods.compare_hash("cba").call(); //should return false
    console.log(compare_hash);
    res.status(200).json({ // 200 means success
        response: compare_hash
    })
})

app.listen(8088, () => {
    console.log("Server is now running on port 8088");
});