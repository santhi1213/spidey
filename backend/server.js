const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/spidey")
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log('MongoDB Connection Failed...'))

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true}
})

const User = mongoose.model("User", UserSchema);

app.post("/register", async(req, res)=>{
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, username, password: hashedPassword });
            await newUser.save();
            res.status(200).json({ message: 'User registration successful' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/login", async(req, res)=>{
    const {username, password}= req.body;

    try{
        const findUser = await User.findOne({username});

        if(!findUser){
            res.status(400).json({message:'User not found'})
        }

        const isMatched = await bcrypt.compare(password, findUser.password);
        if(!isMatched){
            res.status(400).json({message:'Password not matched'});
        }
        res.status(200).json({message:'Login successfull'})
    }catch(err){
        res.status(500).json({message:'internal server error'})
    }
})



app.listen(5001, () =>{
    console.log('server running on http://localhost:5001');
})