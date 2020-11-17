module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    loggin: true,
    synchronize: false,
    migrationsTableName: 'actionhelper_migrations',
    entities: [
        __dirname + '/src/model/*.entity.ts'
    ],
    subscribers: [
        __dirname + '/src/subscriber/*.ts'
    ],
    migrations: [
        __dirname + '/src/migration/*.ts'
    ],
    cli:{
        entitiesDir: 'src/model',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}