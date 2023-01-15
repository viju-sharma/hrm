import { useState, useEffect, Fragment } from "react";
import Navigation from "../navigation/Navigation";
import classes from "./Profile.module.css";
import backgroundImage from "../../Images/triangles-1430105.svg";
import { privateRequest } from "../../utils/requestMethod";
import { Button } from "semantic-ui-react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState([]);

  const [imageFile, setImageFile] = useState(null);

  const [imageuploadLoading, setImageUploadLoading] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [isChanged, setChanged] = useState(false);

  const profileImageRef = useRef(null);
  // upload Image to Firebase
  const uploadImageToFirebase = async () => {
    try {
      if (imageFile) {
        const imageRef = ref(storage, `profiles/${imageFile.name + uuidv4()}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } else {
        console.log("file not found in state");
        return new Error("file not found");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      return null;
    }
  };

  useEffect(() => {
    privateRequest
      .get("/api/user/getUserDetails")
      .then((result) => {
        setUserDetails(result.data.user);
      })
      .catch((err) => console.log(err.response.data.message));
  }, [isChanged]);

  const changeProfileImg = async () => {
    setImageUploadLoading(true);
    const url = await uploadImageToFirebase();
    console.log(url);
    if (url) {
      await privateRequest
        .post("/api/user/editUserDetail", {
          profileImg: url,
        })
        .then((res) => {
          setChanged(!isChanged);
          setImageUploadLoading(false);
        })
        .catch((err) => {
          setImageUploadLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    imageFile && changeProfileImg();
    // eslint-disable-next-line
  }, [imageFile]);

  return (
    <Fragment>
      <Navigation title="Profile" icon="user outline" />
      <div
        className={classes.mainContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={classes.mainDiv}>
          <div className={classes.imgDiv}>
            <img
              className="coverImg roundImg"
              src={
                userDetails.profileImg
                  ? userDetails.profileImg
                  : `/images/matthew.png`
              }
              alt="Profile"
            />
            <input
              ref={profileImageRef}
              name="profileImage"
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <Button
              disabled={imageuploadLoading}
              onClick={() => profileImageRef.current.click()}
              className={classes.editButton}
              icon="pencil"
              color="instagram"
              circular
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
