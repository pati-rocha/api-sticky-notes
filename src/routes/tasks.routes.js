import { Router } from "express";

import {
  activeOne,
  create,
  destroy,
  findAll,
  findOne,
  update,
} from "../controllers/task.controller.js";

export const tasksRoutes = Router();

//pesquisar tarefa
tasksRoutes.get("/tasks", findAll);
//cadastrar uma tarefa
tasksRoutes.post("/tasks", create);

//route params
//deletar uma tarefa
tasksRoutes.delete("/tasks/:id", destroy);
//buscar uma tarefa
tasksRoutes.get("/tasks/:id", findOne);
//atualizar uma tarefa não concluída
tasksRoutes.put("/tasks/:id", update);
//atualizar o status da tarefa
tasksRoutes.patch("/tasks/:id/active", activeOne);
