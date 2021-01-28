module.exports = (sequelize, Sequelize) => {
    const noa = sequelize.define("noa", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      center: {
        type: Sequelize.STRING
      },
      karjadeshDate: {
        type: Sequelize.STRING
      },
      karjadeshName: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      progress: {
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
  
    return noa;
  };