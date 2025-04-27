document.addEventListener('DOMContentLoaded', () => {
      const startBtn = document.getElementById('startBtn');
      const timeBtn = document.getElementById('timeBtn');
      const timer = document.getElementById('timer');
      const imageContainer = document.getElementById('imageContainer');
      const brushSize = document.getElementById('brushSize');
      const canvas = document.getElementById('drawingCanvas');
      const ctx = canvas.getContext('2d');
    
      let isRunning = false;
      let countdown;
      let currentTime = 45;
      let time = 45;
    
      function initCanvas() {
        canvas.width = 600;
        canvas.height = 250;
        clearCanvas();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    
      function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    
      const images = [
        {url: 'img/1.jpg', title: ' '},
        {url: 'img/2.jpg', title: ' '},
        {url: 'img/3.jpg', title: ' '},
        {url: 'img/4.jpg', title: ' '},
        {url: 'img/5.jpg', title: ' '},
        {url: 'img/6.jpg', title: ' '},
        {url: 'img/7.jpg', title: ' '},
        {url: 'img/8.jpg', title: ' '},
        {url: 'img/9.jpg', title: ' '},
        {url: 'img/10.jpg', title: ' '}
    ];
    
      startBtn.addEventListener('click', startDrawingSession);
      timeBtn.addEventListener('click', toggleTimer);
      brushSize.addEventListener('input', updateBrushSize);
    
      function startDrawingSession() {
        if(isRunning) {
          clearInterval(countdown);
          clearCanvas();
          isRunning = false;
          brushSize.disabled = true;
          return;
        }
    
        isRunning = true;
        brushSize.disabled = false;
        currentTime = time;
        timer.textContent = currentTime;
        showRandomImage();
        startCountdown();
      }
    
      function toggleTimer() {
        if(isRunning) return;
        time = time === 45 ? 35 : 45;
        timer.textContent = time;
        currentTime = time;
      }
    
      function showRandomImage() {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        imageContainer.innerHTML = `
          <div class="image-title">${randomImage.title}</div>
          ${randomImage.url !== '#' ? `<img src="${randomImage.url}" alt="${randomImage.title}">` : ''}
        `;
      }
    
      function startCountdown() {
        countdown = setInterval(() => {
          currentTime--;
          timer.textContent = currentTime;
          if(currentTime <= 0) {
            clearInterval(countdown);
            isRunning = false;
            brushSize.disabled = true;
            setTimeout(() => alert("Время вышло!"), 50);
          }
        }, 1000);
      }
    
      function updateBrushSize() {
        ctx.lineWidth = this.value;
      }
    
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
    
      function getCanvasCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
      }
    
      canvas.addEventListener('mousedown', (e) => {
        if(!isRunning) return;
        isDrawing = true;
        const pos = getCanvasCoordinates(e);
        [lastX, lastY] = [pos.x, pos.y];
      });
    
      canvas.addEventListener('mousemove', (e) => {
        if(!isDrawing || !isRunning) return;
        const pos = getCanvasCoordinates(e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        [lastX, lastY] = [pos.x, pos.y];
      });
    
      canvas.addEventListener('mouseup', () => isDrawing = false);
      canvas.addEventListener('mouseout', () => isDrawing = false);
    
      initCanvas();
    });
    