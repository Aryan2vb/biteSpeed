const pool = require('../db');

// Helper to format response
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

// Identify Contact Service
async function identifyContact(email, phoneNumber) {
    const connection = await pool.getConnection();
    try {
        // Step 1: Fetch direct contacts
        const [directContacts] = await connection.query(
            `SELECT * FROM Contact 
       WHERE (email = ? OR phoneNumber = ?) 
       AND deletedAt IS NULL`,
            [email, phoneNumber]
        );
        // console.log(directContacts);
        if (directContacts.length === 0) {
            // Step 2: Insert a new primary contact if no matches are found
            const [result] = await connection.query(
                `INSERT INTO Contact (email, phoneNumber, linkPrecedence, linkedId) 
         VALUES (?, ?, 'primary', NULL)`,
                [email, phoneNumber]
            );

            const [newContact] = await connection.query(`SELECT * FROM Contact WHERE id = ?`, [
                result.insertId,
            ]);

            return formatResponse([newContact[0]]);
        }

        // Step 3: Fetch all related contacts
        const linkedIds = directContacts.map((c) => c.linkedId).filter(Boolean);
        const primaryIds = directContacts.map((c) => c.id);
        const allIds = [...new Set([...linkedIds, ...primaryIds])];
        // console.log(allIds);

        const [allRelatedContacts] = await connection.query(
            `SELECT * FROM Contact 
       WHERE (id IN (?) OR linkedId IN (?)) 
       AND deletedAt IS NULL
       ORDER BY createdAt ASC`,
            [allIds, allIds]
        );

        let primaryContact = allRelatedContacts.find(
            (c) => c.linkPrecedence === 'primary' && c.linkedId === null
        );
        let secondaryContacts = allRelatedContacts.filter(
            (c) => c.id !== primaryContact?.id
        );

        if (!primaryContact) {
            primaryContact = allRelatedContacts[0];
            secondaryContacts = allRelatedContacts.slice(1);
        }

        // Step 4: Add new secondary contact if new info is provided
        const newInfoProvided =
            (email && !allRelatedContacts.some((c) => c.email === email)) ||
            (phoneNumber && !allRelatedContacts.some((c) => c.phoneNumber === phoneNumber));

        if (newInfoProvided) {
            const [result] = await connection.query(
                `INSERT INTO Contact (email, phoneNumber, linkedId, linkPrecedence) 
         VALUES (?, ?, ?, 'secondary')`,
                [email || null, phoneNumber || null, primaryContact.id]
            );

        }



        // Return formatted response
        return formatResponse([primaryContact, ...secondaryContacts]);
    }catch (e) {
        res.status(500).json({error: e});
    }
}

module.exports = { identifyContact };