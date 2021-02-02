import React from 'react';
import { CoursePart } from '../types'

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p>
        <b>Total number of exercises:{' '}</b>
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;