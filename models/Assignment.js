import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

const Assignment = sequelize.define("Assignment", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" }
});

// Relations
User.hasMany(Assignment, { foreignKey: "userId" });
Assignment.belongsTo(User, { foreignKey: "userId" });

export default Assignment;
