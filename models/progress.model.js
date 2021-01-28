module.exports = (sequelize, Sequelize) => {
    const progress = sequelize.define("progress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      district: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      nirmanPresent: {
        type: Sequelize.STRING
      },
      nirmanComment: {
        type: Sequelize.STRING
      },
      proshikkhonPresent: {
        type: Sequelize.STRING
      },
      proshikkhonComment: {
        type: Sequelize.STRING
      },
      prodorshoniPresent: {
        type: Sequelize.STRING
      },
      prodorshoniComment: {
        type: Sequelize.STRING
      },
      car: {
        type: Sequelize.STRING
      },
      ad_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return progress;
  };