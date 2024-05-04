import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import necessary Bootstrap components (optional, based on your needs)
// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
// import 'bootstrap/js/dist/collapse';
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';

import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './Redux/Story';
// import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes';
import 'react-toastify/dist/ReactToastify.css';
import Admin_Facuilty from "./Pages/Admin Facuilty";
import LayoutAPP from "./Layout/LayoutAPP";
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Admin_University from './Pages/Admin University';
import Head_Control from './Pages/Head_Control'
import { AnalysisControl, DataControl, DetailsOfControl, HomeControlRecodes, InformationControl, SearchOfControl, TableOfControl } from './Components/Admin Facuilty/index';
import Login from './Components/Login/Login';
import LayoutAuth from './Layout/LayoutAuth';
import Member_Facuilty from './Pages/Member_Facuilty';
import { DetaliesWork_schedule, Home, Task_schedule, Work_schedule } from './Components/Member Facuilty/index';
import { ContentOfControl, EditeTask, HomeOfHead, InfoControl, TaskOfControl } from './Components/Head  Control/index';
import AnalysisOfControl from './Components/Head  Control/Control/AnalysisOfControl';
import ControlManagement from './Components/Admin Facuilty/Manage Control/Create Control/CreateControl';
import { elements } from 'chart.js';
import AcademicYearDetails from './Components/Admin University/AcademicYearDetails/AcademicYearDetails';
import Controls from './Components/Admin University/Controls/Controls';
import ControlList from './Components/Admin Facuilty/Manage Control/Edite Control/Control_List';
import Reocrd_Controles from './Pages/Reocrd_Controles';


const routers = createBrowserRouter([
  // {
  //   path: '/',
  //   element: (<JustFirst />)
  //   ,
  //   children: [
  //     { index: true, element: <Home /> },
  //     { path: 'Home', element: <Home /> },
  //     { path: '*', element: <ErrorPage /> },
  //   ],
  // },
  {
    path: '/',
    element: (
      // <ProtectedRoutes>
      <LayoutAPP />
      // </ProtectedRoutes>
    ),
    children: [
      {
        path: 'Admin_Facuilty', element: <Admin_Facuilty />, children: [
          { index: true, element: <InformationControl /> },
          { path: 'CreateControl', element: <ControlManagement /> },
          {
            path: 'control', element: <DataControl />
          },
          { path: 'Records', element: <Reocrd_Controles /> ,children:[
            {index:true,element:<SearchOfControl />},
            {path:"control",element:<HomeControlRecodes/>}
          ]},
          { path: '*', element: <ErrorPage /> },
        ],
      },
      {
        path: 'Admin_University', element: <Admin_University />, children: [
          { index: true, element: <Controls />, },
          { path: 'AcademicYearDetails', element: <AcademicYearDetails />, },
        ],
      },
      { path: 'Head_Control', element: <Head_Control />,children:[
        { index:true, element: <HomeOfHead /> },
        { path:'control', element: <ContentOfControl />, children:[
          {path:'Edite_Task',element:<EditeTask />},
        ]},
      ] },
      {
        path: 'Member_Facuilty', element: <Member_Facuilty />, children: [
          { index: true, element: <Home /> },
          {
            path: 'control', element: <Work_schedule />, children: [
              { index: true, element: <DetaliesWork_schedule /> },
              { path: "tasks", element: <Task_schedule /> },
            ]
          },
        ]
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
  {
    path: '/',
    element:
      <LayoutAuth />,
    children: [
      { path: 'signin', element: <Login /> },
      { path: '*', element: <ErrorPage /> },
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