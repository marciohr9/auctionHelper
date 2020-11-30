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
    entities: [ __dirname + 'src/entities/*.ts'],
    subscribers: [ __dirname + 'src/subscriber/*.ts'],
    migrations: [ __dirname + 'src/database/migration/*.ts'],
    cli:{
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}