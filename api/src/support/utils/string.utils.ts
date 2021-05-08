import { Connection } from 'typeorm';

export function DatabaseRepository(NAME, Type) {
    return {
        provide: NAME,
        useFactory: (connection: Connection) =>
            connection.getRepository(Type),
        inject: ['DATABASE_CONNECTION'],
    };
}
