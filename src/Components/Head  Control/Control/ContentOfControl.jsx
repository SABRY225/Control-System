import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function ContentOfControl() {
    return (
        <>
            <div className="container p-5">
                <div className="row justify-content-center ">
                    <div className="col-3  text-center">
                        <NavLink to="/Head_Control/control/tasks" className='btn-route m-3 Active-2'>المهام </NavLink>
                    </div>
                    <div className="col-3  text-center">
                        <NavLink to="/Head_Control/control/analysis_control" className='btn-route m-3 Active-2'>الاحصائيات </NavLink>
                    </div>
                    <div className="col-3  text-center">
                        <NavLink to="" className='btn-route  m-3 Active-1'>الكنترول </NavLink>
                    </div>

                </div>
                <Outlet />
            </div>
        </>
    )
}

