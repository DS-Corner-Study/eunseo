// 로그인 전략 
// passport-local 모듈에서 Strategy 생성자를 불러와 그 안에 전략을 구현하면 됨

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');
module.exports = () => {

  passport.use(new LocalStrategy({
    // localStartegy 생성자의 첫번째 인수로 주어진 객체는 전략에 관한 설정을 함 
    usernameField: 'email', // 일치하는 로그인 라우터의 req.body 속성명을 적으면 됨 
    passwordField: 'password',

    // 실제 전략을 수행하는 async 함수 - 2번째 인수 
    // 첫번째 인수에 넣어준 값이 두번째의 매개변수가 됨 
    // 3번째 매개변수인 done 함수는 passport, authenticate 의 콜백 함수
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } }); // 사용자 데이터베이스에서 일치하는 이메일이 있는지를 확인 
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password); // bcrypt의 compare 함수로 비밀번호를 비교 
        if (result) {
          done(null, 
            // done - 서버 쪽에서 에러가 난 경우
            exUser); // 비밀번호까지 일치한다면 done 함수의 두번째 인수로 사용자 정보를 넣어 보냄 
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); // 3번째 인수 : 사용자 정의 에러 
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
//done(서버에러, User 객체, 사용자정의 에러) = passport.authenticate('local(authError, user, info)=>{})
// done이 호출된 후에는 다시 passport.authenticate의 콜백 함수에서 나머지 로직이 실행됨 
// 로그인에 성공했다면 메인 페이지로 리아기엑트되면서 로그인 폼 대신 회원 정보가 뜸 