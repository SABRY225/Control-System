import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './Redux/Story';
import { Admin_Facuilty,Admin_University,Head_Control, RegisterPages,Reocrd_Controles } from "./Pages/index";
import {LayoutAPP,LayoutAuth} from "./Layout/index";
import { DetaliesWork_schedule, Task_schedule, Work_schedule,ContentOfControl, HomeOfHead,ControlManagement,ErrorPage,Profile,Setting,InformationControl,DataControl,SearchOfControl,HomeControlRecodes,RgisterMember_Materiales,Controls,ProtectedRoutes,AcademicYearDetails,Edite_Control,Login,ForgotPassword,ResetPassword} from './Components/constant/Path';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LayoutAPP />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "Admin_Faculity",
        element: <Admin_Facuilty />
        ,errorElement:(<ErrorPage />),
        children: [
          { index: true, element: <InformationControl /> ,errorElement:(<ErrorPage />)},
          { path: "CreateControl", element: <ControlManagement />,errorElement:(<ErrorPage />) },
          { path: "Edite_Control", element: <Edite_Control /> ,errorElement:(<ErrorPage />)},
          { path: "control", element: <DataControl />,errorElement:(<ErrorPage />) },
          {
            path: "Records",
            element: <Reocrd_Controles />,
            children: [
              { index: true, element: <SearchOfControl /> ,errorElement:(<ErrorPage />)},
              { path: "control", element: <HomeControlRecodes /> ,errorElement:(<ErrorPage />)},
              { path: "*", element: <ErrorPage /> ,errorElement:(<ErrorPage />)},
            ]
            ,errorElement:(<ErrorPage />)
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
          { index: true, element: <Controls />,errorElement:(<ErrorPage />) },
          { path: "AcademicYearDetails", element: <AcademicYearDetails /> ,errorElement:(<ErrorPage />)},
          { path: "*", element: <ErrorPage /> ,errorElement:(<ErrorPage />)},
        ]
        ,errorElement:(<ErrorPage />)
      },
      {
        path: "Staff",
        element: <Head_Control />,
        children: [
          { index: true, element: <HomeOfHead /> ,errorElement:(<ErrorPage />)},
          { path: "control", element: <ContentOfControl /> ,errorElement:(<ErrorPage />)},
          {
            path: "controlMember",
            element: <Work_schedule />,
            children: [
              { index: true, element: <DetaliesWork_schedule />,errorElement:(<ErrorPage />) },
              { path: "tasks", element: <Task_schedule /> ,errorElement:(<ErrorPage />)},
            ]
            ,errorElement:(<ErrorPage />)
          },
          
        ]
        ,errorElement:(<ErrorPage />)
      },
      { path: "profile", element: <Profile /> ,errorElement:(<ErrorPage />)},
      { path: "setting", element: <Setting /> ,errorElement:(<ErrorPage />)},
    ],
    errorElement:(<ErrorPage />)
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      { path: "signin", element: <Login /> ,errorElement:(<ErrorPage />)},
      { path: "new-password", element: <ResetPassword /> ,errorElement:(<ErrorPage />)},
      { path: "forgotpassword", element: <ForgotPassword /> ,errorElement:(<ErrorPage />)},
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
