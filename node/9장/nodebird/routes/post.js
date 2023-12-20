const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// /post/img 라우터
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` }); // 이미지의 저장 경로 응답 
});
const upload2 = multer();

// /post 라우터 
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url, // 이미지가 있다면 이미지 주소도 전송, 이미지 자체는 /post/img 라우터에서 저장함 
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]+/g);  // 게시글을 데이터베이스에 저장한 후 게시글 내용에서 해시태그를 정규표현식으로 추출함 
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() }, // 해시태그에서 #을 떼고 소문자로 바꿈 
          })
        }),
      );
      await post.addHashtags(result.map(r => r[0])); // 결과값으로 [모델, 생성여부]를 반환, [0]으로 모델만 추출 
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;