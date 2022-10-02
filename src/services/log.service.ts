import fs from 'fs';
import { LogsModel } from '../models/logs.model';

export class LogService {

    private _logFilePath: string = './log.txt';
    private _model: LogsModel;

    constructor(pFileName = '') {
        if (pFileName !== '') {
            this._logFilePath = pFileName;
        }
        this._model = new LogsModel();
    }

    public async log(pMessage: string, pRequestId: number = 0): Promise<void> {
        const vDate = new Date();
        const vLog = vDate.toString() + ' - ' + pMessage;
        this._model.request_id = pRequestId;
        this._model.body = vLog;
        await this._model.save();
    }

    public log2file(pMessage: string): void {
        if (!fs.existsSync(this._logFilePath)) {
            fs.writeFileSync(this._logFilePath, '');
        }
        fs.appendFile(this._logFilePath, pMessage, (err) => {
            if (err) throw err;
        });
    }

}