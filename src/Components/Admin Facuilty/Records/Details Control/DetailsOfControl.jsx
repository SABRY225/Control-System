import React from 'react'
import "../Style.css"

const DetailsOfControl= (data) => {
    let dateObj = new Date(data.dataControl.start_Date);
            // Extract year, month, and day from the date object
            let year = dateObj.getFullYear();
            let month = dateObj.getMonth() + 1; // Months are zero-indexed, so add 1
            let day = dateObj.getDate();
        let dateObj2 = new Date(data.dataControl.start_Date);
            // Extract year, month, and day from the date object
            let year_2 = dateObj2.getFullYear();
            let month_2 = dateObj2.getMonth() + 1; // Months are zero-indexed, so add 1
            let day_2 = dateObj2.getDate();
    return (
        <>
            <div className='DetailsOfControl '>
                {/* Row */}
                <div className=' row text-end'>
                    <div className='col-12 DetailsOfControl-Title'> بيانات الكنترول</div>
                </div>

                {/* Row */}
                <div className="row text-center">
                    <div className='col-md ' style={{color:"000"}}>
                        {/* {data.dataControl.name} */}
                        <input type="text" disabled value={data.dataControl.name} className='DetailsOfControl-nameofcontrol' />
                    </div>
                    <div className="col-md">
                    <input type="text" className='DetailsOfControl-Yeay' disabled value={data.dataControl.faculity_Phase} />
                    </div>
                    <div className="col-md">
                    <input type="text" className='DetailsOfControl-Yeay ' disabled value={data.dataControl.faculity_Semester} />
                    </div>
                    <div className="col-md">
                    <input type="text" className='DetailsOfControl-Yeay ' disabled value={data.dataControl.acaD_YEAR} />
                    </div>
                </div>

                {/* Row */}
                <div className="d-flex row flex-row mb-3 text-center">
                    <div className='col-md' id='first'>
                        <div className='TextDate'>اليوم الأخير</div>
                        <input type="text" value={`${day_2}/${month_2}/${year_2}`} className='DetailsOfControl-Date' disabled />
                    </div>
                    <div className='col-md' id='second'>
                        <div className='TextDate'>اليوم الأول</div>
                        <input type="text" value={`${day}/${month}/${year}`} className='DetailsOfControl-Date' disabled />
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

export default DetailsOfControl
