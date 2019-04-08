import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import * as actions from '../actions';

class Detail extends Component {
  componentDidMount() {
    const { resource, resourceType } = this.props;
    if (!resourceType) {
      this.props.navigate(`/`);
    } else if (!resource) {
      this.props.navigate(`/${resourceType}s`);
    }
  }

  renderActions() {
    return (
      <React.Fragment>
        <button onClick={() => console.log('123')} className='ui button negative'>
          Delete
        </button>
        {/* <Link to='/' className='ui button'>
          Cancel
        </Link> */}
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }

  render() {
    const { resourceType } = this.props;
    return (
      <Modal
        title={`${resourceType} detail`}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => this.props.navigate(`/${resourceType}s`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { type, uuid } = ownProps.match.params;
  // check if type is valid
  console.log(type, uuid, state[type]);
  if (!(state[type] && state[type].list)) {
    return {
      resourceType: null,
      resource: null
    };
  }
  return {
    resourceType: type,
    resource: state[type].list.find((i) => i.Id === uuid)
  };
};

export default connect(
  mapStateToProps,
  actions
)(Detail);
