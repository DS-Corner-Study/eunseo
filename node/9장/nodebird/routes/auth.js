const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// app.js와 연결할 때 /auth 접두사를 붙일 것이므로, 라우터의 주소넌 /auth/join, /auth/login, /auth/logout이 됨 

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } }); // 기존에 같은 이메일로 가입한 사용자가 있는지 조회
    if (exUser) {
      return res.redirect('/join?error=exist'); // 있다면 회원가입 페이지로 도될림 
    }
    const hash = await bcrypt.hash(password, 12); // 없다면 비밀번호를 암호화하고 사용자 정보를 생성 
    await User.create({ // 프로미스를 지원하는 함수이기 때문에 await을 사용 
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 로그인 
router.post('/login', isNotLoggedIn, (req, res, next) => { 
    // authenticate 미들웨어 = 로컬 로그인 전략 
    // 미들웨어 내에 미들웨어 -> 미들웨어에 사용자 정의 기능 추가, req, res,next 인수로 지정하면 됨 
    // 로그인 전략이 실패한다면 authenticate메서드의 콜백 함수가 실행됨 
  passport.authenticate('local', (authError, user, info) => { // 로컬 로그인 전략 
    if (authError) { // 첫번째 매개변수 값이 있다면 실패한 것 
      console.error(authError);
      return next(authError);
    }
    if (!user) { 
      return res.redirect(`/?loginError=${info.message}`);
    }
    // 두번째 맥변수 값이 있다면 성공
    return req.login(user, (loginError) => { // req.login 메서드 추가 -> req.login는 passport.erializeUser 호출 
        // user 객체가 넘어감 
      if (loginError) {
        console.error(loginError);
        return next(loginError);
    }
    return res.redirect('/');
  });
})(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

// 러그아웃 라우터
router.get('/logout', isLoggedIn, (req, res) => { 
req.logout(); // req.logout 메서드는 req.user 객체를 제거함 
req.session.destroy(); // req.session 객체의 내용을 제거함 
res.redirect('/'); // 세션 정보를 지운 메인 페이지로 되돌아감 
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

// passport.autenticate 메서드에 콜백함수를 제공하지 않음
// 카카오 로그인 성공 시 내부적으로 req.login을 호출함 
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/', // 실패했을 경우 로이동할 경로  
}), (req, res) => {
  res.redirect('/'); // 성공 시에 어디로 이동할지를 적음 
});

module.exports = router;