const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    rfid: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("User", UserSchema);
