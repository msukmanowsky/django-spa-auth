import React from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../contexts";

function AuthState() {
  const { user, logout } = React.useContext(AppContext);

  if (!user) {
    return (
      <div role="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Logged Out
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          You are currently logged out. You can try{" "}
          <Link to="/auth/login" className="underline">
            logging in
          </Link>
          .
        </div>
      </div>
    );
  }

  return (
    <div role="alert">
      <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
        Logged In
      </div>
      <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
        <p>You are currently logged in as {user.email}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AuthState;
