import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import PublicOnly from "./features/auth/components/PublicOnly";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import HiariCVLanding from "./features/landing/pages/HiariCVLanding";
import ResetPassword from "./features/auth/pages/ResetPassword";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyEmail from "./features/auth/pages/VerifyEmail";

import Docs from "./features/landing/pages/Docs";
import AboutUs from "./features/landing/pages/AboutUs";
import Pricing from "./features/landing/pages/Pricing";
import NotFound from "./features/landing/pages/NotFound";


export const router = createBrowserRouter([

  {
    path: "/docs",
    element: <Docs />
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/pricing",
    element: <Pricing />
  },

  {
    path: "/login",
    element: (
      <PublicOnly>
        <Login />
      </PublicOnly>
    )
  },
  {
    path: "/register",
    element: (
      <PublicOnly>
        <Register />
      </PublicOnly>
    )
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />
  },
  {
    path: "/",
    element: (
      <PublicOnly>
        <HiariCVLanding />
      </PublicOnly>
    )
  }
  ,
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Home />
      </Protected>
    )
  },
  {
    path: "/interview/:interviewId",
    element: <Protected><Interview /></Protected>
  },
  {
    path: "*",
    element: <NotFound />
  }
])
