import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      session_id?: string;
      name: string;
      email: string;
      password: string;
      created_at: string;
      update_at?: string;
    };
    meals: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      datetime: string;
      is_within_diet: boolean;
      created_at: string;
      update_at?: string;
    };
  }
}
