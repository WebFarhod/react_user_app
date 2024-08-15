import { useRoutes, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "../components/loader/PageLoader";

const RegisterPage = lazy(() => import("../pages/register"));
const LoginPage = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const DashboardLayout = lazy(() => import("../layouts/dashboard"));

function Router() {
  const router = useRoutes([
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [{ element: <Home />, index: true }],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ]);

  return <Suspense fallback={<PageLoader />}>{router}</Suspense>;
}

export default Router;
