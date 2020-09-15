// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/dev.sqlite3",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./prod.sqlite3",
    },
    useNullAsDefault: true,
  },
};
