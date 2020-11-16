module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    loggin: true,
    synchronize: true,
    insecureAuth : true,
    entities: [
        __dirname + '/model/*.ts'
    ],
    subscribers: [
        __dirname + '/subscriber/*.ts'
    ],
    migrations: [
        __dirname + '/migration/*.ts'
    ],
    cli:{
        entitiesDir: 'model',
        migrationsDir: 'migration',
        subscribersDir: 'subscriber'
    }
}