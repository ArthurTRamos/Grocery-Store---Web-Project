import React from "react";

import "./UserProfile.css";

function UserProfile({user}) {
  return <div>
    <div className="user-intro">
      <img src="" alt="" />
      Seja Bem Vindo, {user.name}
    </div>
  </div>;
}

export default UserProfile;