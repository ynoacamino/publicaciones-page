import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  word: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export default mongoose.models.Diccionario || mongoose.model('Diccionario', schema);
