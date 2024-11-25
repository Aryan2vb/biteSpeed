const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'lets check your biteSpeed',

        info:"use this https://bite-speed-lemon.vercel.app/identify on post method and add email and phoneNumber in body json "

    })
})

app.get('/bolo', (req, res) => {
    return res.status(200).json("Jai Shree Ram")
})

app.use('/', contactRoutes);


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});