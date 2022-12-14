import { SettingsModel } from "../models/settings.model";


export class SettingsService {

    private _model: SettingsModel;
    public static rootKey: string = 'root';
    private initKey: string = 'init';

    constructor() {
        this._model = new SettingsModel();
    }

    getInitSettings(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            SettingsModel.findAll({
                where: {
                    zone: this.initKey
                }
            }).then((settings: SettingsModel[]) => {
                resolve(settings);
            }).catch((pError) => {
                reject(pError);
            });
        });
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