import { DBHandler } from "./db";
import { AppexceptsModel } from "./models/appexcepts.mode";
import { LogsModel } from "./models/logs.model";
import { SettingsModel } from "./models/settings.model";

const migration = async () => {
    try {
        await LogsModel.sync({ force: false, alter: true });
        await SettingsModel.sync({ force: false, alter: true });
        await AppexceptsModel.sync({ force: false, alter: true });
        await DBHandler.connection.sync({ force: false, alter: true });
        console.log("MIGRATION", "SUCCESS");
    } catch (err: any) {
        console.error(err);
    }
};
migration();