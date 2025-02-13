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
    Todo.find()  
        .then((todos) => {
            res.json(todos);  
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve todos' });
        });
});

app.delete('/deleteTodo/:id', (req, res) => {
    const { id } = req.params; 

    Todo.findByIdAndDelete(id) 
        .then((deletedTodo) => {
            if (!deletedTodo) {
                return res.status(404).json({ error: 'Todo not found' }); 
            }
            res.status(200).json({ message: 'Todo deleted successfully', deletedTodo });  
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete todo' });
        });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://om20082003:om20082003@cluster0.vrpcikm.mongodb.net/', { dbName: "BaseBuilderWorkShop" });
