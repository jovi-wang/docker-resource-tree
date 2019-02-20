import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        Home
      </Link>
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
      {/* <div className='right menu'>
        <Link to='/' className='item'>
          Volumes
        </Link>
      </div> */}
    </div>
  );
};

export default Header;
