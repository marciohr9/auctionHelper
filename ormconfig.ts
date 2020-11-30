module.exports = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    loggin: true,
    migrationsTableName: '_migrations',
    synchronize: false,
    entities: ['src/model/*.entity.ts'],
    subscribers: ['src/subscriber/*.ts'],
    migrations: ['src/database/migration/*.ts'],
    cli:{
        entitiesDir: 'src/model',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}