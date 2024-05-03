import React from 'react'
import accepted from "../../../assets/accepted.png"
import notaccepted from "../../../assets/notAccepted.png"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
export default function AnalysisControl() {
    const data = {
        labels: ['المواد التي تم انجازها', 'المواد التي لو يتم انجازها'],
        datasets: [{
            lable: 'Poll',
            data: [60, 40],
            backgroundColor: ['rgba(68, 170, 68, 1)', 'red'],
            borderColor: ['black', 'red'],
        }]
    }
    const options = {

    }
    const isAccepted = true
    return (
        <>
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
                        <div>المقرارت</div>
                    </div>

                </div>
                {/* Table Material Control */}
                <div className="container">
                    <div className="row justify-content-center Table-data">
                        <div className="col-md-4 text-center ">
                            <Doughnut
                                data={data}
                                options={options}>
                                
                            </Doughnut>
                        </div>
                        <div className="col-md-8">
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                            {/* Start */}
                            <div className="col-sm-12 Column-Table d-flex justify-content-end ">
                                <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                                <div className="state-column-table ">
                                    {
                                        isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                    }
                                </div>
                            </div>
                            {/* end */}
                        </div>
                    </div>
                </div>
            </div>
            {/*  Notes Control */}
            {/* Send Nots */}
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
            {/* resever Nots */}
            <div className="continer">
                <div className="row justify-content-end m-3 ">
                    <div className="col-md-12 text-center ">
                        <div className='Table-title'>ملاحظات رئيس الكنترول</div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {/* Start */}
                    <div class="col-12 box_Notes  m-3">
                        <div className='boxNotes_Title'>وجود اوراق ناقصه </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6 nameOfMemberNotes">
                                <div >3/24/2003</div>
                            </div>
                            <div className="col-md-6  nameOfMemberNotes">
                                <div >د/ محمد عبدالرازق</div>
                            </div>
                        </div>
                    </div>
                    {/* End */}
                    {/* Start */}
                    <div class="col-12 box_Notes  m-3">
                        <div className='boxNotes_Title'>وجود اوراق ناقصه </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6 nameOfMemberNotes">
                                <div >3/24/2003</div>
                            </div>
                            <div className="col-md-6  nameOfMemberNotes">
                                <div >د/ محمد عبدالرازق</div>
                            </div>
                        </div>
                    </div>
                    {/* End */}
                </div>
            </div>
        </>
    )
}

