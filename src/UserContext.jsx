import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// PropTypes validation for the children prop
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
