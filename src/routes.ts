import express from "express";
import CauseController from "./controllers/CausesController";
import OrganizationController from "./controllers/OrganizationController";

const routes = express.Router();

const causeController = new CauseController();
const organizationController = new OrganizationController();

routes.get("/causes", causeController.list);
routes.post("/causes", causeController.create);
routes.delete("/causes/:id", causeController.delete);

routes.get("/organizations", organizationController.get);
routes.post("/organizations", organizationController.create);

export default routes;
