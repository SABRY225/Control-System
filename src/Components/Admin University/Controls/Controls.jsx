import React from 'react'
import {FacultyFilter } from '../../constant/Path';
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
