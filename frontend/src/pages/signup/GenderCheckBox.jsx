import React from "react";

const GenderCheckBox = ({onCheckBoxChange, selectedGender}) => {
  return (
    <div className="flex ">
      <div className="form-control">
        <label htmlFor="" className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
            className={`checkbox border-slate-900 ${
              selectedGender === "male" ? "selected" : ""
            }`}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="" className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
            className={`checkbox border-slate-900 ${
              selectedGender === "female" ? "selected" : ""
            }`}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
