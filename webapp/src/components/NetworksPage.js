import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class Networks extends Component {
  componentDidMount() {
    this.props.fetchNetworks();
  }

  render() {
    return (
      <div className='ui list'>
        <h1>Network List</h1>
        <div className='item'>Apples</div>
        <div className='item'>Pears</div>
        <div className='item'>Oranges</div>
        <button className='ui button' onClick={() => this.props.pruneNetworks()}>
          Clean unused networks
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Networks);
