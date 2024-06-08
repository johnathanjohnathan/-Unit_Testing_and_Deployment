const TodoRepository = require("../repositories/todo.js");

class TodoService {
  static async register(data) {
    const { title, completed, user_id } = data;

    const todo = await TodoRepository.register({
      title,
      completed,
      user_id,
    });

    return todo;
  }

  static async get(pagination) {
    const { userId, limit, offset } = pagination;
    const data = await TodoRepository.findAndPagination(userId, limit, offset);
    return data;
  }

  static async updateOne(data) {
    const { id, title, completed, user_id } = data;
    const todo = await TodoRepository.updateOne(id, title, completed, user_id);
    return todo;
  }

  static async getOne(id) {
    const todo = await TodoRepository.findTodo(id);
    if (!todo) {
      throw new Error("todo with id= " + id + " not found!");
    }
    return todo;
  }

  static async deleteID(id) {
    const data = await TodoRepository.deleteID(id);
  }
}

module.exports = TodoService;
