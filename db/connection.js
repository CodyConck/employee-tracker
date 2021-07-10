const mysql = require('mysql2');

const dbData = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tracker_db',
    password: 'cody'
},
console.log('connected to tracker db')
);

dbData.connect(function (err) {
    if(err) throw err
});

module.exports = dbData;