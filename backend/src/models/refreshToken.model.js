const { Schema, model } = require('mongoose');

const refreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },    
    expiresAt: { 
      type: Date, required: true 
    },
    userAgent: String,
    ip: String
  },
  {
    timestamps: true
  }
);

refreshTokenSchema.index({ expiresAt: 1 }, {expireAfterSeconds: 0})

module.exports = model('RefreshToken', refreshTokenSchema);
