require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');


const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/investments', async (req, res) => {
try {
const [rows] = await db.query('SELECT * FROM investments ORDER BY created_at DESC');
res.json(rows);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


app.post('/api/investments', async (req, res) => {
const { farmer_name, amount, crop } = req.body;


if (!farmer_name || !amount || !crop) {
return res.status(400).json({ message: 'Invalid input' });
}


try {
const [result] = await db.query(
'INSERT INTO investments (farmer_name, amount, crop) VALUES (?, ?, ?)',
[farmer_name, amount, crop]
);


const [rows] = await db.query('SELECT * FROM investments WHERE id = ?', [result.insertId]);
res.status(201).json(rows[0]);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));