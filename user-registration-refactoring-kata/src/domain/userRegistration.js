import orm from '../infrastructure/userOrmRepository';
import InvalidPasswordError from './InvalidPasswordError';
import EmailAlreadyInUseError from './EmailAlreadyInUseError';

function userRegistration(sendEmail) {
  return async function createUser(password, name, email) {
    if (password.length <= 8 || !password.includes('_')) {
      throw new InvalidPasswordError();
    }
    if (orm.findByEmail(email) !== undefined) {
      throw new EmailAlreadyInUseError();
    }

    const user = {
      id: Math.floor(Math.random() * 99999),
      name: name,
      email: email,
      password: password,
    };

    orm.save(user);
    await sendEmail({
      from: 'noreply@codium.team',
      to: email,
      subject: 'Welcome to Codium',
      body: '<h1>This is the confirmation email</h1>',
    });

    return user;
  };
}

export default userRegistration;
