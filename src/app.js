const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'lets check your biteSpeed',

        info:"use this https://bite-speed-lemon.vercel.app/api/v1/identify on post method "

    })
})

app.get('/bolo', (req, res) => {
    return res.status(200).json("Jai Shree Ram")
})

app.use('/api/v1', contactRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});