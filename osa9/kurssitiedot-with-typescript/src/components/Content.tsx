import React from 'react';
import Part from './Part';
import { CourseParts } from '../types';

const Content: React.FC<{ courseParts: CourseParts[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(part =>
        <Part key={part.name} coursePart={part} />
      )}  
    </div>
  )
};

export default Content