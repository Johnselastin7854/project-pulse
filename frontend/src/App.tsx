import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const RegisterOrg = lazy(() => import("./pages/organisation/Register"));
const UserRegister = lazy(() => import("./pages/user/SignUp"));
// const UserSignIn = lazy(() => import("./pages/user/SignIn"));
// const OrgDashboard = lazy(
//   () => import("./pages/organisation/dashboard/Dashboard")
// );
// const UserDashBoard = lazy(() => import("./pages/user/dashboard/Dashboard"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-screen">
          Loading....{" "}
          <span>
            <Loader2 className="animate-spin" />
          </span>
        </div>
      }
    >
      <Routes>
        <Route path="/organization/register" element={<RegisterOrg />} />
      </Routes>
    </Suspense>
  );
}

export default App;
