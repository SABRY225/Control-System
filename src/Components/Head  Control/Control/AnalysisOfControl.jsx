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
export default function AnalysisOfControl() {
  const data = {
    labels: ['المواد التي تم انجازها', 'المواد التي لم انجازها'],
    datasets: [{
        lable: 'Poll',
        data: [60, 40],
        backgroundColor: ['rgba(68, 170, 68, 1)', 'rgb(243, 239, 239)'],
        borderColor: ['black', 'red'],
        padding:'2px'
    }]
}
const options = {
  layout: {
    padding: 30
}
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
                    <div>المقرارات</div>
                </div>

            </div>
            {/* Table Material Control */}
            {/* <div className="container"> */}
                <div className="row justify-content-center Table-data">
                    <div className="col-md-4 ">
                        <Doughnut
                            data={data}
                            options={options}>
                        </Doughnut>
                    </div>
                    <div className="col-md-8">
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
                            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                            <div className="state-column-table ">
                                {
                                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                }
                            </div>
                        </div>
                        {/* end */}
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
                            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                            <div className="state-column-table ">
                                {
                                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                }
                            </div>
                        </div>
                        {/* end */}
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
                            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                            <div className="state-column-table ">
                                {
                                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                }
                            </div>
                        </div>
                        {/* end */}
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
                            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                            <div className="state-column-table ">
                                {
                                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                }
                            </div>
                        </div>
                        {/* end */}
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
                            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                            <div className="state-column-table ">
                                {
                                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                }
                            </div>
                        </div>
                        {/* end */}
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
                            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
                            <div className="state-column-table ">
                                {
                                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                                }
                            </div>
                        </div>
                        {/* end */}
                        {/* Start */}
                        <div className="col-12 Column-Table d-flex justify-content-end ">
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
        {/* </div> */}
        {/*  Notes Control */}
            {/* Send Notes */}
            <div className="continer">
                <div className="row justify-content-center m-1 ">
                    <div className="col-10 border p-3 rounded">
                        <form >
                            <textarea placeholder='....ما هي ملاحظاتك' rows="5" cols="65" className='col-12 TextAreaFiled text-end' ></textarea>
                            <button className='btnSendNotes'>Send</button>
                        </form>

                    </div>
                </div>
            </div>
        {/* resever Nots */}
        <div className="NoteOfControl">
      <div className="row text-end ">
        <div className="col-12 note-title">
          ملاحظات رئيس الكنترول
        </div>
      </div>
      <div className='row justify-content-center'>
        {/* Start */}
        <div class="col-md-10 box m-2">
              <div className='box_Title'>حصد دراجات ماده 1 </div>
              <div className="row">
                <div className="col dataofNote">
                  <div >3/24/2003</div>
                </div>
                <div className="col memberOfTask">
                  <div className='nameOfMember'>د/ محمد عبدالرازق</div>
                </div>
              </div>
            </div>
        {/* End */}

      </div>
      </div>
    </>
)
}

 