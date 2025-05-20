import { useRoutes } from "react-router-dom";
import Home from "./page";
import Layout from "./layout";
import ManagementProductsPage from "./management/products/page";
import ManagementProductPage from "./management/products/[productKey]/page";
import LoginPage from "./login/page";

export default function Routes() {
  return useRoutes([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "management/products", element: <ManagementProductsPage /> },

        {
          path: "management/products/:productKey",
          element: <ManagementProductPage />,
        },
      ],
    },
  ]);
}
