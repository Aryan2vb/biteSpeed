const express = require('express');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    return res.status(200).json("Sab Changa Si")
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});