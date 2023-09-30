const { connectMongoDB } = require('../config/database/connection');
const { default: User } = require('../config/database/models/user');

const users = [new User({ name: 'tester', email: 'admin@gmail.com' })];

connectMongoDB();

users.map(async (user, i) => {
  await user.save((err, res) => {
    if (i === users.length - 1) {
      console.log('Seed done!');
    }
  });
});
