module.exports = (sequelize, Sequelize) => {
    const demonstrationInitial = sequelize.define("demonstrationinitial", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      saao: {
        type: Sequelize.STRING
      },
      supply: {
        type: Sequelize.STRING
      },
      date: {
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
  
    return demonstrationInitial;
  };