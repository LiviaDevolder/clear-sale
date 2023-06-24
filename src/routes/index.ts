import express, { Router } from "express"
import speciesRoute from "./species.route"
import weaponsRoute from "./weapons.route"
import locationsRoute from "./locations.route"
import charactersRoute from "./characters.route"

const router: Router = express.Router()

interface IRoute {
  path: string
  route: Router
}

const defaultIRoute: IRoute[] = [
  {
    path: '/species',
    route: speciesRoute,
  },
  {
    path: '/weapons',
    route: weaponsRoute,
  },
  {
    path: '/locations',
    route: locationsRoute,
  },
  {
    path: '/characters',
    route: charactersRoute,
  },
]

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route)
})

export { router }
