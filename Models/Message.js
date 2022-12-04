module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define("Message", {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      chatAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        default:false,
      },
      // userId:{
      //   type:DataTypes.STRING,
      //   allowNull:false,
      // },
      grpId:{
        type:DataTypes.STRING,
        allowNull:false,
      }
    });
    return Message;
  };