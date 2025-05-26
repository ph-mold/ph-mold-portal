import { useRoutes } from "react-router-dom";
import Home from "./page";
import Layout from "./layout";
import ManagementProductsPage from "./cms/management/products/page";
import ManagementProductPage from "./cms/management/products/[productKey]/page";
import LoginPage from "./login/page";
import CmsPage from "./cms/page";
import ErpPage from "./erp/page";

export default function Routes() {
  return useRoutes([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "erp", element: <ErpPage /> },
        {
          path: "cms",
          children: [
            { index: true, element: <CmsPage /> },
            {
              path: "management/products",
              element: <ManagementProductsPage />,
            },

            {
              path: "management/products/:productKey",
              element: <ManagementProductPage />,
            },
          ],
        },
      ],
    },
  ]);
}
