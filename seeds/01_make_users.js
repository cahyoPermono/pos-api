
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'cahyo', password: '12345'},
        {username: 'dian', password: '12345'},
        {username: 'widhi', password: '12345'},
      ]);
    });
};
