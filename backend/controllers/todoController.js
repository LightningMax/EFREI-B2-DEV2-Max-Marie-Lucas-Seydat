const Todo = require('../models/TodoModel');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createTodo = async (req, res) => {
  try {
    const { titre, description, isDone } = req.body;

    if (!titre || !String(titre).trim()) {
      return res.status(400).json({ message: 'Le titre est requis' });
    }

    const todo = await Todo.create({
      titre: String(titre).trim(),
      description: description ? String(description).trim() : '',
      isDone: Boolean(isDone),
    });

    res.status(201).json(todo);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { titre, description, isDone } = req.body;
    const updates = {};

    if (titre !== undefined) updates.titre = String(titre).trim();
    if (description !== undefined) updates.description = String(description).trim();
    if (isDone !== undefined) updates.isDone = Boolean(isDone);

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) return res.status(404).json({ message: 'Todo introuvable' });
    res.status(200).json(todo);
  } catch {
    res.status(400).json({ message: 'ID invalide' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo introuvable' });
    res.status(200).json({ message: 'Todo supprimé' });
  } catch {
    res.status(400).json({ message: 'ID invalide' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };