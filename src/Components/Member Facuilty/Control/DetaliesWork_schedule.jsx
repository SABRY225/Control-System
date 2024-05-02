import React from 'react'

export default function DetaliesWork_schedule() {
    return (
        <div className="container">
            {/* Title control */}
            <div className="row text-center">
                <div className="col-12">
                    <div className='Title-Control'>
                        كنترول الدفعه الثالثه كليه حاسيات و معلومات لعام 2024 تحت ادارة عميد الكليه د/ محمد عبدالرازق و رائس الكنترول د / محمد عبدالرازق
                    </div>
                </div>
            </div>
            {/* Title Table*/}
            <div className="row Table-title m-5">
                <div className=" text-end">
                    <div> جدول العمل</div>
                </div>

            </div>
            {/* Table Member Control */}
            <div className="row justify-content-center Table-data">
                {/* Start */}
                {/* المكان */}
                <div className="col-3 Column-Table">
                    <div className="text-column-table">كلية الحاسبات والمعلومات</div>
                </div>
                {/* المادة */}
                <div className="col-3 Column-Table">
                    <div className="text-column-table">مادة 1</div>
                </div>
                {/* التاريخ */}
                <div className="col-3 Column-Table">
                    <div className="text-column-table">2024/5/25</div>
                </div>
                {/* end */}
                
            </div>
            {/* Send Notes */}
            <div className="continer">
                <div className="row justify-content-center m-5 ">
                    <div className="col-6 border border-info p-3 rounded">
                        <form >
                            <textarea placeholder='....ما هي ملاحظاتك' rows="5" cols="65" className='TextAreaFiled' ></textarea>
                            <button className='btnSendNotes'>Send</button>
                        </form>

                    </div>
                </div>
            </div>
            </div>

    )
}

