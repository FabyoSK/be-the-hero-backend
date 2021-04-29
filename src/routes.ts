import express from "express";
import CauseController from "./controllers/CausesController";

const routes = express.Router();

const causeController = new CauseController();

routes.get("/causes", causeController.list);

export default routes;
