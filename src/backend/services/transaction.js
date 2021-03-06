import Base from './base';

class TransactionService extends Base {
  constructor(path = 'transactions') {
    super(path);
  }

  pay(payment) {
    return this.create(payment);
  }

  getAll(userId) {
    const params = {
      field: 'userId',
      operator: '==',
      value: userId
    };

    // front end must deal with snapshot
    return this.query(params);
  }
}

export default new TransactionService();
