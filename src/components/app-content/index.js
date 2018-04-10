import React from 'react';
import AppContentLogWorld from './app-content-logWorld/index';
import AppContentReleaseLog from './app-content-releaseLog/index';
import AppContentLogDetail from './app-content-logDetail/index';
import { Route, Switch, Redirect } from "react-router-dom";

export class AppContent extends React.Component{
  render(){
    return (
      <Switch>
        <Route 
          exact path="/logWorld"
          key="logWorld"
          render={({history,location}) => {
            return <AppContentLogWorld
              history={history}
              location={location}
            />
          }}
        />
        <Route 
          exact path="/releaseLog"
          key="releaseLog"
          render={({history,location}) => {
            return <AppContentReleaseLog
              history={history}
              location={location}
            />
          }}
        />
        <Route 
          exact path="/logDetail"
          key="logDetail"
          render={({history,location}) => {
            return <AppContentLogDetail
              history={history}
              location={location}
            />
          }}
        />
        <Redirect 
          to="/logWorld"
        />
      </Switch>
    )
  }
}

export default AppContent;