const pool = require('../db');
const res = require("express/lib/response");

function formatResponse(contacts) {
    const primaryContact = contacts.find(
        (c) => c.linkPrecedence === 'primary' && c.linkedId === null
    ) || contacts[0];

    return {
        primaryContactId: primaryContact.id,
        emails: [...new Set(contacts.map((c) => c.email).filter(Boolean))],
        phoneNumbers: [...new Set(contacts.map((c) => c.phoneNumber).filter(Boolean))],
        secondaryContactIds: contacts
            .filter((c) => c.id !== primaryContact.id)
            .map((c) => c.id),
    };
}

async function identifyContact(email, phoneNumber) {
    const connection = await pool.getConnection();

    try{
        const [directContacts] = await connection.query(
            `SELECT * FROM Contact 
       WHERE (email = ? OR phoneNumber = ?) 
       AND deletedAt IS NULL`,
            [email, phoneNumber]
        );


    }catch (e) {
        res.status(500).json({ error: e });

    }

}

module.exports = { identifyContact };