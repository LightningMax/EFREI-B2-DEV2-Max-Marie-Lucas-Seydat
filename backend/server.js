const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3000;
const router = express.Router();

app.use(cors());
app.use(express.json());
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('./controllers/todoController');


router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

app.use('/todos', router);



mongoose.connect("mongodb://localhost:27017/todo-list")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB",err);
});

app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});