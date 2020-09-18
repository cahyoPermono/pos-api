// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/dbFile/dev.sqlite3",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/dbFile/prod.sqlite3",
    },
    useNullAsDefault: true,
  },
};
