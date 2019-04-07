import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Containers extends Component {
  componentDidMount() {
    this.props.fetchContainers();
  }
  render() {
    return (
      <div>
        <table className='ui celled striped table'>
          <thead>
            <tr>
              <th colSpan='3'>Git Repository</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='collapsing'>
                <i className='folder icon' />
                node_modules
          </td>
              <td>Initial commit</td>
              <td className='right aligned collapsing'>10 hours ago</td>
            </tr>
            <tr>
              <td>
                <i className='folder icon' />
                test
          </td>
              <td>Initial commit</td>
              <td className='right aligned'>10 hours ago</td>
            </tr>
            <tr>
              <td>
                <i className='folder icon' />
                build
          </td>
              <td>Initial commit</td>
              <td className='right aligned'>10 hours ago</td>
            </tr>
            <tr>
              <td>
                <i className='file outline icon' />
                package.json
          </td>
              <td>Initial commit</td>
              <td className='right aligned'>10 hours ago</td>
            </tr>
            <tr>
              <td>
                <i className='file outline icon' />
                Gruntfile.js
          </td>
              <td>Initial commit</td>
              <td className='right aligned'>10 hours ago</td>
            </tr>
          </tbody>
        </table>
        <button
          className='ui button'
          onClick={() =>
            this.props.pruneContainers()
          }
        >
          Clean unused containers
    </button>
      </div>
    );
  }
};

export default connect(
  null,
  actions
)(Containers);
