import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import Home from './Home';
import Images from './Images';
import Containers from './Containers';
import Volumes from './Volumes';
import Networks from './Networks';
import Modal from './Modal';

// https://semantic-ui.com/elements/list.html
const App = () => {
  return (
    <div className='ui container'>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/images/' exact component={Images} />
            <Route path='/volumes/' exact component={Volumes} />
            <Route path='/containers/' exact component={Containers} />
            <Route path='/networks/' exact component={Modal} />
            {/* <Route path='/images/new' exact component={StreamCreate} />
            <Route path='/streams/edit/:id' exact component={StreamEdit} />
            <Route path='/streams/delete/:id' exact component={StreamDelete} />
            <Route path='/streams/:id' exact component={StreamShow} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
