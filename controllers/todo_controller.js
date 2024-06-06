const TodoService = require("../service/todo.js");

class TodoController {
  static async register(req, res, next) {
    const { title, completed, user_id } = req.body;

    try {
      const todo = await TodoService.register({
        title,
        completed,
        user_id,
      });

      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    const { userId } = req.query;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const data = await TodoService.get({
        userId,
        limit,
        offset,
      });

      res.status(200).json({
        totalItems: data.count,
        totalPages: Math.ceil(data.count / limit),
        currentPage: parseInt(page),
        data: data.rows,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async updateOne(req, res, next) {
    const { id } = req.params;
    const { title, completed, user_id } = req.body;
    try {
      const todo = await TodoService.updateOne({
        id,
        title,
        completed,
        user_id,
      });

      return res.status(200).json({
        message: "success updating data",
        todo,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await TodoService.getOne(id);

      return res.status(200).json({
        message: "success retrieving data",
        todo,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const data = await TodoService.deleteID(id);

      return res.status(200).json({
        message: "data deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "server error",
      });
    }
  }
}

module.exports = TodoController;
