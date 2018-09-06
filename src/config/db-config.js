const path = require('path')
const fs = require('fs')

module.exports = {
  development: {
    use_env_variable: 'DB_CONNECTION_URI',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    },
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    }
  },
  test: {
    use_env_variable: 'DB_CONNECTION_URI',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    },
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    }
  },
  'test-integration': {
    use_env_variable: 'TEST_DB_CONNECTION_URI',
    dialect: 'mysql',
    ssl: true,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, './db.crt.pem'))
      }
    },
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    }
  },
  production: {
    use_env_variable: 'DB_CONNECTION_URI',
    dialect: 'mysql',
    ssl: true,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, './db.crt.pem'))
      }
    },
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    },
    logging: false
  }
}
