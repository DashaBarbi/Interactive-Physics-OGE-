const canvas = document.getElementById('inductionCanvas');
const ctx = canvas.getContext('2d');
let magnetPosition = 0;
let currentDirection = null;

// Настройки симуляции
const speedSlider = document.getElementById('magnetSpeed');
speedSlider.addEventListener('input', () => updateSimulation());

// Перемещаем магнит внутрь
function moveMagnetIn() {
    if (magnetPosition === 0) {
        magnetPosition += parseInt(speedSlider.value); // увеличение глубины проникновения
        updateCurrentDirection();
        draw();
    }
}

// Выносим магнит наружу
function moveMagnetOut() {
    if (magnetPosition !== 0) {
        magnetPosition -= parseInt(speedSlider.value); // уменьшение глубины проникновения
        updateCurrentDirection();
        draw();
    }
}

// Определяем направление тока
function updateCurrentDirection() {
    const directionLabel = document.getElementById('currentDirection');
    if (magnetPosition > 0) {
        currentDirection = 'По часовой';
        directionLabel.textContent = `${currentDirection}`;
    } else if (magnetPosition < 0) {
        currentDirection = 'Против часовой';
        directionLabel.textContent = `${currentDirection}`;
    } else {
        currentDirection = 'Отсутствует';
        directionLabel.textContent = `${currentDirection}`;
    }
}

// Рисование сцены
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(50, 50, 200, 200); // Нарисовать катушку
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Магнит в центре
    let magnetX = 150;
    let magnetY = 150 - magnetPosition;
    ctx.fillStyle = '#8B0000'; // Красный цвет магнита
    ctx.fillRect(magnetX - 10, magnetY - 10, 20, 20);

    // Ток в зависимости от направления
    if (currentDirection === 'По часовой') {
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(250, 150);
        ctx.strokeStyle = '#FF0000'; // красный цвет тока
        ctx.stroke();
    } else if (currentDirection === 'Против часовой') {
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(50, 150);
        ctx.strokeStyle = '#00FF00'; // зеленый цвет тока
        ctx.stroke();
    }
}

// Запуск симуляции
updateSimulation();
draw();