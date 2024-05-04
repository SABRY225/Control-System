import React from 'react'
import "../Style.css"


export default function DetailsOfControl() {
    return (
        <>
            <div className='DetailsOfControl '>
                {/* Row */}
                <div className=' row text-end'>
                    <div className='col-12 DetailsOfControl-Title'> بيانات الكنترول</div>
                </div>

                {/* Row */}
                <div className="row text-center">
                    <div className='col-md '><input type="text" disabled value="اسم الكنترول" className='DetailsOfControl-nameofcontrol' />
                    </div>
                    <div className="col-md">
                    <input type="text" className='DetailsOfControl-Yeay' disabled value="المستوي او الشعبة" />
                    </div>
                    <div className="col-md">
                    <input type="text" className='DetailsOfControl-Yeay ' disabled value="الفصل الدراسي" />
                    </div>
                    <div className="col-md">
                    <input type="text" className='DetailsOfControl-Yeay ' disabled value="العام الأكاديمي" />
                    </div>
                </div>

                {/* Row */}
                <div className="d-flex row flex-row mb-3 text-center">
                    <div className='col-md' id='first'>
                        <div className='TextDate'>اليوم الأخير</div>
                        <input type="text" value="dd/mm/yyyy" className='DetailsOfControl-Date' disabled />
                    </div>
                    <div className='col-md' id='second'>
                        <div className='TextDate'>اليوم الأول</div>
                        <input type="text" value="dd/mm/yyyy" className='DetailsOfControl-Date' disabled />
                    </div>

                    <div className='col-md  ' id='third'>
                        <div className='dateofcontrolText'>مواعيد العمل في الكنترول</div>
                    </div>
                </div>

            </div>
            <div className="container">
                <div className="row">
                    <hr />
                </div>
            </div>
        </>

    )
}

