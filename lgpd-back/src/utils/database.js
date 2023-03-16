import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'lgpd-database', //db-name
    'postgres', //db-usermane
    'postgres', //db-password
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        define:{
            timestamps: false
        }
    });

export default sequelize;