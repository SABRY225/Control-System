import React from 'react'

export default function Notes() {
  return (
    <div className='TaskOfControl'>
      <div className='TaskOfControl-Title'>المهام</div>
      <div className='container Task-Groupes' >
        <div className='row'>
          {/* Start */}
          <div class="col-12 box_Notes  m-3">
            <div className='boxNotes_Title'>وجود اوراق ناقصه </div>
            <div className="row">
              <div className="col dataofNotes">
                <div >3/24/2003</div>
              </div>
              <div className="col nameOfMemberNotes">
                <div >د/ محمد عبدالرازق</div>
              </div>
            </div>
          </div>
          {/* End */}
          {/* Start */}
          <div class="col-12 box_Notes  m-3">
            <div className='boxNotes_Title'>وجود اوراق ناقصه </div>
            <div className="row">
              <div className="col dataofNotes">
                <div >3/24/2003</div>
              </div>
              <div className="col nameOfMemberNotes">
                <div >د/ محمد عبدالرازق</div>
              </div>
            </div>
          </div>
          {/* End */}
        </div>
      </div>
      <hr />
    </div>
  )
}

