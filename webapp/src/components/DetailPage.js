import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import Modal from './Modal';
import * as actions from '../actions';

class Detail extends Component {
  componentDidMount() {
    const { resourceType, uuid } = this.props;
    if (!resourceType) {
      this.props.navigate(`/`);
    } else {
      switch (resourceType) {
        case 'network':
          this.props.inspectNetwork(uuid);
          break;
        case 'volume':
          this.props.inspectVolume(uuid);
          break;
        case 'container':
          this.props.inspectContainer(uuid);
          break;
        case 'image':
          this.props.inspectImage(uuid);
          break;
        default:
      }
    }
  }

  componentDidUpdate() {
    const { resourceType, error } = this.props;
    if (error && resourceType !== 'image') {
      this.props.navigate(`/${resourceType}s`);
    }
  }

  // specific for delete image
  renderActions() {
    const { resource, resourceType } = this.props;
    if (resourceType === 'image') {
      return (
        <button
          onClick={() => this.props.deleteImage(resource.Id)}
          className="ui button negative"
        >
          Delete
        </button>
      );
    }
    return null;
  }

  renderContent() {
    const { resource, error, resourceType } = this.props;
    if (resourceType === 'image' && error) {
      return 'Fail to delete this image';
    }
    return (
      <ReactJson
        src={resource}
        enableClipboard={false}
        name={false}
        displayDataTypes={false}
        collapsed
      />
    );
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
  const { error } = state.common;
  // check if type and uuid is valid
  let resource;
  let resourceType;
  if (state[type]) {
    resourceType = type;
    resource = state[type].inspected;
  }
  return {
    resourceType,
    resource,
    error,
    uuid
  };
};

export default connect(
  mapStateToProps,
  actions
)(Detail);
