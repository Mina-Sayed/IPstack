const { Sequelize } = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('postgres', 'postgres', 'mina', {  
    host: 'localhost', 
    dialect: 'postgres'

});

// connerct to the database
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


// Option 2: Passing a connection URI
const sequelize1 = new Sequelize('postgres://postgres:mina@localhost:5432/postgres') // Example for postgres

// Create a Table name 'users' with 3 columns 'ip', 'os', 'userAgent'

const User = sequelize.define('users', {
    ip: {
        type: Sequelize.STRING
    },
    os: {
        type: Sequelize.STRING
    },
    userAgent: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type : Sequelize.STRING
    }

});

// Sync the table with the database
User.sync({ force: true }).then(() => {
    // Table created
    return User.create({
        ip: ' ',
        os: '',
        userAgent: '',
        city: '',
        country: ''
    });
});

// Export the table
module.exports = User;
