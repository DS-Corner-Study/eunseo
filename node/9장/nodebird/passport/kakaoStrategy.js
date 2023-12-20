const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy; // 모듈로부터 생성자를 불러와 전략 구현 

const User = require('../models/user');

module.exports = () => {

  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디 
    callbackURL: '/auth/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소 

  }, async (accessToken, refreshToken, profile, done) => { 
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' }, // 기존에 카카오를 통해 회원가입한 사용자가 있는지 조회 
      });
      if (exUser) {
        done(null, exUser); // 있다면 이미 회원가입되어 있는 경우이므로 사용자 정보오 함께 done 함수를 호출하고 종료 

      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account_email,
          nick: profile.displayName,
          snsId: profile.id, // profile 객체에서 원하는 정보를 꺼내서 회원가입 
          provider: 'kakao',
        });
        done(null, newUser); // done 호출 
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
}));
};