const mongoose = require('mongoose');

// Define Schemes
const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
},
{
  timestamps: true
});

// Create new todo document
// Statics model methods(Statics): Schema의 statics 프로퍼티에 사용자 정의 메소드를 추가한다.
todoSchema.statics.create = function (payload) {
  // this === Model Todo
  const todo = new this(payload);
  // return Promise
  return todo.save();
};

// Find All
todoSchema.statics.findAll = function () {
  return this.find({}, {
    _id: false, id: true, content: true, completed: true
  }).sort({ id: 'desc' });
};

// Update All
todoSchema.statics.updateAll = function (payload) {
  return this.update({ }, payload, { multi: true });
};

// Update by todoid
todoSchema.statics.updateByTodoid = function (id, payload) {
  return this.findOneAndUpdate({ id }, payload);
};

// Delete by todoid
todoSchema.statics.deleteByTodoid = function (id) {
  return this.remove({ id });
};

// Delete by completed
todoSchema.statics.deleteByCompleted = function () {
  return this.remove({ completed: true });
};

// Create Model & Export
module.exports = mongoose.model('Todo', todoSchema);