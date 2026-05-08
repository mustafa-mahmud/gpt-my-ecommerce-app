import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';

dotenv.config({
  quiet: true,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.send('API Running');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
