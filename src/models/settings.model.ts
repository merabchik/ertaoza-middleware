import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Database, DBHandler } from "../db";
import { SettingsService } from "../services/settings.service";

export class SettingsModel extends Model<InferAttributes<SettingsModel>, InferCreationAttributes<SettingsModel>> {
    declare zone: string;
    declare key: string;
    declare value: string;
}

SettingsModel.init({
    zone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: SettingsService.rootKey
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize: (DBHandler.connection instanceof Sequelize) ? DBHandler.connection : Database.memorySQLite,
        modelName: 'settings',
        tableName: 'settings',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);