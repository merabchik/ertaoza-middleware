import { Sequelize } from 'sequelize';

type TInput = {
    uri: string;
}

export class Database {
    private _connection: Sequelize;

    constructor() {
        this._connection = Database.connectSQLite();
    }

    public static get memorySQLite(): Sequelize {
        return new Sequelize('sqlite::memory:', { logging: false })
    }

    get connection(): Sequelize {
        return this._connection;
    }

    public static connectSQLite(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: './dist/src/db.sqlite'
        });
    }

    public static async connectMySQL(): Promise<Sequelize> {
        const vConnection = new Sequelize('db', 'root', '123456', {
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        });
        try {
            await vConnection.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        return vConnection;
    }

    public close(): void {
        if (this._connection instanceof Sequelize) {
            this._connection.close();
        }
    }
}

export const DBHandler: Database = new Database();