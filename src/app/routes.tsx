import { useRoutes } from "react-router-dom";
import Home from "./page";
import Layout from "./layout";
import ManagementProductsPage from "./cms/products/page";
import ManagementProductPage from "./cms/products/[productKey]/page";
import LoginPage from "./login/page";
import CmsPage from "./cms/page";
import ErpPage from "./erp/page";
import UserPage from "./user/page";
import SampleRequestsPage from "./erp/sample-requests/page";
import SampleRequestDetailPage from "./erp/sample-requests/[requestId]/page";
import TagsPage from "./cms/tags/page";
import LS3510Page from "./erp/label-sticker/ls-3510/page";
import LabelStickerPage from "./erp/label-sticker/page";
import LS3509Page from "./erp/label-sticker/ls-3509/page";
import SpecsPage from "./cms/specs/page";

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
            {
              path: "label-sticker",
              children: [
                {
                  path: "",
                  element: <LabelStickerPage />,
                },
                {
                  path: "ls-3510",
                  element: <LS3510Page />,
                },
                {
                  path: "ls-3509",
                  element: <LS3509Page />,
                },
              ],
            },
          ],
        },
        {
          path: "cms",
          children: [
            { index: true, element: <CmsPage /> },
            {
              path: "products",
              element: <ManagementProductsPage />,
            },
            {
              path: "products/:productKey",
              element: <ManagementProductPage />,
            },
            {
              path: "tags",
              element: <TagsPage />,
            },
            {
              path: "specs",
              element: <SpecsPage />,
            },
          ],
        },
      ],
    },
  ]);
}
