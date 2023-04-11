//cadastrar - create
//listar vários - findAll
//listar um elemento - findOne
//atualizar um elemento - updateOne ou updateMany
//deletar elemnto - destroy ou delete(evitar pq é palavra reservada)

import { v4 as uuidv4 } from "uuid";
import { createTaskSchema } from "../validations/createTask.schema.js";

let tasks = [];

//pesquisar tarefa
export function findAll(req, res) {
  const titleQuery = req.query.title || "";
  const descriptionQuery = req.query.description || "";

  const tasksSearch = tasks.filter(
    (task) =>
      task.title.toUpperCase().includes(titleQuery.toUpperCase()) &&
      task.description.toUpperCase().includes(descriptionQuery.toUpperCase())
  );
  return res.json(tasksSearch);
}

//cadastrar uma tarefa
export async function create(req, res) {
  //BODY - sempre tratar o body, usar apenas as chaves q são necessárias para não receber um script
  //malicioso
  try {
    await createTaskSchema.validate(req.body);

    const task = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      limit_date: req.body.limit_date,
      status: false,
      created_at: new Date().toLocaleDateString("pt-BR"),
    };
    tasks.push(task);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//route params
//deletar uma tarefa
export function destroy(req, res) {
  const tasksFiltered = tasks.filter((task) => task.id != req.params.id);
  tasks = [...tasksFiltered]; //spread - faz uma cópia do array original
  res.json();
}

//buscar uma tarefa
export function findOne(req, res) {

    const task =  tasks.find( task => task.id == req.params.id)//find retorna o primeiro objeto q ele encontrar
     
    if(!task) {
        return res.status(404).json({error: 'Desculpa, esse item não foi encontrado!'})
    }
    res.json(task)
}

//atualizar uma tarefa não concluída
export function update(req, res) {
    const task = tasks.find( task => task.id == req.params.id)
    if (!task) {
        return res.status(404).json({error: 'Desculpa, não encontramos essa tarefa!'})
    }
    if (task.status) {
        return res.status(401).json({error: 'Não é permitido atualizar uma tarefa concluída!'})
    }
    const newTasks = tasks.map( task => {
    if (task.id == req.params.id) {
        task.title = req.body.title
        task.description = req.body.description
        task.limit_date = req.body.limit_date  
        task.status = true      
    }
    return task    
})  
    tasks = [... newTasks]    
    res.json()  //como é a última instrução não precisa dar o return 
}

//atualizar o status da tarefa
export function activeOne(req, res) {

    const task = tasks.find( task => task.id == req.params.id)
    if(!task) {
        return res.status(404).json({error:'Desculpa, não encontramos essa tarefa!'})
    }

    const taskStatus = tasks.map( task => {
        if ( task.id == req.params.id) {
           task.status = true
        }
        return task
    })

    tasks = [ ...taskStatus]

    res.json()

}