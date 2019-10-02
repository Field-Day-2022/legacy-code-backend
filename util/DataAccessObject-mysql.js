class AppDAO {
  setConnection(conn) {
    this.db = conn;
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.execute(sql, params)
        .then(result => {
          resolve(result[0][0]);
        }).catch(err => {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.execute(sql, params)
        .then(result => {
          resolve(result[0]);
        }).catch(err => {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        });
    });
  }

  all(sql, params = []) {
    console.log("DAO ALL");
    return this.run(sql, params);
  }
}

module.exports = AppDAO;
