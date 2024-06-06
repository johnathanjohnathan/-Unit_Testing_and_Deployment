const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user");
const SECRET_KEY = "secret";

//register get login
class UserService {
  static async register(data) {
    const { name, email, password } = data;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await UserRepository.register({
      name,
      email,
      hashedPassword,
    });

    return user;
  }

  static async upload(data) {
    const { id, file } = data;
    const new_user = await UserRepository.updateProfilePicture(id, file);
    if (!new_user) {
      throw new Error("no user with id= " + id + " not found!");
    }
    if (!file) {
      throw new Error("no file found!");
    }
    return new_user;
  }

  static async login(data) {
    const { email, password } = data;
    const user = await UserRepository.findUserEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid Credential");
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { user: user, token: token };
  }

  static async get(pagination) {
    const { limit, offset } = pagination;
    const data = await UserRepository.findAndPagination(limit, offset);
    return data;
  }

  static async updateOne(data) {
    const { id, name, email } = data;
    const user = await UserRepository.updateOne(id, name, email);
    return user;
  }

  static async getOne(id) {
    const user = await UserRepository.findUser(id);
    if (!user) {
      throw new Error("no user with id= " + id + " not found!");
    }
    return user;
  }

  static async deleteID(id) {
    const user = await UserRepository.deleteID(id);
    if (!user) {
      throw new Error("no user with id= " + id + " not found!");
    }
    return user;
  }
}

module.exports = UserService;
