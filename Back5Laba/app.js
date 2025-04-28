const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema'); // нова схема

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// GraphQL Route
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true  // щоб відкривати інтерфейс браузером
}));


// API Routes
app.use('/api/employees', employeeRoutes);

// Static files
app.use(express.static('public'));

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/employees', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'employees.html'));
});

app.get('/json', (req, res) => {
  res.redirect('/api/employees/download/json');
});

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error('❌ MongoDB error:', err));
