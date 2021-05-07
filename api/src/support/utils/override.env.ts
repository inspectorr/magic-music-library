function overrideEnv() {
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
        console.info('.env.local file used successfully.');
    } catch (e) {
        console.info('No local .env.local file used.');
    }
}

export default overrideEnv;
