const models = require("../Models");
const catchAsync = require("../Utils/catchAsync.js");
const AppError = require("../Utils/AppError");
const { Op, where } = require("sequelize");
const { ChatGroups, Messages, Users } = require("../Models");
exports.createUserChat = catchAsync(async (req, res, next) => {
  const [users1, users2, ...restUser] = req.body.data[0].grp.users;
  let con1;
  let con2;
  let medium;
  if (req.body.medium === "whatsApp") {
    con1 = { mobile: users1.mobile };
    con2 = { mobile: users2.mobile };
    medium = "whatsApp";
  } else if (req.body.medium === "email") {
    con1 = { email: users1.email };
    con2 = { email: users2.email };
    medium = "email";
  } else if (req.body.medium === "teligram") {
    con1 = { mobile: users1.mobile };
    con2 = { mobile: users2.mobile };
    medium = "teligram";
  }

  let userData1;
  userData1 = await Users.findAll({
    where: con1,
  });
  if (userData1.length === 0) {
    userData1 = await Users.create(users1);
    userData1 = [userData1];
  }

  let userData2 = await Users.findAll({
    where: con2,
  });
  if (userData2.length === 0) {
    userData2 = await Users.create(users2);
    userData2 = [userData2];
  }

  let ChatGrpData;
  if ((userData1.length !== 0 && userData2 !== 0) || (userData1 && userData2)) {
    ChatGrpData = await ChatGroups.findAll({
      where: {
        [Op.and]: [
          { user1: userData1[0].id },
          { user2: userData2[0].id },
          { communicationType: medium },
        ],
      },
    });
  }

  if (ChatGrpData.length === 0) {
    ChatGrpData = await ChatGroups.create({
      user1: userData1[0].id,
      user2: userData2[0].id,
      communicationType: medium,
    });
  }
  ChatGrpData.id === undefined
    ? (ChatGrpData = ChatGrpData[0])
    : (ChatGrpData = ChatGrpData);
  let a = [];
  users1.msg.forEach((el) => {
    el["UserId"] = userData1[0].id;
    el["ChatGroupId"] = ChatGrpData.id;
    a.push(el);
  });
  let b = [];
  users2.msg.forEach((el) => {
    el["UserId"] = userData2[0].id;
    el["ChatGroupId"] = ChatGrpData.id;

    b.push(el);
  });

  const msgData = await Messages.bulkCreate([...a, ...b]);
  res.status(201).json({ msgData });
});

exports.getAllUsersDetails = catchAsync(async (req, res, next) => {
  let doc;

  doc = await ChatGroups.findAndCountAll({
    attributes: ["id", "name", "email", "mobile"],
    include: [
      {
        model: Messages,
        as: "message",
      },
    ],
  });
  if (!doc) {
    return next(new AppError("Result not found", 404));
  }
  res.status(200).send({ msg: "success", data: doc });
});
