import React from 'react';
import { CoursePart } from '../types'
import { assertNever } from '../utils'

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>
            <b>{coursePart.name}</b> 
          </p>
          <p>
            Description: {coursePart.description}
          </p>
          <p>
            Exercises: {coursePart.exerciseCount} 
          </p>
        </div>
      ); 
    case 'Using props to pass data':
      return (
        <div>
          <p>
            <b>{coursePart.name}</b> 
          </p>
          <p>
            Exercises: {coursePart.exerciseCount}
          </p>
          <p>
            Group projects: {coursePart.groupProjectCount} 
          </p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
           <p>
            <b>{coursePart.name}</b> 
          </p>
          <p>
            Description: {coursePart.description} 
          </p>
          <p>
            Exercises: {coursePart.exerciseCount}
          </p>
          <p>
            Exercise submission link: <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
          </p>
        </div>
      );
      case 'TypeScript':
        return (
          <div>
            <p>
              <b>{coursePart.name}</b> 
            </p>
            <p>
              Description: {coursePart.description}
            </p>
            <p>
              Exercises: {coursePart.exerciseCount} 
            </p>
            <p>
              Notes: {coursePart.notes} 
            </p>
          </div>
        ); 
    default: 
      return assertNever(coursePart);  
  }
};

export default Part;