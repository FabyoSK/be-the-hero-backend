import { Request, Response } from "express";
import { v4 } from "uuid";
import db from "../database/connection";

interface Organization {
  id: string;
  name: string;
  email: string;
  whatsApp: string;
  city: string;
  uf: string;
}

export default class OrganizationController {
  async get(request: Request, response: Response) {
    try {
      const { name } = request.query;

      // Get all causes from de database
      const cause: Organization = await db
        .select()
        .from("organizations")
        .whereRaw(`name = '${name}'`);

      return response.json(cause);
    } catch (error) {
      return response.status(500).send("Error while fetching todos");
    }
  }
  async create(request: Request, response: Response) {
    const { name, email, whatsApp, city, uf } = request.body;

    const organization: Organization = {
      id: v4(),
      name,
      email,
      whatsApp,
      city,
      uf,
    };

    const trx = await db.transaction();

    try {
      // Insert the cause on the table cause
      await trx("organizations").insert(organization);

      // Commit to finish the trasaction
      await trx.commit();
    } catch (error) {
      console.log(error);

      // Rollback if something when wrong
      await trx.rollback();
      return response
        .status(401)
        .send("Error while creating a new organization");
    }
    return response.status(201).json(organization);
  }
}
