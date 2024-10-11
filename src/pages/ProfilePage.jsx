import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (ready && !user) {
    return <Navigate to="/login" />;
  }
  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser();
  }

  if (redirect) {
    return <Navigate to="/" />; // Redirect to homepage after logout
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && user && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-3">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
