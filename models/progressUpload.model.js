module.exports = (sequelize, Sequelize) => {
    const progressUpload = sequelize.define("progressupload", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      title: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      ad_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return progressUpload;
  };