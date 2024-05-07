import React from "react";

export default function Materiales() {
  return (
    <>
      <div className="containerRegister">
        <form action="#" style={{ display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div className="control-row-register col col-lg-6">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="code">Code</label>
              <input id="code" type="text" name="code" />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="credit_Hours">Credit Hours</label>
              <input id="credit_Hours" type="number" name="credit_Hours" />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="faculty_node">Faculty Node</label>
              <select class="form-select" id="faculty_node">
                <option value="مادة 1">Computer Science</option>
                <option value="مادة 2">Information Technology</option>
                <option value="مادة 3">Information Security</option>
                <option value="مادة 4">Artificial Intelligence</option>
              </select>
            </div>
          </div>
          <button type="submit" class="mt-3">
            اضافة مادة جديد
          </button>
        </form>
      </div>
    </>
  );
}
