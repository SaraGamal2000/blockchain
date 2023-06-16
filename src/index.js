import AppFun from './components/AppFun/AppFun';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login/Login';
import LoginDashboard from './components/LoginDashboard/LoginDashboard';
import SignUp from './components/SignUp/SignUp';
import DashNav from './components/DashNav/DashNav';
import LabList from './components/LabList/LabList';
import { BrowserRouter,RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import ResultList from './components/ResultList/ResultList';
/* import AddCase from './components/AddCase/AddCase'; */
import AddLab from './components/AddLab/AddLab';
import UserProfile from './components/UserProfile/UserProfile';
import Home from './components/Home/Home';
import Protected from './components/Protect';
import LabTestList from './components/LabTestList/LabTestList';
import AddLabTest from './components/AddLabTest/AddLabTest';
import MessageList from './components/MessageList/MessageList';
import AddMessage from './components/AddMessage/AddMessage';
import EditUser from './components/EditUser/EditUser';
import SearchBar from './components/SearchBar/SearchBar';



const router = createBrowserRouter([
  
  {
    path : "/",
    element: <Home />,
    errorElement: <h1>... this page not found</h1>
  },
  {
    path : "/Appfun",
    element: <AppFun />,
    
  },
  {
    path : "/loginDash",
    element :<LoginDashboard />,
  },
  {
    path : "/signup",
    element: <SignUp />,
  },
  {
    path : "/Lablist",
    element: <LabList />,
  },
  {
    path : "/Userlist",
    element: <UserList />,
  },
  {
    path : "/Resultlist",
    element: <ResultList />,
  },
  {
    path : "/Addlabtest",
    element: <AddLabTest />,
  },
  {
    path : "/AddLab",
    element: <AddLab />,
  },
/*   {
    path : "/Userprofile",
    element: <UserProfile />,
  }, */
 /*  {
    path : "/Labtestlist",
    element: <LabTestList />,
  }, */
  {
    path : "/Messagelist",
    element: <MessageList />,
  },
  {
    path : "/Addmessage",
    element: <AddMessage />,
  },
 {
  path : "user/:id/edit",
  element: <EditUser />,
 },
 {
  path : "Searchbar",
  element: <SearchBar />,
 }

]);









const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);


