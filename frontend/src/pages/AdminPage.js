import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { api, cookies } from "../conf";

export function AdminPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast(`Goodbye, Stranger !`);
    cookies.set("token", null);
    api.defaults.headers.authorization = null;
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <h2>U iz root !</h2>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
