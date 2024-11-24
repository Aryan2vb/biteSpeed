const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(express.json());


app.get('/bolo', (req, res) => {
    return res.status(200).json("Jai Shree Ram")
})

app.use('/api/v1', contactRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});