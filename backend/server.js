const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error: ", err));

// Define the Tree Schema
const treeSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: Number,
    description: String,
    image: String, // This will store the base64 string for the image
    createdAt: { type: Date, default: Date.now },
});

const Tree = mongoose.model('Tree', treeSchema);

// POST route to create a new tree (Accept base64 image data)
app.post('/api/trees', async (req, res) => {
    const { name, species, age, description, image } = req.body;

    // Validate the input fields
    if (!name || !species || !age || !description || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newTree = new Tree({
        name,
        species,
        age,
        description,
        image, // Base64 string for the image
    });

    try {
        await newTree.save();
        res.status(201).json({ message: 'Tree created successfully', tree: newTree });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error saving tree' });
    }
});

// GET route to fetch a tree by ID
app.get('/api/trees/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tree = await Tree.findById(id);
        if (!tree) {
            return res.status(404).json({ message: 'Tree not found' });
        }
        res.json(tree);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching tree data' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the React app (for any route not starting with "/api")
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
