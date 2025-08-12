const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()
const dbPath = path.join(__dirname,"user.db")
let db = null
app.use(express.json())

const initializeDBServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () =>{
        console.log("Server is running at http://localhost:3000/")
})

    }
    catch(e){
        console.log(`DB Errr: ${e.message}`)
    }
}

initializeDBServer()

app.post('/',async (req,res) => {
    const createQuery = `
        CREATE TABLE user(
        username VARCHAR(20),
        name VARHAR(20),
        password VARCHAR(20)
        )
    `
    await db.run(createQuery)
    res.send('Table Created')
})

app.post('/users',async (req,res)=>{
    const insertDataQuery = `
        INSERT INTO user
        VALUES ('aravind','Aravind','aravind@123'),
               ('aditya','Aditya','aditya@123'),
               ('sudharshan','Sudharshan','sudharshan@123'),
               ('harry','Harry','harry@123'),
               ('potter','Potter','potter@123');
    `
    await db.run(insertDataQuery)
    res.send("Data is inserted")
})

app.post('/login',async (req,res)=> {
    const {username,password} = req.body
    const selectQuery = `
    SELECT * FROM user
    WHERE username=${username}
    `
    const dbUser = await db.run(selectQuery)
    if(dbPath === undefined){
        const createUserQuery = `
         INSERT INTO user
        `
    }
})
