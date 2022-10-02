import schedule from 'node-schedule';
import { LogService } from './log.service';

export class JobsService {
    private logService: LogService;
    private _notifyJob: any;
    private _requestsJob: any;

    constructor() { 
        this.logService = new LogService();
    }

    public async start() {
        this.notifyJob();
        this.requests();
        this._notifyJob.start();
        this._requestsJob.start();
    }

    public async stop() {
        this._notifyJob.cancelNext(true);
        this._requestsJob.cancelNext(true);
        console.log('JobsService.stop executed');
    }

    private notifyJob(): void {
        this._notifyJob = schedule.scheduleJob('*/1 * * * *', async () => {
            console.log('JobsService.notifyJob.scheduleJob at: ' + new Date().toString());
        });
        console.log('JobsService.notifyJob executed');
    }

    private requests(): void {
        this._requestsJob = schedule.scheduleJob('*/59 * * * *', async () => {
            console.log('JobsService.requests.scheduleJob at: ' + new Date().toString());
        });
    }
}