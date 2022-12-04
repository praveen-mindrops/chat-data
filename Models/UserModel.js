module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("User",{
        name:{
            type:DataTypes.STRING,
            // allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            // allowNull:false,
            unique: {
              arg: true,
              msg: 'This email is already registered'
          },
            validate: {
              isEmail: {
                msg: "Please enter a valid email address",
              }
            }
            
        },
          mobile: {
            type: DataTypes.STRING,
            allowNull:false,
            
          },
       
      
    })
    return User;
}