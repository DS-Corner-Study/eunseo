const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy'); // 로그인 시 실행
const User = require('../models/user'); // 매 요청 시 실행됨

// req.session(세션) 객체에 어떤 데이터를 저장할 지 정하는 메서드
module.exports = () => {
  passport.serializeUser((user, done) => { // 매개변수로 user을 받고 나서
    done(null, user.id); // done 함수에 두번째 인수로 user.id 넘김, 첫번째 인수는 에러 발생 시 사용
    // 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성에 문제가 발생하므로 사용자의 아이디만 저장 
});

// serializerUser의 done의 두번째 인수로 넣었던 데이터가 deserializerUser의 매개변수가 됨
passport.deserializeUser((id, done) => { // 사용자의 아이디를 받음 
  User.findOne({ where: { id } })
    .then(user => done(null, user)) // done의 두번째 인자는 저장하고 싶은 데이터->사용자 아이디 
    .catch(err => done(err));
});

//  serializeUser는 사용자 정보 객체를 세션에 아이디로 저장하는 것
// deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것

/*
--로그인--

1. 라우터를 통해 로그인 요청이 들어옴

2. 라우터에서 passport.authenticate 메서드 호출

3. 로그인 전략 수행

4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출

5. req.login 메서드가 passport.serializeUser 호출

6. req.session에 사용자 아이디만 저장

7. 로그인 완료

--로그인 이후--

1. 요청이 들어옴

2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출

3. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회

4. 조회된 사용자 정보를 req.user에 저장

5. 라우터에서 req.user 객체 사용 가능
*/
local();
kakao();

passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id }, // 세션에 저장된 아이디로 사용자 정보를 조회할 때 팔로잉 목록과 팔로워 목록도 같이 조회
      include: [{
        model: User,
        attributes: ['id', 'nick'], // attributes 지정 -> 실수로 비밀번호를 조회하는 것을 방지함 
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

};