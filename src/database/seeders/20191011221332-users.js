'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: '6e05bc57-e7e8-455d-b271-53a4222b57c0',
      name: 'Diego Modesto',
      email: 'diegosanches89@gmail.com',
      password_hash: '$2y$08$UKgenG8/wdCbk/H2YrzILOTcbRZOZqfFA.cJdSG.K3umxwz8hETqG',
      created_at: new Date,
      updated_at: new Date
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

    }
  }