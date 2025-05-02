# 20250502 上課筆記

---
## 第一條指令

```tex
產生一個全螢幕畫布
背景顏色為1b263b
擷取攝影機的影像，正常的顯示在視窗中間
影像寬高為視窗的80%大小
請把程式寫在sketch.js

```
說明：
createCanvas(windowWidth, windowHeight)：創建全螢幕畫布。
background('#1b263b')：設定背景顏色為深藍色。
createCapture(VIDEO)：啟用攝影機，並擷取影像。
capture.size(windowWidth * 0.8, windowHeight * 0.8)：設定影像寬高為視窗的 80%。
image(capture, x, y, capture.width, capture.height)：將攝影機影像繪製在畫布上，並置中顯示。
windowResized：當視窗大小改變時，重新調整畫布和影像大小。

```javascript=
let capture;

function setup() {
  // 創建全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色
  background('#1b263b');
  
  // 啟用攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
  // 設定背景顏色
  background('#1b263b');
  
  // 計算影像顯示位置 (置中)
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 繪製攝影機影像
  image(capture, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}

```
---
## 第二條指令

```tex!
攝影機顯示的畫面左右顛倒，請調整
```
調整的部分：
push() 和 pop()：用於保存和恢復繪圖狀態，避免影響其他繪圖操作。
translate(x + capture.width, y)：將繪圖原點移動到影像的右上角。
scale(-1, 1)：水平翻轉影像。

```javascript=
let capture;

function setup() {
// 創建全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色
  background('#1b263b');
  
  // 啟用攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
// 設定背景顏色
  background('#1b263b');
  
  // 計算影像顯示位置 (置中)
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 翻轉影像
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
}

```

---
## 第三條指令

```tex!
利用 createGraphics 產生一個與攝影機畫面相同大小的圖形，
並將該圖形顯示在視訊畫面的上方：
```
說明：
createGraphics：用於創建一個與視訊畫面相同大小的圖形緩衝區，該圖形可以用來繪製自定義內容。
videoGraphics.background：設定圖形的背景顏色，這裡使用半透明紅色。
videoGraphics.text：在圖形上繪製文字，這裡顯示 "Video Overlay"。
image(videoGraphics, x, y - capture.height)：將圖形顯示在視訊畫面的上方。
windowResized：當視窗大小改變時，重新調整 videoGraphics 的大小

```javascript=
let capture;
let videoGraphics;

function setup() {
  // 創建全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色
  background('#b8bedd');
  
  // 啟用攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像
  
  // 創建與視訊畫面相同大小的圖形
  videoGraphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 設定背景顏色
  background('#b8bedd'); // 更改背景顏色為 #b8bedd
  
  // 計算影像顯示位置 (置中)
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;
  
  // 在 videoGraphics 上繪製內容 (這裡可以自定義內容)
  videoGraphics.background(255, 0, 0, 100); // 半透明紅色背景
  videoGraphics.fill(255);
  videoGraphics.textSize(32);
  videoGraphics.textAlign(CENTER, CENTER);
  videoGraphics.text('Video Overlay', videoGraphics.width / 2, videoGraphics.height / 2);
  
  // 顯示 videoGraphics 圖形在視訊畫面上方
  image(videoGraphics, x, y - capture.height); // 顯示在視訊畫面上方
  
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
  videoGraphics = createGraphics(capture.width, capture.height); // 重新調整圖形大小
}

```
---
## 第四條指令
```tex!
把graphics的背景顏色為黑色，graphics在寬與高切成每隔20為一個單位，在每個單位內產生一個寬高為15的圓，圓的顏色採用capture，相對位置的顏色
```
說明：
videoGraphics.background(0)：將 videoGraphics 的背景設為黑色。
capture.get(i, j)：從攝影機畫面中取得 (i, j) 位置的顏色。
videoGraphics.ellipse(i + 10, j + 10, 15, 15)：在每個單位格的中心繪製一個寬高為 15 的圓形。
間隔 20：圓形的排列間隔為 20，確保圓形之間有間距。
這樣，videoGraphics 上會顯示由攝影機畫面顏色填充的圓形圖案，並且排列整齊地顯示在視訊畫面的上方。

```javascript=
let capture;
let videoGraphics;

function setup() {
  // 創建全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定背景顏色
  background('#b8bedd');
  
  // 啟用攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像
  
  // 創建與視訊畫面相同大小的圖形
  videoGraphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 設定背景顏色
  background('#b8bedd'); // 更改背景顏色為 #b8bedd
  
  // 確保 capture.width 和 capture.height 正確
  let videoWidth = capture.width;
  let videoHeight = capture.height;

  // 計算影像顯示位置 (置中)
  let x = (width - videoWidth) / 2;
  let y = (height - videoHeight) / 2;
  
  // 在 videoGraphics 上繪製內容
  videoGraphics.background(0); // 設定背景為黑色
  
  // 循環繪製圓形
  for (let i = 0; i < videoGraphics.width; i += 20) {
    for (let j = 0; j < videoGraphics.height; j += 20) {
      // 從攝影機畫面取得顏色
      let col = capture.get(i, j);
      videoGraphics.fill(col);
      videoGraphics.noStroke();
      videoGraphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓形，置中於單位格
    }
  }
  
  // 顯示 videoGraphics 圖形，覆蓋在攝影機畫面上
  image(videoGraphics, x, y, videoWidth, videoHeight); // 覆蓋在攝影機畫面上
  
  // 翻轉影像並顯示攝影機畫面
  push();
  translate(x + videoWidth, y); // 移動到影像的右上角
  scale(-1, 1); // 水平翻轉影像
  image(capture, 0, 0, videoWidth, videoHeight);
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  videoGraphics = createGraphics(capture.width, capture.height); // 重新調整圖形大小
}

```
---
## 第五條指令
```
graphics顯示的畫面會左右顛倒，幫我修正
```
修正點：
翻轉 graphics 的內容：

在更新 graphics 的內容時，使用 graphics.push() 和 graphics.pop() 包裹翻轉操作。
使用 graphics.translate(graphics.width, 0) 將原點移到右側。
使用 graphics.scale(-1, 1) 進行水平翻轉。
其他功能保持不變：

背景顏色仍為 #b8bedd。
圓圈基於攝影機畫面的顏色繪製，並覆蓋在攝影機畫面上。
測試步驟：
執行程式後，檢查 graphics 的內容是否正確顯示，且不再左右顛倒。
確保攝影機畫面和圓圈仍然正確顯示在畫布上。
