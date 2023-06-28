import express from 'express';
import router from './routes';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${PORT}`);
});
