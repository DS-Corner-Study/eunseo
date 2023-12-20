const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(15), // 태그 이름 저장 
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Hashtag',
      tableName: 'hashtags',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // HashTag 모델은 POst 모델과 N:N 관계 
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
};

// NodeBird의 모델은 직접 생성한 User, HashTag, Post 와 
// 시퀼라이즈가 관계를 파악하며 생성한 PostHashtag, Follow 총 5개임 