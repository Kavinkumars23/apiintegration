import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = ({ isSignedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return isSignedIn && children;
};

export default Private;