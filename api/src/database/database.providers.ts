import { createConnection } from 'typeorm';
import ormConfig from '@/database/orm.config';

export const databaseProviders = [{
    provide: 'DATABASE_CONNECTION',
    useFactory: () => createConnection(ormConfig),
}];
