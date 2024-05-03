import React from 'react'
import {FacultyFilter , DetailsOfControl} from '../index';
import { Outlet } from 'react-router-dom';
export default function Controls() {
  return (
    <>
       <FacultyFilter />
       <Outlet />
       {/* <DetailsOfControl /> */}
    </>
  )
}
