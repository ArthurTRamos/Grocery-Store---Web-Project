import React from "react";

import LabeledEditableContainer from "./LabeledEditableContainer"

import "./UserProfile.css";

function UserProfile({userData, setUserData}) {

  const handleSave = (field, newValue) => {

    console.log(`Saving ${field}: ${newValue}`);

    // Altera apenas o campo modificado, mantendo o resto
    setUserData(prevData => ({
      ...prevData,
      [field]: newValue,
    }));

  };

  return <div>
    <div className="user-intro">
      <img src="" alt="" />
      Seja Bem Vindo, {userData.name}
      <div>
        <LabeledEditableContainer displayName={"Nome Completo"} field={"name"} handleSave={handleSave} initialValue={userData.name} />
      </div>
    </div>
  </div>;
}

export default UserProfile;