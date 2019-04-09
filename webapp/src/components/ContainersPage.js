import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import * as actions from '../actions';

export class Containers extends Component {
  componentDidMount() {
    this.props.fetchContainers();
  }

  renderList() {
    return this.props.list.map((container) => {
      const { Id, Image, Names, Created, Status, Ports } = container;
      const ports = Ports.map(({ IP, PrivatePort, PublicPort, Type }) => {
        if (IP && PrivatePort && PublicPort && Type)
          return `${IP}:${PrivatePort}->${PublicPort}/${Type}`;
        if (PrivatePort && Type) {
          return `${PrivatePort}/${Type}`;
        }
        return '';
      });
      return (
        <tr key={Id}>
          <td data-label='Image'>
            <a onClick={() => this.props.navigate(`/detail/container/${Id}`)}>{Image}</a>
          </td>
          <td data-label='Names'>{Names.join(', ')}</td>
          <td data-label='Created'>{moment(Created * 1000).format('DD/MM/YYYY hh:mm:ss')}</td>
          <td data-label='Status'>{Status}</td>
          <td data-label='Ports'>{ports.join(', ')}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='container'>
        <h1>Container List</h1>
        <table className='ui celled table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Names</th>
              <th>Created</th>
              <th>Status</th>
              <th>Ports</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
        <button className='ui button negative' onClick={() => this.props.pruneContainers()}>
          Clean unused containers
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { list } = state.container;

  return {
    list: _.sortBy(list, ['Created'])
  };
};
export default connect(
  mapStateToProps,
  actions
)(Containers);
