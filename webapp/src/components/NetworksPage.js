import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNetworks } from '../actions';
export class Networks extends Component {

  componentDidMount() {
    this.props.fetchNetworks();
  }
  render() {
    return (
      <div className='ui list'>
        <div className='item'>Apples</div>
        <div className='item'>Pears</div>
        <div className='item'>Oranges</div>
      </div>
    );
  }

}

export default connect(
  null,
  { fetchNetworks }
)(Networks);
