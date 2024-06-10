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
        element: <Admin_Facuilty />,
        children: [
          { index: true, element: <InformationControl /> },
          { path: "CreateControl", element: <ControlManagement /> },
          { path: "Edite_Control", element: <Edite_Control /> },
          { path: "control", element: <DataControl /> },
          {
            path: "Records",
            element: <Reocrd_Controles />,
            children: [
              { index: true, element: <SearchOfControl /> },
              { path: "control", element: <HomeControlRecodes /> },
              { path: "*", element: <ErrorPage /> },
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
          { path: "*", element: <ErrorPage /> },
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
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      { path: "signin", element: <Login /> },
      { path: "new-password", element: <ResetPassword /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
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
