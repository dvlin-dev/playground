const express = require('express');
const app = express();

// 设置模板引擎
app.engine("art", require("express-art-template"));

// 设置模板的路径
app.set('views', __dirname + '/views');

app.set('view engine', 'art');

app.get('/', (_req, res) => {
    res.render('index', {
        title: 'Hello SSR',
        message: 'good good'
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});