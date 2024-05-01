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
import AcademicYearDetails from './Components/Admin University/AcademicYearDetails/AcademicYearDetails';
import CreateControl from './Components/Admin Facuilty/Manage Control/Create Control/CreateControl';



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
      // { index: true, element: <Home /> },
      { path: 'Admin_Facuilty', element: <Admin_Facuilty /> },
      { path: 'Admin_University', element: <Admin_University /> },
      { path: 'AcademicYearDetails', element: <AcademicYearDetails /> },
      { path: 'CreateControl', element: <CreateControl /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
  // {
  //   path: '/',
    
  //   element:
  //   <LayoutAuth />,
  //   children: [
  //     { index: true, element: <Register /> },
  //     { path: 'signup', element: <Register /> },
  //     { path: 'signin', element: <Login /> },
  //     { path: '*', element: <ErrorPage /> },
  //   ],
  // },
]);

function App() {
  return (
    <Provider store={Store}>
    <RouterProvider router={routers} />
    </Provider>
  );
}



export default App;
