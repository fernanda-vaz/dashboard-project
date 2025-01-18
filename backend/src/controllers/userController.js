import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists)
      return res.status(400).json({ message: 'Usuário já cadastrado' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Credenciais inválidas' })

    res.status(200).json({
      message: 'Usuário logado com sucesso!',
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
