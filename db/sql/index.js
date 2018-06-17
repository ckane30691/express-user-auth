const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

module.exports = {
    users: {
        create: sql('users/create.sql'),
        // empty: sql('users/empty.sql'),
        update: sql('users/update.sql'),
        drop: sql('users/drop.sql'),
        add: sql('users/add.sql')
    }
};
