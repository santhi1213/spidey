const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors({
    origin:['https://spidey-frontend.vercel.app/'],
    methods:['GET','POST','PUT'],
    credentials: true
}));

// mongoose
//     // .connect("mongodb://localhost:27017/spidey")
//     .connect("mongodb+srv://santhiraju32:h2BVjIw1gaWTExgD@batter-management-db.jlsj4.mongodb.net/?retryWrites=true&w=majority&appName=batter-management-db")
//     .then(() => console.log("MongoDB Connected Successfully"))
//     .catch((err) => console.log("MongoDB Connection Failed..."));

mongoose
    .connect("mongodb+srv://santhiraju32:h2BVjIw1gaWTExgD@batter-management-db.jlsj4.mongodb.net/?retryWrites=true&w=majority&appName=batter-management-db")
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));  // Log the error in case of failure


    const UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },  // Ensure username is unique
        password: { type: String, required: true },
    });
    const User = mongoose.model("User", UserSchema);
    

const HandoverItems = new mongoose.Schema({
    clientName: { type: String, required: true },
    idlyBatter: { type: String, required: true },
    dosaBatter: { type: String, required: true },
    bobbaraBatter: { type: String, required: true },
    pesaraBatter: { type: String, required: true },
    date: { type: String, required: true },
});
const handoverItems = mongoose.model("handoverItems", HandoverItems);

const ReturnItems = new mongoose.Schema({
    clientName: { type: String, required: true },
    idlyBatter: { type: String, required: true },
    dosaBatter: { type: String, required: true },
    bobbaraBatter: { type: String, required: true },
    pesaraBatter: { type: String, required: true },
    date: { type: String, required: true },
});
const returnItems = mongoose.model("returnItems", ReturnItems);

const AddUser = new mongoose.Schema({
    userName: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    date: { type: String, required: true },
});
const newUser = mongoose.model("AddUser", AddUser);

const JWT_SECRET = "your_secret_key";
app.get("/",async(req,res)=>{
    res.json('hello')
})
app.post("/register", async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, username, password: hashedPassword });
            await newUser.save();
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "User registration successful" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post('/login', async (req, res) => {
    console.log('Login endpoint called');
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    console.log('Checking credentials...');
    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 500)); // Mock delay
    
    if (username === 'raju@gmail.com' && password === 'raju1234') {
        console.log('Login successful');
        return res.status(200).json({ token: 'fake-jwt-token' });
    }

    console.log('Invalid credentials');
    return res.status(401).json({ message: 'Invalid credentials.' });
});


