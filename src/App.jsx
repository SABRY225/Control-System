import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './Redux/Story';
// import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes';
import 'react-toastify/dist/ReactToastify.css';
import Admin_Facuilty from "./Pages/Admin Facuilty";
import LayoutAPP from "./Layout/LayoutAPP";
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Admin_University from './Pages/Admin University';
import { AnalysisControl, DataControl, InformationControl, SearchOfControl, TableOfControl } from './Components/Admin Facuilty/index';
import AcademicYearDetails from './Components/Admin University/AcademicYearDetails/AcademicYearDetails';
import CreateControl from './Components/Admin Facuilty/Manage Control/Create Control/CreateControl';
import ControlList from './Components/Admin Facuilty/Manage Control/Edite Control/Control_List';



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
      { path: 'Admin_Facuilty', element: <Admin_Facuilty />   , children: [
        { index: true, element: <InformationControl /> },
        // { path: 'ManageControl', element: <ErrorPage /> },
        { path: 'control', element: <DataControl /> ,children:[
          {index:true,element:<TableOfControl/>},
          {path:"analysis_control",element:<AnalysisControl/>}
        ]},
        { path: 'Records', element: <SearchOfControl /> },
        { path: '*', element: <ErrorPage /> },
      ], },
      { path: 'Admin_University', element: <Admin_University /> },
      { path: 'AcademicYearDetails', element: <AcademicYearDetails /> },
      { path: 'CreateControl', element: <CreateControl /> },
      { path: 'Control_List', element: <ControlList /> },
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
