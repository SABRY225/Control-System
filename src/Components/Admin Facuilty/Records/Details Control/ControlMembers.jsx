import React, { useEffect, useState } from "react";

const ControlMembers = ({ dataMember }) => {
  const [Head, setHead] = useState([]);
  const [Member, setMember] = useState([]);
  useEffect(() => {
    // console.log(dataMember.length);
    for (let i = 0; i < dataMember.length; i++) {
      console.log(dataMember[i].jobType);
      if (dataMember[i].jobType === "Head") {
        setHead((prev) => [...prev, dataMember[i].user.name]);
      } else {
        setMember((prev) => [...prev, dataMember[i].user.name]);
      }
    }
  }, [dataMember]);

  console.log(Head);
  console.log(Member);
  return (
    <>
      <div className="ControlMembers">
        <div className="row text-end">
          <div className="col-12 ControlMembers-Title">
            بيانات أعضاء الكنترول
          </div>
        </div>
        <div className="ControlMembers-Groupes">
          <div className="ControlMembers-Groupe-1">
            <div className="ControlMembers-Groupe-title">رئيس الكنترول</div>
            {/* Row Start */}
            <div className="ControlMembers-Groupe-Head">
              <div className="row ">
                <div className="col-12 data_column rtl">د/ {Head[0]}</div>
              </div>
            </div>
            {/* Row End */}
          </div>
          <div className="ControlMembers-Groupe-1">
            <div className="ControlMembers-Groupe-title">أعضاء الكنترول </div>
            {/* Row Start */}
            <div className="row text-center ">
              {Member.map((member, index) => {
                return (
                  <div className="col-md-4 column_ControlMembers" key={index}>
                    <div className=" data_column rtl">د / { member}</div>
                  </div>
                );
              })}
              
            </div>
            {/* Row End */}
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
};

export default ControlMembers;
