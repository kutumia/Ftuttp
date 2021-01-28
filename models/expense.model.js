module.exports = (sequelize, Sequelize) => {
    const expense = sequelize.define("expense", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      code: {
        type: Sequelize.STRING
      },
      khat: {
        type: Sequelize.STRING
      },
      boraddo: {
        type: Sequelize.INTEGER
      },
      expense: {
        type: Sequelize.INTEGER
      },
      baki: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return expense;
  };