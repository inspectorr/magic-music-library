import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from '@/users/model/user.entity';

try {
    const fs = require('fs');
    const localEnvFile = fs.readFileSync(`.env.local`);
    if (localEnvFile) {
        const dotenv = require('dotenv');
        const envConfig = dotenv.parse(localEnvFile);
        for (const key in envConfig) {
            process.env[key] = envConfig[key];
        }
    }
} catch (e) {
    console.info('No local .env.local file used.');
}

function getMigrationDirectory() {
    const directory = process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
    return `${directory}/database/migrations/**/*{.ts,.js}`;
}

const ormConfig: PostgresConnectionOptions = {
    type: 'postgres',
    entities: [
        UserEntity
    ],
    cli: {
        migrationsDir: 'src/database/migrations'
    },
    migrations: [getMigrationDirectory()],
    migrationsRun: true,
    ...(process.env.DATABASE_URL ?
            {
                url: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false },
            } : {
                ssl: false,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                port: Number(process.env.DB_PORT),
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
            }
    ),
};

export default ormConfig;
