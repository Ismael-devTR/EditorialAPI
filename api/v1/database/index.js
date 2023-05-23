const {Sequelize} = require("sequelize")
const config = require("../config/config.json")
const logger = require("../utils/logger")

class Database{
    constructor(){
        this.env = process.env.NODE_ENV || "development"
        this.dbConfig = config[this.env]

        this.sequelize = new Sequelize("", this.dbConfig.username, this.dbConfig.password,{
            host: this.dbConfig.host,
            dialect: this.dbConfig.dialect,
            dialectOptions:{
                multipleStatements: true
            }
        })
        this.models = {}
    }

    async connect(){
        try{
            const dbName = this.dbConfig.database

            const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${dbName};`
            await this.sequelize.query(createDatabaseQuery)

            await this.sequelize.authenticate()
            await this.sequelize.close()

            const sequelize = new Sequelize(dbName, this.sequelize.config.username, this.sequelize.config.password,{
                host: this.sequelize.config.host,
                dialect: this.dbConfig.dialect
            })

            await sequelize.sync({force: false})

            this.sequelize = sequelize
            logger.info("DATABASE CONECTION READY")

        } catch(error){
            logger.error(`SOMETHING WENT WRONG, ${error.toString()}`)
        }
    }

}

module.exports = new Database()