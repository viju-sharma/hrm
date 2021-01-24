import './App.css';
import React from 'react';
import HomePage from './Containers/HomePage/HomePage';
import Layout from './HOC/Layout/Layout';
import {Switch, Route} from 'react-router-dom';
import HRPage from './Containers/HRPage/HR';
import EmployeePage from './Containers/Employee Page/Employee';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/Employee" component={EmployeePage} /> 
        <Route path="/HR" component={HRPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Layout>
      
  );
}

export default App;
