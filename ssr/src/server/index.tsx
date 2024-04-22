import Koa from 'koa';
import { renderToString } from 'react-dom/server';
import App from '../App';

const app = new Koa();

app.use(async (ctx) => {
    const html = renderToString(<App />);
    ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>React SSR Example</title>
    </head>
    <body>
      <div id="root">${html}</div>
    </body>
    </html>
  `;
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
