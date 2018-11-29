import Base from './base';
import { ts } from '../db';

class UserService extends Base {
  constructor(path = 'users') {
    super(path);
  }

  register(data) {
    const { firstName, lastName, email, password } = data;

    const newUser = {
      email,
      firstName,
      lastName,
      password,
      isLoggedIn: true
    };

    return this.create(newUser);
  }

  login(data) {
    return new Promise((resolve, reject) => {
      const { email, password } = data;
      const firstParam = {
        firstField: 'email',
        firstOperator: '==',
        firstValue: email
      };
      const secondParam = {
        secondField: 'password',
        secondOperator: '==',
        secondValue: password
      };

      this.compoundQuery(firstParam, secondParam)
        .then(snap => {
          if (snap.docs.length !== 1) {
            return reject({ error: 'no value user' });
          }

          const userId = snap.docs[0].id;

          this.update(userId, { isLoggedIn: true })
            .then(user => {
              return resolve(user);
            })
            .catch(err => {
              return reject(err);
            });
        })
        .catch(err => {
          return resolve(err);
        });
    });
  }

  logout(id) {
    // set localStorage.clear(); on component
    const change = { isLoggedIn: false };
    return this.update(id, change);
  }
}

export default new UserService();
