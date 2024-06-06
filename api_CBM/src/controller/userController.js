const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../services/userRepository');
const secretKey = 'your_secret_key';

class userController {
    static async authenticateUser(req, res) {
        const { email, password } = req.body;
        const users = await userRepository.getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        });
    }

    static async createUser(req, res) {
        const { email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { email, password: hashedPassword };
            const user = await userRepository.createUser(newUser);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    static async listAllUsers(req, res) {
        try {
            const users = await userRepository.listAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error listing users' });
        }
    }
}

module.exports = userController;
