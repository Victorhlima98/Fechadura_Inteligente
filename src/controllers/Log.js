const Log = require("../models/Log");

module.exports = {
  async index(request, response) {
    try {
      const { password } = request.body;

      if (password !== process.env.PASSWORD) {
        return response.status(200).json({ error: "password" });
      }

      const logs = await Log.find().populate("user");

      return response.json({ logs });
    } catch {
      return response.status(400).json({ error: "Erro" });
    }
  }
};
