import { useRoutes } from "react-router-dom";
import Home from "./page";
import Layout from "./layout";
import ManagementProductsPage from "./cms/management/products/page";
import ManagementProductPage from "./cms/management/products/[productKey]/page";
import LoginPage from "./login/page";
import CmsPage from "./cms/page";
import ErpPage from "./erp/page";
import UserPage from "./user/page";
import SampleRequestsPage from "./erp/sample-requests/page";
import SampleRequestDetailPage from "./erp/sample-requests/[requestId]/page";

export default function Routes() {
  return useRoutes([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "user", element: <UserPage /> },
        {
          path: "erp",
          children: [
            { index: true, element: <ErpPage /> },
            { path: "sample-requests", element: <SampleRequestsPage /> },
            {
              path: "sample-requests/:requestId",
              element: <SampleRequestDetailPage />,
            },
          ],
        },
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
