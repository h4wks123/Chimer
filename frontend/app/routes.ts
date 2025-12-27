import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("routes/entries/layout.tsx", [
    route("login", "routes/entries/login.tsx"),
    route("register", "routes/entries/register.tsx"),
  ]),
] satisfies RouteConfig;
