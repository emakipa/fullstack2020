import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  
  if (!isNaN(Number(req.query.height)) &&
      !isNaN(Number(req.query.weight)) &&
      !(Number(req.query.height) <= 0) &&
      !(Number(req.query.weight) <= 0)) {
        
    const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));

    const result = {
      height: Number(req.query.height),
      weight: Number(req.query.weight),
      bmi: bmi
    };
      
    res.json(result);
  } else {
    res.status(400).json({ error: 'malformatted parameters' }).end();
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});