import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

import { AppContext } from "../contexts";

function PrivateRoute(props: RouteProps) {
  const { children, ...rest } = props;
  const { user } = React.useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/auth/login", state: { next: { location } } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
