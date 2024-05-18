import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
function Edite_Control() {
    const fId = useSelector((state) => state.Profile.Fid);
    const CId = useSelector((state) => state.Profile.IdControl);
    const token = useSelector((state) => state.auth.token);
    const [dataMember, setDataMember] = useState([]);
    const [Head, setHead] = useState([]);
    const [Member, setMember] = useState([]);
    //     
    // ===================================================================
    const [values,setValues]=useState({
      name:'',
      faculity_Phase:'',
      faculity_Node:'',
      start_Date:'',
      end_Date:'',
      acaD_YEAR:'',
      faculity_Semester:'',
      selectedMajor:''
    })
    const [dataControl, setDataControl] = useState('');
        const fetchData = async () => {
                try {
                    // Fetch data from the API using axios
                    const response = await axios.get(`http://localhost:5120/Controls/detail/${CId}`,
                        {
                            headers: {
                                Authorization: "Bearer " + token, // Authorization token
                                "Content-Type": "application/json", // Content type
                            },
                        });
                    // Set the fetched data
                    setDataControl(response.data);
                    setValues({
                      ...values,
                      name:response.data.name,
                      faculity_Phase:response.data.faculity_Phase,
                      faculity_Node:response.data.faculity_Node,
                      start_Date:response.data.start_Date,
                      end_Date:response.data.end_Date,
                      acaD_YEAR:response.data.acaD_YEAR,
                      faculity_Semester:response.data.faculity_Semester,
                    })
    
                } catch (error) {
                    console.log(error);
                }
            };
        // console.log("dataControl :" ,dataControl);
        // const jsonString = Object.values(dataControl);
        // console.log("jsonString : ",jsonString[0]);
        // const ahmed=jsonString[0]
    // const [name, setName] = useState(ahmed);
    // const [faculity_Phase, setFaculity_Phase] = useState(dataControl.faculity_Phase)
    // const [faculity_Node, setFaculity_Node] = useState(dataControl.faculity_Node);
    // const [start_Date, setStart_Date] = useState(dataControl.start_Date);
    // const [end_Date, SetEnd_Date] = useState(dataControl.end_Date);
    // const [acaD_YEAR, setAcaD_YEAR] = useState([dataControl.acaD_YEAR]);
    // const [faculity_Semester, setFaculity_Semester] = useState(dataControl.faculity_Semester);

    const [selectedMajor, setSelectedMajor] = useState(dataControl.selectedMajor);
    const [includeMajor, setIncludeMajor] = useState(false);
    useEffect(() => {
      getSubjectControl();
      fetchDataMemeber();
      getSubject();
        fetchData();
        getStaff();
    },[fId,CId,token]);

    // Handle checkbox toggle for including major
    const handleIncludeMajorChange = (e) => {
        setIncludeMajor(e.target.checked);
        // Reset selected major when unchecking the checkbox
        if (!e.target.checked) {
            setSelectedMajor('');
        }
    };
    // =======================================================
    //  controlSubjectsIDs
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedSubjectsIDs, setSelectedSubjectsIDs] = useState([]);  
    const [dataSubject,setDataSubject]=useState([])
    // Function to fetch subject data
    const getSubject = async () => {
            try {
                const { data } = await axios.get(
                  "http://localhost:5120/Subject/faculty/"+fId, // API endpoint URL
                    {
                        headers: {
                            Authorization: "Bearer " + token, // Authorization token
                            "Content-Type": "application/json", // Content type
                        },
                    }
                );
                setDataSubject(data); // Set the retrieved data to the state variable 'data'
            } catch (error) {
                console.error("Error fetching subject data:", error); // Log any errors that occur during fetching
            }
        };
    const getSubjectControl = async () => {
            try {
              const { data } = await axios.get(
                process.env.REACT_APP_SUBJECTOFCONTROL,
                {
                    params: { controld: CId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            // Using functional updates to avoid stale closures
            setSelectedSubjects(prevSubjects => [
                ...prevSubjects,
                ...data.map(subject => subject.name)
            ]);
            setSelectedSubjectsIDs(prevIDs => [
                ...prevIDs,
                ...data.map(subject => subject.id)
            ]);
        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
    };

    const subjects = dataSubject;
    const handleAddSubject = () => {
        if (selectedSubject && !selectedSubjectsIDs.includes(selectedSubject)) {
            const selectedSubjectObject = subjects.find(chairperson => chairperson.id === selectedSubject);

            if (selectedSubjectObject) {
                setSelectedSubjects([...selectedSubjects, selectedSubjectObject.name]);
                setSelectedSubjectsIDs([...selectedSubjectsIDs, selectedSubjectObject.id]);
                setSelectedSubject('');
            }
        } else {
            // Subject is already selected, you can show a message or handle it as per your requirement
            alert('غير قابل لتكرار المقرر');
        }
    }

    const handleRemoveSubject = (subject) => {
        const updatedSubject = selectedSubjects.filter((cp) => cp !== subject);
        let updatedSubjectID;
        for (let index = 0; index < subjects.length; index++) {
            if (subject === subjects[index].name) {
                updatedSubjectID = subjects[index].id;
                break; // Once found, exit the loop
            }
        }
        const updatedSubjectNowIDs = selectedSubjectsIDs.filter(id => id !== updatedSubjectID);
        setSelectedSubjects(updatedSubject);
        setSelectedSubjectsIDs(updatedSubjectNowIDs);

    };
    // =================================================
    // controlManagerID
    const [selectedChairperson, setSelectedChairperson] = useState('');
    const [selectedChairpersons, setSelectedChairpersons] = useState([]);
    const [personsIDs, setPersonsIDs] = useState([]);
    const [dataStaff, setDataStaff] = useState([]);
    const getStaff = async () => {
        try {
            const data= await axios.get(
                "http://localhost:5120/Users/user-for-faculty", // API endpoint URL
                {
                    params: { id :fId }, // Parameters passed to the API endpoint
                    headers: {
                        Authorization: "Bearer " + token, // Authorization token
                        "Content-Type": "application/json", // Content type
                    },
                }
            );
            setDataStaff(data); // Set the retrieved data to the state variable 'dataStaff'
        } catch (error) {
            console.error("Error fetching staff data:", error); // Log any errors that occur during fetching
        }
    };
    const fetchDataMemeber = async () => {
      try {
        const response = await axios.get(
              process.env.REACT_APP_USEROFCONTROL,
          {
            params: { controlId: CId },
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setDataMember(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (dataMember.length === 0) return;
    
      const chairpersons = [];
      const chairpersonIDs = [];
      const committeeMembers = [];
      const committeeMemberIDs = [];
    
      for (let i = 0; i < dataMember.length; i++) {
        if (dataMember[i].jobType === "Head") {
          chairpersons.push(dataMember[i].user.name);
          chairpersonIDs.push(dataMember[i].user.id);
        } else {
          committeeMembers.push(dataMember[i].user.name);
          committeeMemberIDs.push(dataMember[i].user.id);
        }
      }
    
      setSelectedChairpersons((prev) => [...prev, ...chairpersons]);
      setPersonsIDs((prev) => [...prev, ...chairpersonIDs]);
      setSelectedCommitteeMembers((prev) => [...prev, ...committeeMembers]);
      setSelectedCommitteeMembersIDs((prev) => [...prev, ...committeeMemberIDs]);
    
    }, [dataMember]);
    console.log(Head);
    console.log(Member);
    const chairpers = dataStaff.data;
    console.log("chairpers : ",chairpers);
    const handleAddChairperson = () => {
        if (selectedChairperson && !personsIDs.includes(selectedChairperson) && selectedChairpersons.length < 2) {
            const selectedChairpersonObject = chairpers.find(chairperson => chairperson.id === selectedChairperson);

            if (selectedChairpersonObject) {
                setSelectedChairpersons([...selectedChairpersons, selectedChairpersonObject.name]);
                setPersonsIDs([...personsIDs, selectedChairpersonObject.id]);
                setSelectedChairperson('');
            }
        } else {
            // Chairperson is already selected or the input is empty
            alert('اختيار رئيس كنترول واحد فقط');
        }
    };
    const handleRemoveChairperson = (chairperson) => {
        const updatedChairpersons = selectedChairpersons.filter(cp => cp !== chairperson);
        let updatedPersonsID;
        for (let index = 0; index < chairpers.length; index++) {
            if (chairperson === chairpers[index].name) {
                updatedPersonsID = chairpers[index].id;
                break; // Once found, exit the loop
            }
        }
        const updatedPersonsIDs = personsIDs.filter(id => id !== updatedPersonsID);
        setSelectedChairpersons(updatedChairpersons);
        setPersonsIDs(updatedPersonsIDs);
    };
    const [selectedCommitteeMember, setSelectedCommitteeMember] = useState('');
    const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);
    const [selectedCommitteeMembersId, setSelectedCommitteeMembersIDs] = useState([]);
    const handleAddCommitteeMember = () => {
        if (selectedCommitteeMember && !selectedCommitteeMembersId.includes(selectedCommitteeMember)) {
            const selectedCommitteeMembersObject = chairpers.find(chairperson => chairperson.id === selectedCommitteeMember);
            if (selectedCommitteeMembersObject) {
                setSelectedCommitteeMembers([...selectedCommitteeMembers, selectedCommitteeMembersObject.name]);
                setSelectedCommitteeMembersIDs([...selectedCommitteeMembersId, selectedCommitteeMembersObject.id]);
                setSelectedCommitteeMember('');
            }
        }
        else {
            // committee member is already selected, you can show a message or handle it as per your requirement
            alert('This committee member is already added.');
        }
    };
    const handleRemoveCommitteeMember = (committeeMember) => {
        const updatedCommitteeMember = selectedCommitteeMembers.filter((cp) => cp !== committeeMember);
        let updatedcommitteeMemberID;
        for (let index = 0; index < chairpers.length; index++) {
            if (committeeMember === chairpers[index].name) {
                updatedcommitteeMemberID = chairpers[index].id;
                break; // Once found, exit the loop
            }
        }
        const updatedcommteeMemberIDs = selectedCommitteeMembersId.filter(id => id !== updatedcommitteeMemberID);
        setSelectedCommitteeMembers(updatedCommitteeMember);
        setSelectedCommitteeMembersIDs(updatedcommteeMemberIDs);
    };


    // ==========================================
    let controlManagerID =personsIDs[0];
    let SubjectsIds =selectedSubjectsIDs;
    let UsersIds=selectedCommitteeMembersId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const name=values.name;
          const faculity_Phase=values.faculity_Phase;
          const faculity_Node=values.faculity_Node;
          const start_Date=values.start_Date;
          const end_Date=values.end_Date;
          const acaD_YEAR=values.acaD_YEAR;
          const faculity_Semester=values.faculity_Semester;
            const formData ={name,faculity_Phase,faculity_Node,start_Date,end_Date,acaD_YEAR,faculity_Semester,controlManagerID,SubjectsIds,UsersIds};
            const jsonData = JSON.stringify(formData);

            console.log(jsonData);
            console.log(formData);
            // // Make a POST request to the authentication endpoint
            const response = await axios.put(
                'http://localhost:5120/Controls/edit',
                jsonData ,{
                    params: { Cid :CId }, // Parameters passed to the API endpoint
                    headers: {
                        Authorization: "Bearer " + token, // Authorization token
                        "Content-Type": "application/json",
                    },
                }
            );
            // Handle successful login
            console.log("Control edite successful:", response.data);
            alert(response.data)

        } catch (error) {
            console.log("Control edite error:", error);
        }
    };
//-===================================-=======================-==================


    return (
      <form onSubmit={handleSubmit}>
        <div className="row m-5 rtl">
          <div className="mb-5 col-md justify-content-center">
            <div className="form-group">
              <label htmlFor="controlName">اسم الكنترول</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => setValues({...values,name:e.target.value})}
                style={{
                  backgroundColor: "#E1E1E1",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="academicYear">السنة الأكاديمية</label>
              <input
                type="text"
                className="form-control"
                id="acaD_YEAR"
                name="acaD_YEAR"
                value={values.acaD_YEAR}
                onChange={(e) => setValues({...values,acaD_YEAR:e.target.value})}
                style={{
                  backgroundColor: "#E1E1E1",
                }}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="term">الفصل الدراسي</label>
              <select
                className="form-select"
                id="faculity_Semester"
                name="faculity_Semester"
                value={values.faculity_Semester}
                onChange={(e) => setValues({...values,faculity_Semester:e.target.value})}
                style={{
                  backgroundColor: "#E1E1E1",
                  color: "black",
                }}
              >
                <option value="">اختر الفصل الدراسي</option>
                <option value="الفصل الأول">الفصل الدراسي الأول</option>
                <option value="الفصل الثاني">الفصل الدراسي الثاني</option>
                <option value="الفصل الصيفي">الفصل الدراسي الصيفي</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="faculity_Phase">السنة الدراسية</label>
              <select
                className="form-select"
                id="faculity_Phase"
                name="faculity_Phase"
                value={values.faculity_Phase}
                onChange={(e) => setValues({...values,faculity_Phase:e.target.value})}
                style={{
                  backgroundColor: "#E1E1E1",
                  color: "black",
                }}
              >
                <option value="">اختر السنة الدراسية</option>
                <option value="السنة الدراسية الأولى">
                  السنة الدراسية الأولى
                </option>
                <option value="السنة الدراسية الثانية">
                  السنة الدراسية الثانية
                </option>
                <option value="السنة الدراسية الثالثة">
                  السنة الدراسية الثالثة
                </option>
                <option value="السنة الدراسية الرابعة">
                  السنة الدراسية الرابعة
                </option>
                <option value="السنة الدراسية الخامسة">
                  السنة الدراسية الخامسة
                </option>
                <option value="السنة الدراسية الخامسة">
                  السنة الدراسية السادسة
                </option>
              </select>
            </div>

            {/* Checkbox for including major */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="includeMajorCheckbox"
                checked={includeMajor}
                onChange={handleIncludeMajorChange}
                style={{
                  backgroundColor: "#43BBFF",
                  color: "black",
                }}
              />
              <label
                className="form-check-label"
                htmlFor="includeMajorCheckbox"
              >
                تحديد التخصص / الشعبة
              </label>
            </div>
            {/* Render select dropdown for major if includeMajor is true */}
            {includeMajor && (
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="faculity_Node"
                  name="faculity_Node"
                  value={values.faculity_Node}
                  onChange={(e) => setValues({...values,faculity_Node:e.target.value})}
                  style={{
                    backgroundColor: "#E1E1E1",
                  }}
                  //   placeholder="الشعبة /التخصص"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="startDate">تاريخ البدء</label>
              <input
                type="datetime-local"
                className="form-control"
                id="start_Date"
                name="start_Date"
                value={values.start_Date}
                onChange={(e) => setValues({...values,start_Date:e.target.value})}
                style={{
                  backgroundColor: "#E1E1E1",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">تاريخ الانتهاء</label>
              <input
                type="datetime-local"
                className="form-control"
                id="end_Date"
                name="end_Date"
                value={values.end_Date}
                onChange={(e) => setValues({...values,end_Date:e.target.value})}
                style={{
                  backgroundColor: "#E1E1E1",
                }}
              />
            </div>
          </div>
          {/* Selected Subjects Section */}
          <div className="col-md-5 mb-5">
            <div className="d-flex align-items-center justify-content-start mb-3">
              {/* Dropdown */}
              <select
                className="form-select"
                style={{
                  backgroundColor: "#CFEEFF",
                  color: "black",
                }}
                placeholder={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">
                  المواد{" "}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ color: "gray" }}
                  />
                </option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {/* Add button */}
              <button
                type="button"
                className="btn mx-3"
                onClick={handleAddSubject}
                style={{ backgroundColor: "#43BBFF", color: "white" }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {/* Display selected subjects */}
            <div
              className="rectangle-container fs-5 rounded-2"
              style={{ backgroundColor: "#EBF8FF" }}
            >
              <h5 className="mx-3 pt-2">مواد الكنترول</h5>
              <div className="row justify-content-center align-items-center">
                { selectedSubjects.map((subject, index) => (
                  <div
                    key={index}
                    className="subject-row rounded-2 mx-3 my-2"
                    style={{
                      backgroundColor: "#D9D9D9",
                      color: "black",
                      width: "40%",
                    }}
                  >
                    <span style={{fontSize:"0.9rem"}}>{subject}</span>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{
                        color: "#FF0000",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={() => handleRemoveSubject(subject)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chairpersons Section */}
          <div className="col-md-4">
            <h5>بيانات أعضاء الكنترول</h5>
            <div className="d-flex align-items-center justify-content-start mb-3">
              <select
                className="form-select"
                style={{
                  backgroundColor: "#CFEEFF",
                  color: "black",
                }}
                placeholder={selectedChairperson}
                onChange={(e) => setSelectedChairperson(e.target.value)}
              >
                <option value="">اختر رئيس لجنة الكنترول</option>
                {/* Populate options dynamically from chairpersons data */}
                {chairpers &&
                  chairpers.map((chairperson, index) => (
                    <option key={index} value={chairperson.id}>
                      {chairperson.name}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                className="btn mx-3"
                onClick={handleAddChairperson}
                style={{ backgroundColor: "#43BBFF", color: "white" }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div
              className="rectangle-container fs-5 rounded-2"
              style={{ backgroundColor: "#EBF8FF" }}
            >
              <h5 className="mx-3 p-2 my-2"> رئيس لجنة الكنترول</h5>
              <div className="row justify-content-center align-items-center">
                {selectedChairpersons.map((chairperson, index) => (
                  <>
                    <div
                      key={index}
                      className="subject-row col-sm-10 rounded-2 mx-3 my-2"
                      style={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                      }}
                    >
                      <span style={{fontSize:"0.9rem"}}>{chairperson}</span>

                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{
                          color: "#FF0000",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                        onClick={() => handleRemoveChairperson(chairperson)}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>

            {/* Committee Members Section */}
            <div className="my-3">
              <div className="d-flex align-items-center justify-content-start mb-3">
                <select
                  className="form-select "
                  style={{
                    backgroundColor: "#CFEEFF",
                    color: "black",
                  }}
                  placeholder={selectedCommitteeMember}
                  onChange={(e) => setSelectedCommitteeMember(e.target.value)}
                >
                  <option value="">اختر اعضاء لجنة الكنترول</option>
                  {/* Populate options dynamically from chairpersons data */}
                  {chairpers &&
                    chairpers.map((committeeMember, index) => (
                      <option key={index} value={committeeMember.id}>
                        {committeeMember.name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  className="btn mx-3"
                  onClick={handleAddCommitteeMember}
                  style={{ backgroundColor: "#43BBFF", color: "white" }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div
                className="rectangle-container fs-5 rounded-2"
                style={{ backgroundColor: "#EBF8FF" }}
              >
                <h5 className="mx-3 p-2 my-2"> اعضاء لجنة الكنترول</h5>
                <div className="row justify-content-center align-items-center">
                  {selectedCommitteeMembers.map((committeeMember, index) => (
                    <div
                      key={index}
                      className="subject-row col-sm-10 rounded-2 mx-3 my-2"
                      style={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        width: "40%",
                      }}
                    >
                      {" "}
                      <span style={{fontSize:"0.9rem"}}>{committeeMember}</span>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{
                          color: "#FF0000",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                        onClick={() =>
                          handleRemoveCommitteeMember(committeeMember)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" d-flex justify-content-center align-items-center w-100 my-5">
            <button
              className="btn btn-outline-success fw-bold "
              style={{padding: "0.5rem 4rem", background: 'rgb(3, 169, 244)', color: "rgb(255, 255, 255)"}}
            >
              تعديل
            </button>
          </div>
        </div>
      </form>
    );
}

export default Edite_Control