import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='ui'>
      <div className='ui medium header'>display local docker demon resources</div>
      <div className='ui list content'>
        <Link to='/containers' className='item'>
          Containers
        </Link>
        <Link to='/images' className='item'>
          Images
        </Link>
        <Link to='/volumes' className='item'>
          Volumes
        </Link>
        <Link to='/networks' className='item'>
          Networks
        </Link>
      </div>
    </div>
  );
};

export default Home;
