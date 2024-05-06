import React, { useState } from 'react'
import { Members, Materiales } from '../index';


export default function RgisterMember_Materiales() {
    const [isCreateActive, setIsCreateActive] = useState(true);
    const [isEditActive, setIsEditActive] = useState(false);
    const [Showanalysis, setShowanalysis] = useState(false);
    const [showControl, setShowControl] = useState(true);

    const handelAnalaysisClick = () => {
        setIsEditActive(true);
        setIsCreateActive(false);
        setShowanalysis(true);
        setShowControl(false);

    };
    const handelControlClick = () => {
        setIsCreateActive(true);
        setIsEditActive(false);
        setShowanalysis(false);
        setShowControl(true);
    }
    return (
        <>
            <div className="container p-5">
                <div className="row justify-content-center ">
                    <div className="col-6  text-center">
                        {/* <NavLink to="/Admin_Facuilty/control/analysis_control" className='btn-route m-3 Active-2'>الاحصائيات </NavLink> */}
                        <button
                            className="btn mx-3 col-lg-5"
                            style={{
                                backgroundColor: isEditActive ? '#43BBFF' : '#98DAFF',
                                color: isEditActive ? 'white' : 'black',
                                boxShadow: isEditActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            }}
                            onClick={
                                handelAnalaysisClick
                            }
                        >
                            تسجيل المقرارات
                        </button>
                    </div>
                    <div className="col-6  text-center">
                        {/* <NavLink to="" className='btn-route  m-3 Active-1'>الكنترول </NavLink> */}
                        <button
                            className="btn mx-3 col-lg-5"
                            style={{
                                backgroundColor: isCreateActive ? '#43BBFF' : '#98DAFF',
                                color: isCreateActive ? 'white' : 'black',
                                boxShadow: isCreateActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',

                            }}
                            onClick={handelControlClick}
                        >
                            تسجيل الاعضاء
                        </button>
                    </div>
                </div>
                {/* عرض صفحة جدول العمل إذا كانت الحالة true */}
                {Showanalysis && <Materiales />}

                {/* عرض صفحة الكنترول إذا كانت الحالة true */}
                {showControl && <Members />}
            </div>
        </>
    )
}
