import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const RegisterOrg = lazy(() => import("./pages/organisation/auth/Register"));
const VerifyEmailOrg = lazy(
  () => import("./pages/organisation/auth/VerifyEmail")
);
// const UserRegister = lazy(() => import("./pages/user/SignUp"));
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
        <Route
          path="/organization/register/verify-email"
          element={<VerifyEmailOrg />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
