import React from 'react';
import { CourseParts } from '../types'

const Part: React.FC<{ coursePart: CourseParts }> = ({ coursePart }) => {
  return (
    <p>
      {coursePart.name} {coursePart.exerciseCount} 
    </p>);
};

export default Part