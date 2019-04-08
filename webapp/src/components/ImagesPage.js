import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class Images extends Component {
  componentDidMount() {
    this.props.fetchImages();
  }
  render() {
    return (
      <div className='ui container'>
        <div className='ui list'>
          <div className='item'>
            <i className='folder icon' />
            <div className='content'>
              <div className='header'>src</div>
              <div className='description'>Source files for project</div>
              <div className='list'>
                <div className='item'>
                  <i className='folder icon' />
                  <div className='content'>
                    <div className='header'>site</div>
                    <div className='description'>Your sites theme</div>
                  </div>
                </div>
                <div className='item'>
                  <i className='folder icon' />
                  <div className='content'>
                    <div className='header'>
                      <a className='header' onClick={() => console.log(1)}>
                        themes
                    </a>
                    </div>
                    <div className='description'>Packaged theme files</div>
                    <i className='low vision icon' />
                    <div className='list'>
                      <div className='item'>
                        <i className='folder icon' />
                        <div className='content'>
                          <div className='header'>default</div>
                          <div className='description'>Default packaged theme</div>
                          <i className='deaf icon' />
                        </div>
                      </div>
                      <div className='item'>
                        <i className='folder icon' />
                        <div className='content'>
                          <div className='header'>my_theme</div>
                          <div className='description'>
                            Packaged themes are also available in this folder
                          <div className='list'>
                              <div className='item'>
                                <i className='folder icon' />
                                <div className='content'>
                                  <div className='header'>default</div>
                                  <div className='description'>Default packaged theme</div>
                                  <i className='deaf icon' />
                                </div>
                              </div>
                              <div className='item'>
                                <i className='folder icon' />
                                <div className='content'>
                                  <div className='header'>my_theme</div>
                                  <div className='description'>
                                    Packaged themes are also available in this folder
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <i className='file icon' />
                  <div className='content'>
                    <div className='header'>theme.config</div>
                    <div className='description'>Config file for setting packaged themes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <i className='folder icon' />
            <div className='content'>
              <div className='header'>
                <i className='blind icon' />
              </div>

              <div className='description'>Compiled CSS and JS files</div>
              <div className='list'>
                <div className='item'>
                  <i className='folder icon' />
                  <div className='content'>
                    <div className='header'>components</div>
                    <div className='description'>Individual component CSS and JS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <i className='file icon' />
            <div className='content'>
              <div className='header'>
                <i className='blind icon' />
              </div>
              <div className='description'>Contains build settings for gulp</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default connect(
  null,
  actions
)(Images);
