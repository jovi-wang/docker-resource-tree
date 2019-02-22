import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Volumes extends Component {
  state = { comment: '' };

  render() {
    console.log(this.state.comment);
    return (
      <div className='ui list'>
        <h1>sdsd</h1>
        <div className='item'>Apples</div>
        <div className='item'>Pears</div>
        <div className='item'>Oranges</div>
        <button className='ui button' onClick={() => {
          this.props.saveComment();
          this.props.fetchStreams();
        }}>
          Clean unused volumes
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Volumes);
