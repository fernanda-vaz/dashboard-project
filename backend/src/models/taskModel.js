import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['Pendente', 'Em andamento', 'Concluída'],
      default: 'Pendente',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
