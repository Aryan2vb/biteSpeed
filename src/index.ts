import express, { Request, Response } from 'express';
const app = express();


app.get('/bolo', (req: Request, res: Response) => {
    res.status(200).send("Jai Shree Ram");
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Listening to port 3000")
});


