import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Work_schedule() {
  return (
    <>
    <div className="container p-5">
      <div className="row justify-content-center ">
        <div className="col-6  text-center">
          <NavLink to="/Member_Facuilty/control/tasks" className='btn-route m-3 Active-2'>المهام </NavLink>
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

