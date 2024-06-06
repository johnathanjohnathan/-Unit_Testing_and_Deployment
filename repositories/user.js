const { where } = require("sequelize");
const { User } = require("../models");

class UserRepository {
  static async register(data) {
    try {
      const { name, email, hashedPassword } = data;
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static async findUser(id) {
    const user = await User.findByPk(id);
    return user;
  }

  static async updateProfilePicture(id, file) {
    const new_profile_pictures = `http://localhost:3000/upload/${file.filename}`;
    let user = await User.update(
      {
        profile_pictures: new_profile_pictures,
      },
      { where: { id: id } }
    );
    user = await this.findUser(id);
    return user;
  }

  static async findUserEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  static async findAndPagination(limit, offset) {
    const status = true;
    const data = await User.findAndCountAll({
      where: { status },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return data;
  }

  static async updateOne(id, name, email) {
    let user = await User.update(
      {
        name: name,
        email: email,
      },
      { where: { id: id } }
    );
    user = await this.findUser(id);
    return user;
  }

  static async deleteID(id) {
    let user = await User.update(
      {
        status: false,
      },
      { where: { id: id } }
    );
    user = await this.findUser(id);
    return user;
  }
}

module.exports = UserRepository;
