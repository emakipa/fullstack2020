interface ResultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: Array<number>, targetHours: number): ResultValues => {

  if (exerciseHours.length !== 0) { 
    
    const trainingDays = exerciseHours.filter((a: number) => a > 0).length
    const totalHours = exerciseHours.reduce((a: number, b: number) => a + b, 0)
    const average = totalHours / exerciseHours.length;

    var rating = null;
    var ratingDescription = null;

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
    }
  } else {
    throw new Error('Results can not be calculated, no exercise hours given!');
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}