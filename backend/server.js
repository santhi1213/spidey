const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    // .connect("mongodb://localhost:27017/spidey")
    .connect("mongodb+srv://santhiraju32:h2BVjIw1gaWTExgD@batter-management-db.jlsj4.mongodb.net/?retryWrites=true&w=majority&appName=batter-management-db")
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection Failed..."));

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
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
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const findUser = await User.findOne({ username });

        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatched = await bcrypt.compare(password, findUser.password);
        if (!isMatched) {
            return res.status(400).json({ message: "Password not matched" });
        }

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

        // Send the token back to the client
        res.status(200).json({
            message: "Login successful",
            token, // Include the token in the response
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
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


app.listen(5001, () => {
    console.log("server running on http://localhost:5001");
});
