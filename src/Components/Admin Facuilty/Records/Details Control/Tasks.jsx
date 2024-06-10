import React from 'react';

const Tasks = ({ dataTasks }) => {
  console.log(dataTasks);
  const tasks = dataTasks;

  return (
    <>
      <div className='TaskOfControl rtl'>
        <div className="row text-end">
          <div className='col-12 TaskOfControl-Title'>المهام</div>
        </div>
        <div className='row justify-content-center'>
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">اسم المهمة</th>
                  <th scope="col">الأعضاء</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(item => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>{item.description}</td>
                      <td>
                        <table className="table">
                          <tbody>
                            {item.users.map(user => (
                              <tr key={user.id}>
                                <td>{user.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
    </>
  );
}

export default Tasks;
