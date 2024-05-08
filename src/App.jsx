import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './Redux/Story';
import 'react-toastify/dist/ReactToastify.css';
import Reocrd_Controles from './Pages/Reocrd_Controles';
import { Admin_Facuilty,Admin_University,Head_Control,Member_Facuilty, RegisterPages, } from "./Pages/index";
import LayoutAPP from "./Layout/LayoutAPP";
import ErrorPage from './Components/ErrorPage/ErrorPage';
import {DataControl,HomeControlRecodes, InformationControl, SearchOfControl,RgisterMember_Materiales} from './Components/Admin Facuilty/index';
import Login from './Components/Login/Login';
import LayoutAuth from './Layout/LayoutAuth';
import { DetaliesWork_schedule, Home, Task_schedule, Work_schedule } from './Components/Member Facuilty/index';
import { ContentOfControl, EditeTask, HomeOfHead, InfoControl, TaskOfControl } from './Components/Head  Control/index';
import ControlManagement from './Components/Admin Facuilty/Manage Control/Create Control/MangeControl';
import AcademicYearDetails from './Components/Admin University/AcademicYearDetails/AcademicYearDetails';
import Controls from './Components/Admin University/Controls/Controls';
import ControlList from './Components/Admin Facuilty/Manage Control/Edite Control/Control_List';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import JustFirst from './Layout/JustFirst';
import Edite_Control from './Components/Admin Facuilty/Manage Control/Edite Control/Edite_Control';


const routers = createBrowserRouter([
  {
    path: "/",
    element: <JustFirst />,
    children: [
      { index: true, element: <Login /> },
      { path: "signin", element: <Login /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LayoutAPP />
      </ProtectedRoutes>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "Admin_Facuilty",
        element: <Admin_Facuilty />,
        children: [
          { index: true, element: <InformationControl /> },
          { path: "CreateControl", element: <ControlManagement /> },
          { path: "Edite_Control", element: <Edite_Control /> },
          {
            path: "control",
            element: <DataControl />,
          },
          {
            path: "Records",
            element: <Reocrd_Controles />,
            children: [
              { index: true, element: <SearchOfControl /> },
              { path: "control", element: <HomeControlRecodes /> },
            ],
          },
          {
            path: "Register",
            element: <RegisterPages />,
            children: [{ index: true, element: <RgisterMember_Materiales /> }],
          },
          { path: "*", element: <ErrorPage /> },
        ],
      },
      {
        path: "Admin_University",
        element: <Admin_University />,
        children: [
          { index: true, element: <Controls /> },
          { path: "AcademicYearDetails", element: <AcademicYearDetails /> },
        ],
      },
      {
        path: "Staff",
        element: <Head_Control />,
        children: [
          { index: true, element: <HomeOfHead /> },
          { path: "control", element: <ContentOfControl /> },
          {
            path: "controlMember",
            element: <Work_schedule />,
            children: [
              { index: true, element: <DetaliesWork_schedule /> },
              { path: "tasks", element: <Task_schedule /> },
            ],
          },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      { path: "signin", element: <Login /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={Store}>
      <RouterProvider router={routers} />
    </Provider>
  );
}



export default App;