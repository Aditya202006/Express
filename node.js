const express = require('express');
const path = require('path');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json())
const dbPath = path.join(__dirname,"users.db");
let db = null;
const initilizeDBServer = async()=>{
    try{
        db = await open({
            filename : dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log("server is running");
        })
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}
initilizeDBServer()
app.get('/user/:userid',async(req,res)=>{
    const {userid} = req.params;
    const createTable = `

    select * from user;
    `
    const useArr = await db.all(createTable)
    res.send(useArr)
})
