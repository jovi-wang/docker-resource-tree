import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';

export class Networks extends Component {
  componentDidMount() {
    this.props.fetchNetworks();
  }

  renderList() {
    return this.props.list.map((network) => {
      // console.log(network);
      const { Id, Name } = network;
      return (
        <div className='item' key={Id}>
          <div className='right floated content'>
            <div
              className='ui button mini'
              onClick={() => this.props.navigate(`/detail/network/${Id}`)}>
              Inspect
            </div>
          </div>
          <div className='content'>
            <div className='header'>{Name}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='ui middle aligned divided list'>
        <h1>Network List</h1>
        {this.renderList()}

        <button className='ui button negative' onClick={() => this.props.pruneNetworks()}>
          Clean unused networks
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { list } = state.network;

  return {
    list: _.sortBy(list, ['Created'])
  };
};
export default connect(
  mapStateToProps,
  actions
)(Networks);
