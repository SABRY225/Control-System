import React from 'react'

export default function Notes() {
  return (
    <>
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

