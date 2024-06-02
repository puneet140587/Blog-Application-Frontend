import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Base from "../../Components/Base";
import userContext from "../../context/userContext";
import { getUser } from "../../Service/User-Service";

const ProfileInfo = () => {
  const object = useContext(userContext);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    getUser(userId).then((data) => {
      console.log(data);
      setUser({ ...data });
    });
  }, []);

  /*  view user profile */
  /* const userView = () => {
    return (
      <ViewUserProfile updateProfileClick={showUpdateProfile} user={user} />
    );
  }; */

  return (
    <Base>
      <div>
        <h1>Welcome {object.user.data.name}</h1>;
      </div>
    </Base>
  );
};

export default ProfileInfo;
