const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mvpapp',
    debug: true
  }
});

knex.schema.createTable('users', function (table) {
  table.increments('id');
  table.string('firstName');
  table.string('lastName');
  table.string('email');
  table.boolean('verifier');
  table.boolean('creator');
  table.timestamps();
}).then(() => {
  console.log('Users table created');
});

knex.schema.createTable('projects', function (table) {
  table.increments('id');
  table.string('projectName');
  table.text('descrption');
}).then(() => {
  console.log('Projects table created');
});

knex.schema.createTable('usersProjects', function (table) {
  table.increments('id');
  table.integer('projectId');
  table.integer('creatorId');
  table.integer('verifierId');
  table.boolean('verified');
}).then(() => {
  console.log('Projects table created');
});



//export default knex;