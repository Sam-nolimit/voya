import { lazy } from "react";

const UserRolesPage = lazy(() => import("../pages/UserRole"));

export const coreRoutes = [
  {
    path: "/user-roles",
    title: "User Roles Page",
    component: UserRolesPage,
  },
];
