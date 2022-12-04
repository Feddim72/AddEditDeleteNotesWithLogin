import { lazy, Suspense } from "react";
const PrivateRouteAuth = lazy(() => import("./hoc/privateRouteAuth"));
const HomePage = lazy(() => import("./pages/homePage"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));
const NotFoundPage = lazy(() => import("./pages/notFoundPage"));
const ResetPassword = lazy(() => import("./pages/resetPassword"));
const UserLandingPage = lazy(() => import("./pages/userLandingPage"));
const CreateAccount = lazy(() => import("./pages/createAccount"));
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-black" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route
          path="/userLandingPage"
          element={
            <PrivateRouteAuth>
              <UserLandingPage />
            </PrivateRouteAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
