/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

// JSON-parser, added for post route 
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const body = req.body;
  const exerciseHours = body.daily_exercises;
  const targetHours = body.target;

  if (!exerciseHours || !targetHours) {
    res.status(400).json({ error: 'parameters missing' }).end();
  } 
  if (!Array.isArray(exerciseHours) || exerciseHours.some(isNaN) || isNaN(Number(targetHours))) {
    res.status(400).json({ error: 'malformatted parameters' }).end();
  }

  const result = calculateExercises(exerciseHours, Number(targetHours));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});