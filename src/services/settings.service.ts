import { SettingsModel } from "../models/settings.model";


export class SettingsService {

    private _model: SettingsModel;
    public static rootKey: string = 'root';

    constructor() {
        this._model = new SettingsModel();
    }

    public async get(pKey: string, pZone: string = ''): Promise<string> {
        if (pZone === '') {
            pZone = SettingsService.rootKey;
        }
        const vSettings = await SettingsModel.findOne({
            where: {
                zone: pZone,
                key: pKey
            }
        });
        if (vSettings) {
            return vSettings.value;
        }
        return '';
    }

    public async set(pZone: string, pKey: string, pValue: string): Promise<void> {
        const vSettings = await SettingsModel.findOne({
            where: {
                zone: pZone,
                key: pKey
            }
        });
        if (vSettings) {
            vSettings.value = pValue;
            await vSettings.save();
        } else {
            this._model.zone = pZone;
            this._model.key = pKey;
            this._model.value = pValue;
            await this._model.save();
        }
    }

}