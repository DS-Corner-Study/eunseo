const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({ // 게시글 등록자의 아이디를 담은 칼럼은 관계를 설정할 때 시퀼라이즈가 알아서 생성함 
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {

    db.Post.belongsTo(db.User); // user모델과 1:N 관계이므로 belongsTo로 연결 
    // 시퀼라이즈는 Post 모델에 User 모델의 id를 가리키는 UserId 컬럼을 추가함 (각각의 게시글에 주인이 무엇인지)
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // Post 모델과 Hashtag 모델은 N:N 관계임 
    // PostHashTag라는 중간 모델이 생기고, PostId와 hastTagId라는 ForeignKey도 추가됨 
  
  }
};