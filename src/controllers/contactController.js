// const pool = require('../db');
const { identifyContact } = require('../services/contactService');

const identifyContactController = async (req, res) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: 'Email or phoneNumber is required' });
    }

    try {
        const response = await identifyContact(email, phoneNumber);

        res.json({
            contact: {
                primaryContactId: response.primaryContactId,
                emails: response.emails,
                phoneNumbers: response.phoneNumbers,
                secondaryContactIds: response.secondaryContactIds,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//
// const getData = async (req, res) => {
//     const connection = await pool.getConnection();
//     try {
//         const [Data] = await connection.query('Select * from Contact');
//         return res.status(200).json(Data);
//     }catch(err) {
//         return res.status(400).json({ error: 'Error getting contact' });
//     }
// }

module.exports = { identifyContactController  };