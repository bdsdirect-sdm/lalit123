import { DataTypes, Model } from "sequelize";

import sequelize from "../config/dbconnect";

class UserDetail extends Model {
    public firstName! : string;
    public lastName! : string;
    public email! : string;
    public password! : string;
    public dateOfBirth? : Date;
    public gender? : string;
    public phoneNo? : string;
}

UserDetail.init(
    {
        firstName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dataOfBirth:{
            type: DataTypes.STRING,
        },
        gender:{
            type:DataTypes.STRING,
        },
        phoneNo:{
            type:DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName:"userDetails"
    }
)

export default UserDetail;