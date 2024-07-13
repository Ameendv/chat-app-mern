import React from "react";

const GenderCheckBox = ({onCheckBoxChange, selectedGender}) => {
  return (
    <div className="flex ">
      <div className="form-control">
        <label htmlFor="" className={"label gap-2 cursor-pointer"}>
          <span className="label-text text-gray-300">Male</span>
          <input
            type="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
            className={`ccheckbox border-white text-white bg-gray-900 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-800 focus:ring-2 ${
              selectedGender === "male" ? "selected" : ""
            }`}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="" className={"label gap-2 cursor-pointer"}>
          <span className="label-text text-gray-300">Female</span>
          <input
            type="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
            className={`checkbox border-white text-white bg-gray-900 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-800 focus:ring-2 ${
              selectedGender === "female" ? "selected" : ""
            }`}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
