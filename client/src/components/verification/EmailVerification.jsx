import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const VerifyAccount = () => {
  const [loading, setLoading] = useState(false);

  // here we will store the reponse of the server
  const [serverRes, setServerRes] = useState();

  let { id, token } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/auth/${id}/verify/${token}`)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
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
    <div class="ui massive message">
      <div class="header">Changes in Service</div>
      <p>
        We just updated our privacy policy here to better service our customers.
        We recommend reviewing the changes.
      </p>
    </div>
  );
};

export default VerifyAccount;
