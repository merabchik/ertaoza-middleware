import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Database, DBHandler } from "../db";

export class LogsModel extends Model<InferAttributes<LogsModel>, InferCreationAttributes<LogsModel>> {
    declare request_id: number;
    declare body: string;
}

LogsModel.init({
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Log body"
    }
},
    {
        sequelize: (DBHandler.connection instanceof Sequelize) ? DBHandler.connection : Database.memorySQLite,
        modelName: 'logs',
        tableName: 'logs',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);