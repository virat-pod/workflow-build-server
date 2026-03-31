import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    uID: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String },
    xp: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    currentBadge: { type: String, default: null },
    streak: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null },
    tasksDone: { type: Number, default: 0 },
  },
  { timestamps: true },
);

UserSchema.methods.addXP = async function (amount) {
  if (amount > 0) {
    this.xp += amount;
    this.tasksDone += 1;
  } else {
    this.xp -= 10;
    this.tasksDone -= 1;
  }

  if (this.xp >= 100 && !this.badges.includes("starter")) {
    this.badges.push("starter");
    this.currentBadge = "starter";
  } else if (this.xp >= 200 && !this.badges.includes("builder")) {
    this.badges.push("builder");
    this.currentBadge = "builder";
  } else if (this.xp >= 500 && !this.badges.includes("pro")) {
    this.badges.push("pro");
    this.currentBadge = "pro";
  } else if (this.xp >= 1000 && !this.badges.includes("elite")) {
    this.badges.push("elite");
    this.currentBadge = "elite";
  }

  await this.save();
};

export default mongoose.model("User", UserSchema);
