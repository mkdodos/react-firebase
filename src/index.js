import ReactDOM from 'react-dom/client';

// root 對應 index.html 的 div id="root"
const container = document.getElementById('root');
// 在 root div 建立 react dom
const root = ReactDOM.createRoot(container);
// render 內放置 html 內容
root.render(
  <h1>由 react dom 建立的內容12</h1>
);