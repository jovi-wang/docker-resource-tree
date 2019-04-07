import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVolumes, pruneVolumes } from '../actions';

export class Volumes extends Component {
  state = { comment: '' };

  componentDidMount() {
    this.props.fetchVolumes();
  }

  render() {
    return (
      <div className='ui list'>
        <h1>Volume List</h1>
        <div className='item'>Apples</div>
        <div className='item'>Pears</div>
        <div className='item'>Oranges</div>
        <button
          className='ui button'
          onClick={() =>
            this.props.pruneVolumes()
          }
        >
          Clean unused volumes
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchVolumes, pruneVolumes }
)(Volumes);
