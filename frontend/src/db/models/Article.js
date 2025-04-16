import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  imgSrc: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  seccion: {
    type: String,
    require: true,
  },
  preview: {
    type: String,
    require: true,
  },
  titleBody: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
  },
  pdfSrc: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  authorImg: {
    type: String,
  },
  authorName: {
    type: String,
  },
  authorPosition: {
    type: String,
  },
  authorFacebook: {
    type: String,
  },
});

export default mongoose.models.Article || mongoose.model('Article', schema);
