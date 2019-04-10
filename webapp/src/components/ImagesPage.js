import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';

export class Images extends Component {
  componentDidMount() {
    this.props.fetchImages();
  }

  renderChildren(parentImage) {
    const { list } = this.props;
    const children = list.filter((i) => i.ParentId === parentImage.Id);

    return children.map((element, index) => (
      <div className='ui list' key={index}>
        <div className='item'>
          <i className='docker icon' />
          <div className='content'>
            {/* eslint-disable */}
            <a
              className='header'
              onClick={() => this.props.navigate(`/detail/image/${element.Id}`)}
            >
              {element.RepoTags[0]}
            </a>
            {/* eslint-enable */}
            {this.renderChildren(element)}
          </div>
        </div>
      </div>
    ));
  }

  renderTree() {
    const { list } = this.props;
    const parentImageList = list.filter((i) => !i.ParentId);
    return parentImageList.map((parentImage, index) => {
      return (
        <div className='ui list' key={index}>
          <div className='item'>
            <i className='docker icon' />
            <div className='content'>
              {/* eslint-disable */}
              <a
                className='header'
                onClick={() => this.props.navigate(`/detail/image/${parentImage.Id}`)}
              >
                {/* eslint-enable */}
                {parentImage.RepoTags.join(', ')}
              </a>
              {this.renderChildren(parentImage)}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='ui container'>
        <h1>Image List</h1>
        {this.renderTree()}
        {/* <button className='ui button primary' onClick={() => console.log(1)}>
          Tag images
        </button> */}
        <button className='ui button negative' onClick={() => this.props.pruneImages()}>
          Clean unused/dangling images
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { list } = state.image;
  return {
    list: _.sortBy(list, ['Created'])
  };
};
export default connect(
  mapStateToProps,
  actions
)(Images);
