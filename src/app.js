import express from 'express'
import cors from 'cors'
import { tasksRoutes } from './routes/tasks.routes.js'


export const app = express()
app.use(express.json()) //usar na aplicação o formato JSON
app.use(cors())
app.use(tasksRoutes)

//Nodemon -> (lib) ferramenta/dependencia de desenvolvimento para monitorar o código e atualizando as mundanças. Usar --save-dev para a dependencia não ir para produção. 
//Para rodar -> npx nodemon nome do arquivo
//script-> server: nodemon main.js









