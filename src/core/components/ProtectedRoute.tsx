/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { FileRoutes } from "../utilities/constants/core.constants";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Children }: { Children: React.FC }) {
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("user") as string);

  useEffect(() => {
    if (authData) {
      navigate(FileRoutes.HOME);
    }
  }, [authData, navigate]);
  return <Children />;
}

export default ProtectedRoute;
