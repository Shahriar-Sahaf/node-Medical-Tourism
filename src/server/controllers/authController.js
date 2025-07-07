const { createUser, checkUserExists, checkExistUser } = require('../models/user');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const dbUser = await checkExistUser(email, password);

  if (dbUser) {
    // Convert snake_case to camelCase
    const user = {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
    };

    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};




exports.signup =async(req,res)=>{

    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if user already exists
      const userExists = await checkUserExists(email);
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered!' });
      }
  
      // Create a new user
      await createUser(firstName, lastName, email, password);
      res.status(201).json({ message: 'User registered successfully!' });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error!' });
    }


};