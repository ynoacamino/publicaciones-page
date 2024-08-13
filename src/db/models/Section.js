import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

export default mongoose.models.Section || mongoose.model('Section', schema);
