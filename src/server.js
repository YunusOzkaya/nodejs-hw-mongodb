require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { notFoundHandler } = require('./middlewares/notFoundHandler')
const { errorHandler } = require('./middlewares/errorHandler')
const contactsRouter = require('./routers/contacts')

const app = express()
app.use(express.json())

app.use('/contacts', contactsRouter)

app.use('*', notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error('Mongo connection error:', err.message))
