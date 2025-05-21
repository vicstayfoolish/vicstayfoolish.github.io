/**
 * Vic的綠洲 - 互動功能JavaScript
 * 包含測驗、圖表等進階互動元素
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化測驗功能
  initQuizzes();
  
  // 初始化圖表
  initCharts();
  
  // 初始化提示框功能
  initTooltips();
});

// 測驗功能初始化
function initQuizzes() {
  const quizContainers = document.querySelectorAll('.quiz-container');
  
  quizContainers.forEach(container => {
    const options = container.querySelectorAll('.quiz-option');
    const feedbackElement = container.querySelector('.quiz-feedback');
    const submitButton = container.querySelector('.quiz-submit');
    
    if (!options.length || !submitButton) return;
    
    // 為每個選項添加點擊事件
    options.forEach(option => {
      option.addEventListener('click', function() {
        // 移除其他選項的選中狀態
        options.forEach(opt => opt.classList.remove('selected'));
        // 添加當前選項的選中狀態
        this.classList.add('selected');
      });
    });
    
    // 為提交按鈕添加點擊事件
    submitButton.addEventListener('click', function() {
      const selectedOption = container.querySelector('.quiz-option.selected');
      
      if (!selectedOption) {
        if (feedbackElement) {
          feedbackElement.textContent = '請選擇一個選項';
          feedbackElement.classList.add('text-yellow-500');
          feedbackElement.classList.remove('text-green-500', 'text-red-500');
        }
        return;
      }
      
      // 獲取正確答案
      const correctAnswer = container.getAttribute('data-correct');
      const selectedAnswer = selectedOption.getAttribute('data-value');
      
      // 重置所有選項的狀態
      options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.classList.add('pointer-events-none'); // 禁用點擊
      });
      
      // 設置選中選項的狀態
      if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add('correct');
        if (feedbackElement) {
          feedbackElement.textContent = '正確！';
          feedbackElement.classList.add('text-green-500');
          feedbackElement.classList.remove('text-yellow-500', 'text-red-500');
        }
      } else {
        selectedOption.classList.add('incorrect');
        // 顯示正確答案
        const correctOption = container.querySelector(`[data-value="${correctAnswer}"]`);
        if (correctOption) correctOption.classList.add('correct');
        
        if (feedbackElement) {
          feedbackElement.textContent = '不正確，請參考正確答案';
          feedbackElement.classList.add('text-red-500');
          feedbackElement.classList.remove('text-yellow-500', 'text-green-500');
        }
      }
      
      // 禁用提交按鈕
      this.disabled = true;
    });
  });
}

// 圖表初始化
function initCharts() {
  // 尋找所有圖表容器
  const chartContainers = document.querySelectorAll('[data-chart]');
  
  chartContainers.forEach(container => {
    const chartType = container.getAttribute('data-chart');
    const canvasEl = container.querySelector('canvas');
    
    if (!canvasEl) return;
    
    // 獲取圖表數據
    let chartData;
    try {
      chartData = JSON.parse(container.getAttribute('data-chart-data') || '{}');
    } catch (e) {
      console.error('圖表數據解析錯誤:', e);
      return;
    }
    
    // 根據圖表類型創建相應的圖表
    switch (chartType) {
      case 'bar':
        createBarChart(canvasEl, chartData);
        break;
      case 'line':
        createLineChart(canvasEl, chartData);
        break;
      case 'pie':
        createPieChart(canvasEl, chartData);
        break;
      case 'radar':
        createRadarChart(canvasEl, chartData);
        break;
      default:
        console.warn('未知的圖表類型:', chartType);
    }
  });
}

// 創建條形圖
function createBarChart(canvas, data) {
  if (!window.Chart) {
    console.error('Chart.js 未載入');
    return;
  }
  
  new Chart(canvas, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          displayColors: true,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.parsed.y;
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 創建折線圖
function createLineChart(canvas, data) {
  if (!window.Chart) {
    console.error('Chart.js 未載入');
    return;
  }
  
  new Chart(canvas, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 創建餅狀圖
function createPieChart(canvas, data) {
  if (!window.Chart) {
    console.error('Chart.js 未載入');
    return;
  }
  
  new Chart(canvas, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  });
}

// 創建雷達圖
function createRadarChart(canvas, data) {
  if (!window.Chart) {
    console.error('Chart.js 未載入');
    return;
  }
  
  new Chart(canvas, {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
  });
}

// 初始化提示框
function initTooltips() {
  // 此處的tooltip已在CSS中實現，預設會顯示
  // 此函數用於後續可能的提示框擴展功能
  console.log('提示框功能已初始化');
} 