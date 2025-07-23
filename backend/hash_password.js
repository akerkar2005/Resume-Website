import bcrypt from 'bcrypt';

// Read password from environment variable
const password = process.env.PASSWORD_TO_HASH;
const saltRounds = 12;

if (!password) {
  throw new Error('Environment variable PASSWORD_TO_HASH is not set.');
}

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});
