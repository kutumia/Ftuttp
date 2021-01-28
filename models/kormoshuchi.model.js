module.exports = (sequelize, Sequelize) => {
    const kormoshuchi = sequelize.define("kormoshuchi", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      batch: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      topic: {
        type: Sequelize.STRING
      },
      teacher: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return kormoshuchi;
  };