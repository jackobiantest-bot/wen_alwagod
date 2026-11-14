const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: 5,
      max: 255,
      required: [true, 'User name is required'],
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      min: 9,
      max: 10,
      required: [true, "phone required"]
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    password: {
      type: String,
      min: [6, "password length is too short"],
      required: [true, "password is required"],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, "password confirmation is required"],
      validator: function(el) {
        return this.password === el.password
      },
      message: 'passwords did not match'
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function() {
  
  if(!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  
  this.passwordConfirm = undefined;

})

userSchema.methods.comparePassword = async function(canidatePassword) {
  return await bcrypt.compare(canidatePassword, this.password);
}

module.exports = model ('User', userSchema);
