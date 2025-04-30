const db = require('./db');

class Venta {
  static create(data, callback) {
    db.query('INSERT INTO ventas SET ?', data, callback);
  }

  static getAll(callback) {
    db.query('SELECT * FROM ventas', callback);
  }
}

module.exports = Venta;
