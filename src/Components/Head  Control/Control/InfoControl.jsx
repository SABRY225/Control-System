import React from 'react'
import accepted from "../../../assets/accepted.png"
import notaccepted from "../../../assets/notAccepted.png"
export default function InfoControl() {
  const isAccepted = true
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
            <div>اعضاء الكنترول</div>
        </div>

    </div>
    {/* Table Member Control */}
    <div className="row justify-content-center Table-data">
        {/* Start */}
        <div className="col-3 Column-Table">
            <div className="text-column-table">د/ محمد عبدالرازق</div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table">
            <div className="text-column-table">د/ محمد عبدالرازق</div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table">
            <div className="text-column-table">د/ محمد عبدالرازق</div>
        </div>
        {/* end */}

    </div>

    {/* Title Table*/}
    <div className="row Table-title m-5">
        <div className=" text-end">
            <div>المواد</div>
        </div>

    </div>
    {/* Table Member Control */}
    <div className="row justify-content-center Table-data">
        {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
            <div className="text-2-column-table">اساسيات الحاسوب</div>
            <div className="state-column-table ">
                {
                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                }
            </div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
            <div className="state-column-table ">
                {
                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                }
            </div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
            <div className="state-column-table ">
                {
                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                }
            </div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
            <div className="state-column-table ">
                {
                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                }
            </div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
            <div className="state-column-table ">
                {
                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                }
            </div>
        </div>
        {/* end */}
        {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
            <div className="text-2-column-table">مدخل الي  الشريعه والقانون 1</div>
            <div className="state-column-table ">
                {
                    isAccepted ? <img src={accepted} alt="accepted" className='ImagIconState' /> : <img src={notaccepted} alt="notaccepted" className='ImagIconState' />
                }
            </div>
        </div>
        {/* end */}                {/* Start */}
        <div className="col-3 Column-Table d-flex justify-content-end ">
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
  )
}

