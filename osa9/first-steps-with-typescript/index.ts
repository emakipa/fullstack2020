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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } 
  if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, Number(target));
  console.log(result);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});