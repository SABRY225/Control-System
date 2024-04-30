import React from 'react'
import "../Style.css"


export default function DetailsOfControl() {
    return (
        <div className='DetailsOfControl'>
            <div className='DetailsOfControl-Title'>بيانات الكنترول</div>
            <div className='DetailsOfControl-input'><input type="text" disabled value="اسم الكنترول" className='DetailsOfControl-nameofcontrol'/></div>
            <div className='DetailsOfControl-input'>
                <input type="text" className='DetailsOfControl-Yeay' disabled value="المستوي او الشعبة"/>
                <input type="text" className='DetailsOfControl-Yeay DetailsOfControl-Yeay-2' disabled value="الفصل الدراسي" />
                <input type="text" className='DetailsOfControl-Yeay DetailsOfControl-Yeay-2'disabled value="العام الأكاديمي" />
            </div>
            
            <div className='DateOfControl' >
                <div className='column'>
                    <div className='TextDate'>اليوم الأخير</div>
                    <input type="text" value="dd/mm/yyyy"  className='DetailsOfControl-Date' disabled />
                </div>
                <div className='column'>
                    <div className='TextDate'>اليوم الأول</div>
                    <input type="text" value="dd/mm/yyyy" className='DetailsOfControl-Date' disabled />
                </div>
                
                <div className='column'>
                    <div className='dateofcontrolText'>مواعيد العمل في الكنترول</div>
                </div>
            </div>
            <hr />
        </div>
    )
}

