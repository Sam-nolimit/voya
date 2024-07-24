import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layout";
import { coreRoutes } from "./routes";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {coreRoutes.map(({ path, component: Component }, index) => (
          <Route
            path={path}
            key={index}
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    <ClipLoader color={"#123abc"} loading={true} size={50} />
                  </div>
                }
              >
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/user-roles" replace />} />
      </Route>
    </Routes>
  );
}


export default App;
