const { createUser, checkUserExists, checkExistUser } = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const dbUser = await checkExistUser(email, password);

  if (dbUser) {
    // Convert snake_case to camelCase for frontend
    const user = {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
    };


    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret-key', { expiresIn: '1h' });

    res.json({ message: "Login successful", user, token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

exports.signup =async(req,res)=>{

    const { firstName, lastName, email, password, passport } = req.body;

    try {
      // Check if user already exists
      const userExists = await checkUserExists(email);
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered!' });
      }
  
      
      const userId = await createUser(firstName, lastName, email, password, passport);
      const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET || 'secret-key', { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully!', token });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error!' });
    }


};