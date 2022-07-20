import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CreateEmployee from './pages/CreateEmployee';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Counter } from './features/counter/Counter';
import EmployeeDetails from './pages/DisplayEmployee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   {/* <App /> */}

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/dashboard" element={<EmployeeList />} />
        <Route path ="/dashboard/:id" element={<EmployeeDetails/>}/>
        <Route path ="/dashboard/update/:id" element={<CreateEmployee/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
