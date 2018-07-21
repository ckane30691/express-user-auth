const models = require('../app/models'); // loading all repositories

// pg-promise initialization options:
const initOptions = {
    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj, dc) {
        // Database Context (dc) is mainly useful when extending multiple databases
        // with different access API-s.

        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        obj.users = new models.Users(obj, pgp);
        obj.groups = new models.Groups(obj, pgp);
    }
};

// Database connection parameters:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'UserGroupApi',
    user: 'postgres'
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);

// Create the database instance:
const db = pgp(config);

// Load and initialize optional diagnostics:
// const diagnostics = require('./diagnostics');
// diagnostics.init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;
