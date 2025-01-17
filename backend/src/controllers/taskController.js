import Task from '../models/taskModel.js'
import User from '../models/userModel.js'

export const createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body

    const userExists = await User.findById(assignedTo)
    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    const task = new Task({ title, description, status, assignedTo, dueDate })
    await task.save()

    res.status(201).json({ message: 'Tarefa criada com sucesso', task })
  } catch (error) {
    console.error('Erro ao criar tarefa: ', error)
    res.status(500).json({ error: 'Erro ao criar tarefa' })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' })

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' })
    res.status(200).json({ message: 'Tarefa excuída com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
