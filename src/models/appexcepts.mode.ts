import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Database, DBHandler } from "../db";

export class AppexceptsModel extends Model<InferAttributes<AppexceptsModel>, InferCreationAttributes<AppexceptsModel>> {
    declare key: string;
    declare ipaddr: string;
    declare body: string;
}

AppexceptsModel.init({
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Exception key"
    },
    ipaddr:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "IP address"
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Log body"
    }
},
    {
        sequelize: (DBHandler.connection instanceof Sequelize) ? DBHandler.connection : Database.memorySQLite,
        modelName: 'appexcepts',
        tableName: 'app_excepts',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at'
    }
);