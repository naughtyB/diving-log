import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppHeader from './app-header/index';
import AppContent from './app-content/index';
import AppUser from './app-user/index';
import './index.css';
const { Header, Content } = Layout;

class AppLayout extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route 
            key="login"
            exact
            path="/:direction(login|register|resetPassword)"
            render={({history,location}) => {
              return (
                <AppUser history={history} location={location}/>
              )
            }}
          />
          <Route 
            key="/"
            path="/"
            render={({history, location}) => {
              return (
                <Layout className="app-layout">
                  <Header className="app-layout-header">
                    <AppHeader/>
                  </Header>
                  <Content style={{width: '100%'}}>
                    <AppContent/>
                  </Content>
                </Layout>
              )
            }}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppLayout;