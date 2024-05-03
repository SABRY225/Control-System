import React from 'react'

export default function DetaliesWork_schedule() {
    return (
        <div className="container-fluid">
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
                <div className="col-12 m-3 text-end">
                    جدول العمل
                </div>

            </div>
            {/* Table Member Control */}
            <div className="row justify-content-center Table-data">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">المكان</th>
                            <th scope="col">المقرر</th>
                            <th scope="col">الموعد</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>كلية الحاسبات</td>
                            <td>الحوسبة</td>
                            <td>2/24/2024</td>
                        </tr>
                        <tr>
                            <td>كلية الحاسبات</td>
                            <td>الحوسبة</td>
                            <td>2/24/2024</td>
                        </tr>
                        <tr>
                            <td>كلية الحاسبات</td>
                            <td>الحوسبة</td>
                            <td>2/24/2024</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Send Notes */}
            <div className="continer">
                <div className="row justify-content-center m-1 ">
                    <div className="col-10 border border-info p-3 rounded">
                        <form >
                            <textarea placeholder='....ما هي ملاحظاتك' rows="5" cols="65" className='col-12 TextAreaFiled text-end' ></textarea>
                            <button className='btnSendNotes'>Send</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}

