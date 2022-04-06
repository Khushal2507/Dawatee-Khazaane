import express from 'express'
import ejs from "ejs"
import bodyParser from "body-parser"
import {FirebaseApp, db} from "./config.js"
import multer from "multer"
import path from "path"
import _ from "lodash"
const storage = multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null,'uploads')
    },
    filename : (req,file,cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname) )
    } 

})
const upload =multer({storage: storage})
const app = express();  
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { collection, addDoc } from "firebase/firestore"; 
import { async } from '@firebase/util'
const __dirname = path.resolve();
app.use(bodyParser.urlencoded({ extended: true }))

// import User from "./config"

app.use(express.static("public"))

// const usersSchema = {
//     name: String,
//     email: String,
//     password: String
// }
// const thelewalasSchema = {
//     name: String,
//     location: String,
//     url : String
// }
// const User = mongoose.model("User", usersSchema);
// const Thelewala = mongoose.model("Thelewala",thelewalasSchema)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
// app.get("/create", async(req,res)=>{
//     const data = req.body;
//     console.log("Data of Users : " + data); 
//     res.send("User Added");
// })

const auth = getAuth();
const newEmailLogin = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
} 

const emailLogin = (email, password) =>{
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Correct')
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Incorrect')
  });
}

 
app.post("/:newUser",upload.single("image"), (req, res) => {
    var name, email, password;    //users Details
    var thele_name,thele_url,thele_num,thele_area;  //Thelewala Details
    var redirect = _.capitalize(req.params.newUser)
    if (redirect == "Newuser") {
        name = req.body.newName;
        email = req.body.newEmail;
        password = req.body.newPassword;
        newEmailLogin(email,password)
        res.sendFile(__dirname + "/final.html")
        // res.send(email+" "+password);
        // User.findOne({email: email }, function (err, foundItems) {
        //     if (foundItems) {
        //         res.send("User Already Exits")
        //     }
        //     else {
        //         const user = new User({
        //             name: name,
        //             email: email,
        //             password: password
        //         })
        //         user.save(function (err) {
        //             if (err)
        //                 res.send("Could not enter into Database");
        //             else
        //                 res.sendFile(__dirname + "/index.html")
        //         })
        //     }
        // })
    }
    else if (redirect == "Home") {
        email = req.body.email;
        password = req.body.password;
        emailLogin(email,password)
        // User.findOne({ email: email, password: password }, function (err, items) {
        //     if (items) {
        //         res.sendFile(__dirname+"/frontend.html")
        //     }
        //     else {
        //         res.sendFile(__dirname + "/index.html")
        //     }
        // })

        res.sendFile(__dirname + "/final.html")
    }
    else if(redirect == "Newthelewala"){
        res.sendFile(__dirname + "/add-new.html")
    }
    else if(redirect == "Addnewthelewala"){
        thele_name = req.body.newThelewala;
        thele_num = req.body.newNumber;
        thele_area = req.body.areaName;
        thele_url = req.body.newURL;
       
       addDoc(collection(db, "users"), {
                  name: thele_name,
                  number: thele_num,
                  area: thele_area,
                  url: thele_url
                });
            console.log("Document written with ID: ");
              res.sendFile(__dirname + "/final.html")

        // thelewala.save(function(err){
        //     if(err){
        //         res.send("Failed to enter the Details in the database")
        //     }
        //     else{
        //         res.sendFile(__dirname + "/final.html")
        //     }
        // })
    }
})


    app.listen("3000", () => {
        console.log("3000 is running");
    })