// 로그인한 사용자는 회원가입과 로그인 라우터에 접근하면 안됨
// 로그인하지 않은 사용자는 로그아웃 라우터에 접근하면 안됨 
// 라우터에 접근 권한을 제어하는 미들웨어가 필요함 

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // 로그인 중이면 req.isAutenticated()가 true, 그렇지 않으면 false 
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect(`/?error=${message}`);
    }
  };