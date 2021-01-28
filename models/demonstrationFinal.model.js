module.exports = (sequelize, Sequelize) => {
    const demonstrationFinal = sequelize.define("demonstrationfinal", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      bdate: {
        type: Sequelize.STRING
      },
      kdate: {
        type: Sequelize.STRING
      },
      folon: {
        type: Sequelize.STRING
      },
      bij: {
        type: Sequelize.STRING
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
  
    return demonstrationFinal;
  };