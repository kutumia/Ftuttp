module.exports = (sequelize, Sequelize) => {
    const trainedFarmer = sequelize.define("trainedFarmer", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      union: {
        type: Sequelize.STRING
      },
      mnum: {
        type: Sequelize.STRING
      },
      nid: {
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
  
    return trainedFarmer;
  };