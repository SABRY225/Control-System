import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
export default function DataControl() {
  return (
    <>
      <div className="container p-5">
        <div className="row justify-content-center ">
          <div className="col-6  text-center">
            <NavLink to="/Admin_Facuilty/control/analysis_control" className='btn-route m-3 Active-2'>الاحصائيات </NavLink>
          </div>
          <div className="col-6  text-center">
            <NavLink to="" className='btn-route  m-3 Active-1'>الكنترول </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}
