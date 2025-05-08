import { useRoutes } from "react-router-dom";
import Home from "./page";
import Layout from "./layout";
import ManagementProductsPage from "./management/products/page";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "management/products", element: <ManagementProductsPage /> },
      ],
    },
  ]);
}
