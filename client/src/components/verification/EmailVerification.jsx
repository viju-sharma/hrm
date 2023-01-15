import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { publicRequest } from "../../utils/requestMethod";
const VerifyAccount = () => {
  const [loading, setLoading] = useState(false);

  // here we will store the reponse of the server
  const [serverRes, setServerRes] = useState();

  let { id, token } = useParams();

  useEffect(() => {
    setLoading(true);
    publicRequest
      .get(`/api/verify/${id}/verify/${token}`)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setServerRes({
          type: "success",
          message:
            "Your email is verified successfully, You can close this tab",
          header: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setServerRes({
          type: "failed",
          message: "Are you Lost ? Click below to Login",
          header: err.response.data.message,
        });
        setLoading(false);
      });
    //eslint-disable-next-line
  }, []);

  return loading ? (
    <div className="ui icon massive message">
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>We're verifying your account.</p>
      </div>
    </div>
  ) : (
    serverRes && (
      <div className="ui massive message">
        <div className="header">{serverRes.header}</div>
        <p>{serverRes.message}</p>
        <Link to="/">
          <button className="ui button purple">Move to Login Page</button>
        </Link>
      </div>
    )
  );
};

export default VerifyAccount;
