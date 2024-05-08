import React from 'react'
 const Notes=(data)=> {
  console.log(data.dataNotes);
  const Notes = data.dataNotes;
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
        {Notes.map(item => (
            <div class="col-md-5 box m-2" key={item.id}>
              <div className='box_Title'>{item.description}</div>
              <div className="row">
                <div className="col dataofTask">
                  <div className="dataOfTask">{item.writeDate}</div>
                </div>
                <div className="col memberOfTask">
                  <div className='nameOfMember'>{item.writeBy.name}</div>
                </div>
              </div>
            </div>
          ))}
        {/* End */}

      </div>
      </div>
    </>

  )
}


export default Notes