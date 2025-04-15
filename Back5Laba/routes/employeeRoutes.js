const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Створити (Create)
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Отримати всі (Read)
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

// Отримати одного (Read one)
router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) res.send(employee);
  else res.status(404).json({ error: 'Not found' });
});

// Оновити (Update)
router.put('/:id', async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updated) res.send(updated);
  else res.status(404).json({ error: 'Not found' });
});

// Видалити (Delete)
router.delete('/:id', async (req, res) => {
  const deleted = await Employee.findByIdAndDelete(req.params.id);
  if (deleted) res.send({ message: 'Deleted' });
  else res.status(404).json({ error: 'Not found' });
});


router.get('/download/json', async (req, res) => {
  try {
    const employees = await Employee.find().select('-__v');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(employees, null, 2));
  } catch (err) {
    res.status(500).json({ error: 'Помилка при створенні JSON-виводу' });
  }
});


module.exports = router;
