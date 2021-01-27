interface exerciseValues {
  exerciseHours: Array<number>;
  targetHours: number;
}

interface ResultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments, give target hours and exercise hours, e.g. npm run calculateExercises 2 1 0 ...');

  // Exercise hours list starts at args[3]
  const hours = args.slice(3);
  // Convert hours to array of numbers needed for calculateExercises function
  const hoursArray = hours.map(element => Number(element));
  
  if (!hoursArray.some(isNaN) && !isNaN(Number(args[2]))) {
    return {
      exerciseHours: hoursArray,
      targetHours: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (exerciseHours: Array<number>, targetHours: number): ResultValues => {

  if (exerciseHours.length !== 0) { 
    
    const trainingDays = exerciseHours.filter((a: number) => a > 0).length;
    const totalHours = exerciseHours.reduce((a: number, b: number) => a + b, 0);
    const average = totalHours / exerciseHours.length;

    let rating = null;
    let ratingDescription = null;

    if (average < targetHours * 0.9) {
      rating = 1;
      ratingDescription = 'Hours below target';
    }
    else if (average > targetHours * 1.1) {
      rating = 3;
      ratingDescription = 'Hours above target';
    }
    else {
      rating = 2;
      ratingDescription = 'Hours on target';
    }

    return {
      periodLength: exerciseHours.length,
      trainingDays: trainingDays,
      success: average >= targetHours ? true : false,
      rating: rating,
      ratingDescription: ratingDescription,
      target: targetHours,
      average: average
    };
  } else {
    throw new Error('Results can not be calculated, no exercise hours given!');
  }
};

// Module is run directly from the command line
if (require.main === module) {
  try {
    const { exerciseHours, targetHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, targetHours));
  } catch (error) {
    console.log('Error, something bad happened, message: ', error.message); // eslint-disable-line
  }
}  