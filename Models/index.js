const server = require("../server");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(server.DB, server.USER, server.PASSWORD, {
  host: server.HOST,
  dialect: server.dialect,
  pool: {
    max: server.pool.max,
    min: server.pool.min,
    acquire: server.pool.acquire,
    idle: server.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Database in connected");
  })
  .catch((err) => {
    console.log("Failed to connect" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./UserModel")(sequelize, Sequelize);
db.ChatGroups=require("./ChatGroup")(sequelize,Sequelize);
db.Messages=require("./Message")(sequelize,Sequelize);

db.sequelize.sync({force:false}).then(() => {
  console.log("yes re-sync done!");
});
db.Users.hasMany(db.Messages,{foriegnKey:'userId',as:"userDetails"});
db.Messages.belongsTo(db.Users);
db.ChatGroups.hasMany(db.Messages,{foriegnKey:'ChatGrpId',as:"message"});
db.Messages.belongsTo(db.ChatGroups);

module.exports = db;
