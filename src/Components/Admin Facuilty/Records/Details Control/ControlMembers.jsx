import React, { useEffect, useState } from "react";

const ControlMembers = ({ dataMember }) => {
  const [head, setHead] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const headMember = dataMember.find(member => member.jobType === "Head");
    const otherMembers = dataMember.filter(member => member.jobType !== "Head");

    if (headMember) {
      setHead(headMember.user.name);
    }

    setMembers(otherMembers.map(member => member.user.name));
  }, [dataMember]);

  return (
    <>
            <div className="ControlMembers text-end">
        <div className="row text-end">
          <div className="col-12 ControlMembers-Title">
            بيانات أعضاء الكنترول
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">دور العضو</th>
              <th scope="col">اسم العضو</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>رئيس الكنترول</td>
              <td>{head ? `د/ ${head}` : "لا يوجد رئيس كنترول"}</td>
            </tr>
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr key={index}>
                  <td>عضو كنترول</td>
                  <td>د/ {member}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">لا يوجد أعضاء كنترول</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="row">
          <hr />
        </div>
      </div>
    </>
  );
};

export default ControlMembers;
