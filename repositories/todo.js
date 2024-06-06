const { Todo } = require("../models");

class TodoRepository {
  static async register(data) {
    const { title, completed, user_id } = data;
    const todo = await Todo.create({
      title,
      completed,
      user_id,
    });

    return todo;
  }

  static async findTodo(id) {
    const todo = await Todo.findByPk(id);
    return todo;
  }

  static async findAndPagination(userId, limit, offset) {
    const data = await Todo.findAndCountAll(
      { where: { user_id: userId } },
      {
        limit: parseInt(limit),
        offset: parseInt(offset),
      }
    );
    return data;
  }

  static async updateOne(id, title, completed, user_id) {
    let todo = await Todo.update(
      {
        title: title,
        completed: completed,
        user_id: user_id,
      },
      { where: { id: id } }
    );
    todo = await this.findTodo(id);
    return todo;
  }

  static async deleteID(id) {
    const data = await Todo.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = TodoRepository;
