import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import PublicOnly from "./features/auth/components/PublicOnly";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

import HeroPreview from "./features/marketing/landing/HeroPreview";
import ResetPassword from "./features/auth/pages/ResetPassword";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyEmail from "./features/auth/pages/VerifyEmail";

import NotFound from "./features/errors/pages/NotFound";
import Layout from "./components/layout/Layout";

import AuthLayout from './features/auth/components/AuthLayout'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
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
        element: <HeroPreview />
      },

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
    ]
  }
]);
