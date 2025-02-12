const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./db'); 
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/postTodo', (req, res) => {
    const { title, description } = req.body;

    const newTodo = new Todo({ title, description });

    newTodo.save()
        .then((savedTodo) => {
            res.status(201).json(savedTodo); 
        })
        .catch((err) => {
            res.status(500).json({ error: 'Failed to create a new todo' });
        });
});

app.get('/getTodo', (req, res) => {
    Todo.find()  // Find all todos in the collection
        .then((todos) => {
            res.json(todos);  // Return all Todos as JSON
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve todos' });
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://om20082003:om20082003@cluster0.vrpcikm.mongodb.net/', { dbName: "BaseBuilderWorkShop" });
