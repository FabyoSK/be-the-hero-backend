import express from "express";
import CauseController from "./controllers/CausesController";

const routes = express.Router();

const causeController = new CauseController();

routes.get("/causes", causeController.list);
routes.post("/causes", causeController.create);
routes.delete("/causes/:id", causeController.delete);

export default routes;
