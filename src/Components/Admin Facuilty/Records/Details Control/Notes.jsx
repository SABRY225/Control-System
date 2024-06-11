import React from 'react';

const Notes = ({ dataNotes }) => {
  console.log(dataNotes);
  const notes = dataNotes;

  return (
    <>
      <div className="NoteOfControl text-end">
        <div className="row text-end">
          <div className="col-12 note-title">
            ملاحظات الكنترول
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">الوصف</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col">كاتب الملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {notes.map(item => {
                  let dateObj = new Date(item.writeDate);
                  let year = dateObj.getFullYear();
                  let month = dateObj.getMonth() + 1;
                  let day = dateObj.getDate();
                  return (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{`${year}-${month}-${day}`}</td>
                      <td>د/ {item.writeBy.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
