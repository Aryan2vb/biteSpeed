const pool = require('../db');
const identifyContactController = async (req, res) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: 'Email or phoneNumber is required' });
    }


};

const getData = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [Data] = await connection.query('Select * from Contact');
        return res.status(200).json(Data);
    }catch(err) {
        return res.status(400).json({ error: 'Error getting contact' });
    }
}

module.exports = { identifyContactController ,getData };