import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { getRouter } from "./router";

const router = getRouter();

const root = document.getElementById("root")!;
createRoot(root).render(
  <>
    <RouterProvider router={router} />
    <Analytics />
  </>,
);
