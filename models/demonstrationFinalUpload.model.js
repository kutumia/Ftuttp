module.exports = (sequelize, Sequelize) => {
    const demonstrationFinalUpload = sequelize.define("demonstrationFinalupload", {
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
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return demonstrationFinalUpload;
  };