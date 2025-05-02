let capture;
let graphics;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  background('#b8bedd'); // 保留原本的背景顏色 #b8bedd
  
  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定攝影機大小為視窗的 80%
  capture.hide(); // 隱藏原始攝影機影像
  
  // 建立與攝影機畫面相同大小的圖形
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 設定背景顏色
  background('#b8bedd'); // 保留原本的背景顏色 #b8bedd
  
  // 計算影像的顯示位置 (置中)
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < capture.width; i += 20) {
    for (let j = 0; j < capture.height; j += 20) {
      // 從攝影機影像中取顏色
      let col = capture.get(i, j);
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓形
    }
  }
  
  // 顯示 graphics 圖形，覆蓋在攝影機畫面上
  image(graphics, x, y, capture.width, capture.height);
  
  // 翻轉影像並顯示攝影機畫面
  push();
  translate(x + capture.width, y); // 移動到影像的右上角
  scale(-1, 1); // 水平翻轉影像
  image(capture, 0, 0, capture.width, capture.height);
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  graphics = createGraphics(capture.width, capture.height); // 重新調整圖形大小
}
