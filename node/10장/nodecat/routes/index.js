const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_URL = 'http://localhost:8002/v2';

// origin 헤더 추가
axios.defaults.headers.origin = 'http://localhost:4000';

// API 요청 함수
const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면 토큰 발급
      const tokenResult = await axios.post(`${API_URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
    }

    // API 요청
    return await axios.get(`${API_URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response.status === 419) {
      // 토큰 만료 시 토큰 재발급
      delete req.session.jwt;
      return request(req, api);
    } else {
      // 419 외의 다른 에러 처리
      return error.response;
    }
  }
};

// 내 게시물 가져오기
router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 해시태그로 검색하기
router.get('/search/:hashtag', async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
});

router.get('/', (req, res) => {
    res.render('main', { key: process.env.CLIENT_SECRET });
  });
  
module.exports = router;
