const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User_Model');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://ziftikhr:007911@lab6.k4giv.mongodb.net/Lab6?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err.message));


// const userSchema = new mongoose.Schema({
//     email: String,
//     pass: String,
// });

// const User = mongoose.model('users', userSchema);

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.get('/users', async (req, res) => {
  try {
      const users = await User.find();  
      res.json(users);  
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
});


app.post('/users', async (req, res) => {
  try {
    console.log("Yes");
      const { email, pass } = req.body;
      const newUser = new User({ email, pass });
      await newUser.save();
      res.status(201).json({ message: 'User added successfully', newUser });
  } catch (error) {
      res.status(500).json({ message: 'Error adding user', error });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
