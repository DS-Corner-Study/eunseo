const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        host: { // 인터넷 주소 
            type: Sequelize.STRING(80),
            allowNull: false,
          },
          type: { // 도메인 종류 
            type: Sequelize.ENUM('free', 'premium'), // 넣을 수 있는 값을 제한함 
            allowNull: false,
          },
          clientSecret: { // 비밀키 
            type: Sequelize.UUID,
            allowNull: false,
          },
        }, {
          sequelize,
          timestamps: true,
          paranoid: true,
          modelName: 'Domain',
          tableName: 'domains',
        });
      }
    
      static associate(db) {
        db.Domain.belongsTo(db.User);
      }
    };