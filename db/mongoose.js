const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://guest:guest123@cluster0-s8l65.gcp.mongodb.net/noteDB?retryWrites=true&w=majority', {
  useNewUrlParser: true
});