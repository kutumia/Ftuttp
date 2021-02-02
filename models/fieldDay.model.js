module.exports = (sequelize, Sequelize) => {
    const fieldDay = sequelize.define("fieldday", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      crop: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return fieldDay;
  };