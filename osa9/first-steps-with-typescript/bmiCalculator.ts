const calculateBmi = (height: number, weight: number): string => {

  // BMI can be calculated
  if (height !== 0) {
    const bmi = (weight / Math.pow((height/100), 2));
  
    if (bmi < 15) {
      return 'Very severely underweight';
    }
    else if (bmi >= 15 && bmi < 16) {
      return 'Severely underweight';
    }
    else if (bmi >= 16 && bmi < 18.5) {
      return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    }
    else if (bmi >= 30 && bmi < 35) {
      return 'Obese Class I (Moderately obese)';
    }
    else if (bmi >= 35 && bmi < 40) {
      return 'Obese Class II (Severely obese)';
    }
    else if (bmi >= 40) {
      return 'Obese Class III (Very severely obese)';
    }
  }
  // BMI can not be calculated, height = 0  
  else {
    throw new Error('Results can not be calculated, height can not be 0!');
  }
}

try {
  console.log(calculateBmi(180, 74));
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}