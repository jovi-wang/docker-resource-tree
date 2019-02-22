import React from 'react';

const Home = () => {
  return (
    <div className='ui'>
      <div className='ui medium header'>display local docker demon resources</div>
      <div className='ui list content'>
        <div className='item'>Containers</div>
        <div className='item'>Images</div>
        <div className='item'>Volumes</div>
        <div className='item'>Networks</div>
      </div>
    </div>
  );
};

export default Home;
