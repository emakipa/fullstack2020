interface bmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {

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
    // BMI >= 40)
    else {
      return 'Obese Class III (Very severely obese)';
    }
  }
  // BMI can not be calculated, height = 0  
  else {
    throw new Error('Results can not be calculated, height can not be 0!');
  }
};

// Module is run directly from the command line
if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    console.log('Error, something bad happened, message: ', error.message); // eslint-disable-line
  }
}