app.post("/producthandover", async (req, res) => {
    const {
        clientName,
        idlyBatter,
        dosaBatter,
        pesaraBatter,
        bobbaraBatter,
        date,
    } = req.body;

    try {
        const newHandoverItems = new handoverItems({
            clientName,
            idlyBatter,
            dosaBatter,
            pesaraBatter,
            bobbaraBatter,
            date,
        });
        await newHandoverItems.save();
        res.status(200).json({ message: "Items added successfully" });
    } catch (err) {
        console.error("Error saving handover items:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/returnproduct", async (req, res) => {
    const {
        clientName,
        idlyBatter,
        dosaBatter,
        pesaraBatter,
        bobbaraBatter,
        date,
    } = req.body;

    try {
        // Check if handover items exist for the same client on the same date
        const handoverItem = await handoverItems.findOne({ clientName, date });

        if (!handoverItem) {
            return res
                .status(400)
                .json({
                    message: "No handover items found for this client on this date",
                });
        }

        // Validate if the returned items are within the handed-over quantities
        if (
            parseInt(idlyBatter) > parseInt(handoverItem.idlyBatter) ||
            parseInt(dosaBatter) > parseInt(handoverItem.dosaBatter) ||
            parseInt(pesaraBatter) > parseInt(handoverItem.pesaraBatter) ||
            parseInt(bobbaraBatter) > parseInt(handoverItem.bobbaraBatter)
        ) {
            return res
                .status(400)
                .json({ message: "Returned items exceed handed-over quantities" });
        }

        // Save the return items
        const newReturnItems = new returnItems({
            clientName,
            idlyBatter,
            dosaBatter,
            pesaraBatter,
            bobbaraBatter,
            date,
        });
        await newReturnItems.save();

        res.status(200).json({ message: "Items returned successfully" });
    } catch (err) {
        console.error("Error saving return items:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/adduser", async (req, res) => {
    const { userName, location, contact, date } = req.body;

    try {
        const newClient = new newUser({ userName, location, contact, date });
        await newClient.save();
        res.status(200).json({ message: "New Client Added Successfully" });
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ message: "internal server error" });
    }
});
app.get("/users", async (req, res) => {
    try {
        const users = await newUser.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/getRemainingItems", async (req, res) => {
    const { date } = req.body;

    try {
        const handoverItemsForDate = await handoverItems.find(
            date ? { date } : {} 
        );

        const returnItemsForDate = await returnItems.find(
            date ? { date } : {} 
        );

        let remainingItems = [];

        for (const handoverItem of handoverItemsForDate) {
            const returnItem = returnItemsForDate.find(
                (item) => item.clientName === handoverItem.clientName
            );

            if (!returnItem) {
                remainingItems.push(handoverItem);
            } else {
                const remainingItem = {
                    clientName: handoverItem.clientName,
                    idlyBatter: (
                        parseInt(handoverItem.idlyBatter || 0) -
                        parseInt(returnItem.idlyBatter || 0)
                    ).toString(),
                    dosaBatter: (
                        parseInt(handoverItem.dosaBatter || 0) -
                        parseInt(returnItem.dosaBatter || 0)
                    ).toString(),
                    bobbaraBatter: (
                        parseInt(handoverItem.bobbaraBatter || 0) -
                        parseInt(returnItem.bobbaraBatter || 0)
                    ).toString(),
                    pesaraBatter: (
                        parseInt(handoverItem.pesaraBatter || 0) -
                        parseInt(returnItem.pesaraBatter || 0)
                    ).toString(),
                    date: handoverItem.date,
                };
                remainingItems.push(remainingItem);
            }
        }

        res.status(200).json({ remainingItems });
    } catch (err) {
        console.error("Error fetching or processing items:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get("/getRemainingItemsWithoutDate", async (req, res) => {
    try {
        const handoverItemsData = await handoverItems.find({});
        const returnItemsData = await returnItems.find({});

        let remainingItems = [];

        for (const handoverItem of handoverItemsData) {
            const returnItem = returnItemsData.find(
                (item) =>
                    item.clientName === handoverItem.clientName &&
                    item.date === handoverItem.date
            );

            if (!returnItem) {
                remainingItems.push(handoverItem);
            } else {
               
                const remainingItem = {
                    clientName: handoverItem.clientName,
                    idlyBatter: (
                        parseInt(handoverItem.idlyBatter) - parseInt(returnItem.idlyBatter)
                    ).toString(),
                    dosaBatter: (
                        parseInt(handoverItem.dosaBatter) - parseInt(returnItem.dosaBatter)
                    ).toString(),
                    bobbaraBatter: (
                        parseInt(handoverItem.bobbaraBatter) - parseInt(returnItem.bobbaraBatter)
                    ).toString(),
                    pesaraBatter: (
                        parseInt(handoverItem.pesaraBatter) - parseInt(returnItem.pesaraBatter)
                    ).toString(),
                    date: handoverItem.date,
                };
                remainingItems.push(remainingItem);
            }
        }

        res.status(200).json({ remainingItems });
    } catch (err) {
        console.error("Error fetching or processing items:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get("/getHandoverItems", async(req,res)=>{
    try{
        const items = await handoverItems.find();
        res.status(200).json({message:'data fetched successfullyyyyy', items})
    }catch(err){
        res.status(500).json({message:'internal server error'})
    }
})
app.get("/getReturnItems", async(req,res)=>{
    try{
        const items = await returnItems.find();
        res.status(200).json({message:'data fetched successfullyyyyy', items})
    }catch(err){
        res.status(500).json({message:'internal server error'})
    }
})
app.put("/updateproduct/:id", async (req, res) => {
    const {
        idlyBatter,
        dosaBatter,
        pesaraBatter,
        bobbaraBatter,
    } = req.body;

    const { id } = req.params;

    try {
        const updatedItem = await handoverItems.findByIdAndUpdate(
            id,
            {
                $set: {
                    idlyBatter,
                    dosaBatter,
                    pesaraBatter,
                    bobbaraBatter,
                },
            },
            { new: true } 
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            message: "Item updated successfully",
            updatedItem,
        });
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.put("/updatereturn/:id",async(req,res)=>{
    const {idlyBatter, dosaBatter, bobbaraBatter, pesaraBatter} = req.body;
    const {id} = req.params;

    try{
        const updateItems = await returnItems.findByIdAndUpdate(id,{
            $set:{
                idlyBatter,
                dosaBatter,
                bobbaraBatter,
                pesaraBatter
            },
        },
        {new:true}
    );
    if(!updateItems){
        res.status(400).json({message:'Items not found'})
    }
    res.status(200).json({message:'Items updated successfully'})
    }catch(err){
        res.status(500).json({message:'internal server error'})
    }
})

module.exports = app;


