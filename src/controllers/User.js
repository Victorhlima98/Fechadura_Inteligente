const User = require("../models/User");
const Log = require("../models/Log");

module.exports = {
  async index(request, response) {
    try {
      const { password } = request.body;

      if (password !== process.env.PASSWORD) {
        return response.status(200).json({ error: "password" });
      }

      const users = await User.find();

      return response.json({ users });
    } catch {
      return response.status(400).json({ error: "Erro" });
    }
  },
  async show(request, response) {
    try {
      const { rfid } = request.params;
      console.log(rfid);

      const user = await User.find({ rfid });
      console.log(user);

      if (user.length <= 0) {
        return response.status(400).json({ error: "User not exists" });
      }

      await Log.create({ user: user[0]._id });

      return response.json(user[0]);
    } catch {
      return response.status(400).json({ error: "Error" });
    }
  },
  async store(request, response) {
    try {
      const { name, rfid, password } = request.body;

      if (password !== process.env.PASSWORD) {
        return response.status(200).json({ error: "password" });
      }

      const users = await User.find({ rfid });

      if (users.length > 0) {
        return response.status(200).json({ error: "user exists" });
      }

      const user = await User.create({
        name,
        rfid
      });

      return response.json({ user });
    } catch {
      return response.status(400).json({ error: "Error" });
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findById(id);

      if (!user) {
        return response.status(400).json({ error: "user not exists" });
      }

      const { name, rfid } = request.body;

      if (name !== undefined) {
        user.set({ name });
      }

      if (rfid !== undefined) {
        user.set({ rfid });
      }

      await user.save();

      return response.json({ user });
    } catch {
      return response.status(400).json({ error: "Erro" });
    }
  },
  async remove(request, response) {
    try {
      const { password } = request.body;
      const { id } = request.params;

      if (password !== process.env.PASSWORD) {
        return response.status(200).json({ error: "password" });
      }

      const user = await User.findByIdAndDelete(id);

      return response.json({ user });
    } catch {
      return response.status(400).json({ error: "Erro" });
    }
  }
};
