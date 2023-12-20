const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({ // 이메일, 닉네임, 비밀번호
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10), // local이면 로컬 로그인, kakao라면 카카오 로그인 
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30), 
        allowNull: true,
    },
  }, {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
}

static associate(db) {
    db.User.hasMany(db.Post); // User 모델과 Post 모델은 1:N 관계이므로 hasMany로 연결함 
    // user.getPosts, user.addPosts 같은 관계 메서드들이 생성됨 
    db.User.belongsToMany(db.User, {// 같은 모델끼리도 N:N 관계를 가질 수 있음 
        // 같은 테이블 간 N:N 관계에서는 모델 이름과 칼럼 이름을 따로 정해야 함 -> 모델 이름이 UserUser일 순 없음 
      foreignKey: 'followingId', 
      as: 'Followers',
      through: 'Follow', // through 옵션을 통해 생성할 모델 이름을 Follow로 설정함 
    });
    db.User.belongsToMany(db.User, { 
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
    // 사용자 아이디를 저장할 경우 컬럼 이름이 둘다 UserId라면 누가 팔로워고 누가 팔로잉 중인지 구분되지 않음
    // foreignKey옵션에 followId, followingId를 넣어서 두 사용자 아이디를 구분함 
    // 같은 테이블 간의 N:N 관계에서는 as 옵션도 넣어야 함 -> 둘다 User 모델이라 구분이 되지 않기 때문
    // as는 ForignKey와 반대되는 모델을 가리킴 -> 팔로워를 찾으려면 먼저 팔로잉하는 사람의 아이디를 찾아야 하는 것 
    // as에 특정한 이름을 설정했기 때문에 user.getFollowers, user.getFollowing 관계 메서드를 사용할 수 있게 됨 
}
};