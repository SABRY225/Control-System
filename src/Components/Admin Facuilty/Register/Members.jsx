import "./FromRegisterStyle.css";
import React, { useState } from "react";

export default function Members() {
  return (
    <>
      <div className="containerRegister">
        <form action="#" style={{display: "flex",flexDirection: "column"}}>
          <div className="row">
            <div className="control-row-register col">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" />
            </div>
            <div className="control-row-register col">
              <label htmlFor="username">name-user</label>
              <input id="username" type="text" name="userName" />
            </div>
            <div className="control-row-register col">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" />
            </div>
            <div className="control-row-register col">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" />
            </div>
            <div className="control-row-register col">
              <label htmlFor="cp">Confirm Password</label>
              <input id="cp" type="password" name="password" />
            </div>
            <div className="control-row-register col">
              <label htmlFor="scientificDegree">Scientific Degree</label>
              <input
                id="scientificDegree"
                type="text"
                name="scientificDegree"
              />
            </div>
          </div>
          <button type="submit" class="mt-3">
            اضافة عضو جديد
          </button>
        </form>
      </div>
    </>
  );
}
