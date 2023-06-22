import express, { Request, Response, Router } from "express";
import speciesRoute from "./species.route";

const router: Router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/species',
    route: speciesRoute,
  }
]

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export { router }
