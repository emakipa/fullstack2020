import React from 'react';
import { CourseName } from '../types';

const Header: React.FC<CourseName> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default Header