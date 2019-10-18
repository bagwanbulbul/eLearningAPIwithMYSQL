var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'navgurukul',
      database: 'saralData'
    },
    pool: { min: 0, max: 7 }
  })
knex.schema.createTable('courseList', (table) => {
    table.increments('courseId')
    table.string('courseName')

})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
