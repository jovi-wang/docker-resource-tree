import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import ImagesPage from './ImagesPage';
import ContainersPage from './ContainersPage';
import VolumesPage from './VolumesPage';
import NetworksPage from './NetworksPage';
import Detail from './Detail';

// https://semantic-ui.com/elements/list.html
const App = ({ history }) => {
  return (
    <div className='ui container'>
      <ConnectedRouter history={history}>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/images/' exact component={ImagesPage} />
            <Route path='/volumes/' exact component={VolumesPage} />
            <Route path='/containers/' exact component={ContainersPage} />
            <Route path='/networks/' exact component={NetworksPage} />
            <Route path='/detail/:type/:uuid' exact component={Detail} />
            <Route component={HomePage} />
            {/* <Route path='/images/new' exact component={StreamCreate} />
            <Route path='/streams/edit/:id' exact component={StreamEdit} />
            <Route path='/streams/delete/:id' exact component={StreamDelete} />
            <Route path='/streams/:id' exact component={StreamShow} /> */}
          </Switch>
        </div>
      </ConnectedRouter>
    </div>
  );
};

export default App;
