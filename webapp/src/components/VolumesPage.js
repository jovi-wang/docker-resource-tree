import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchVolumes, pruneVolumes, navigate } from '../actions';

export class Volumes extends Component {
  componentDidMount() {
    this.props.fetchVolumes();
  }

  renderList() {
    return this.props.list.map((volume) => {
      // console.log(volume);
      const { Id, Name } = volume;
      return (
        <a
          href='#'
          className='item'
          key={Id}
          onClick={() => this.props.navigate(`/detail/volume/${Id}`)}>
          {Name}
        </a>
      );
    });
  }

  render() {
    return (
      <div className='ui list'>
        <h1>Volume List</h1>
        {this.renderList()}
        <button className='ui button negative' onClick={() => this.props.pruneVolumes()}>
          Clean unused volumes
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { list } = state.volume;

  return {
    list: _.sortBy(list, ['CreatedAt'])
  };
};
export default connect(
  mapStateToProps,
  { fetchVolumes, pruneVolumes, navigate }
)(Volumes);
