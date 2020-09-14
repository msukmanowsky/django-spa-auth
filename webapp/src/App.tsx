import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AppContext, AppContextType } from "./contexts";
import * as models from "./models";
import Login from "./pages/Login";
import AuthState from "./components/AuthState";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [appContext, setAppContext] = React.useState<
    Omit<AppContextType, "login" | "logout">
  >({
    loading: true,
  });
  const login = async (username: string, password: string) => {
    const token = btoa(`${username}:${password}`);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      const data = await response.json();
      const user = await models.userSchema.validate(data);
      setAppContext((ctx) => ({ ...ctx, user }));
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setAppContext((ctx) => {
        const { user, ...newCtx } = ctx;
        return newCtx;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/me", {
          credentials: "include",
        });
        const data = await response.json();
        const user = await models.userSchema.validate(data);
        setAppContext((ctx) => ({
          ...ctx,
          loading: false,
          user,
        }));
      } catch (error) {
        setAppContext((ctx) => {
          const { user, ...newCtx } = ctx;
          return { ...newCtx, loading: false };
        });
      }
    };
    load();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...appContext,
        login,
        logout,
      }}
    >
      {appContext.loading ? (
        <p>Loading...</p>
      ) : (
        <BrowserRouter>
          <div
            className="mx-auto py-12 h-screen flex flex-col"
            style={{
              width: 960,
            }}
          >
            <AuthState />
            <Switch>
              <Route path="/" exact>
                <></>
              </Route>
              <Route path="/auth/login">
                <Login />
              </Route>
              <PrivateRoute path="/authenticated">
                <p>Success</p>
              </PrivateRoute>
              <Route path="/">
                <p>404</p>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </AppContext.Provider>
  );
}

export default App;
