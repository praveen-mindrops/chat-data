module.exports = (sequelize, DataTypes) => {

  const ChatGroup = sequelize.define("ChatGroup", {
    user1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    communicationType: {
        type:DataTypes.ENUM('whatsApp','teligram','email'),
        defaultValue: 'whatsApp',
        allowNull:false,
    },
  });
  return ChatGroup;
};
