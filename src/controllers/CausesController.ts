import { Request, Response } from "express";
import { v4 } from "uuid";
import db from "../database/connection";

interface Cause {
  id: string;
  name: string;
  description: string;
  value: string;
  organization_id: string;
  organization_name: string;
}

export default class CausesController {
  async list(request: Request, response: Response) {
    try {
      // Get all causes from de database
      const causes = await db.select().from<Cause[]>("causes");

      // Return all the todos in a JSON format
      return response.json(causes);
    } catch (error) {
      return response.status(500).send("Error while fetching cause");
    }
  }
  async create(request: Request, response: Response) {
    const {
      name,
      description,
      value,
      organization_id,
      organization_name,
    } = request.body;

    const cause: Cause = {
      id: v4(),
      name,
      description,
      value,
      organization_id,
      organization_name,
    };

    const trx = await db.transaction();

    try {
      // Insert the cause on the table cause
      await trx("causes").insert(cause);

      // Commit to finish the trasaction
      await trx.commit();
    } catch (error) {
      // Rollback if something when wrong
      await trx.rollback();
      return response.status(401).send("Error while creating a new cause");
    }
    return response.status(201).json(cause);
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      await db("causes").where("id", id).del();
    } catch (error) {
      console.log(error);

      return response.status(401).send("Error while deleting a cause");
    }
    return response.status(204).send();
  }
}
