/**
 * Vic的綠洲 - 通用JavaScript功能
 * 包含全站共用的基本互動效果
 */

// 移動裝置選單切換
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // 導航鏈接添加活躍狀態
  const navLinks = document.querySelectorAll('.nav-link');
  const currentUrl = window.location.href;
  
  navLinks.forEach(link => {
    if (link.href === currentUrl || currentUrl.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
  
  // 回到頂部按鈕
  const topButton = document.getElementById('top-button');
  
  if (topButton) {
    // 當用戶滾動超過200px時顯示按鈕
    window.addEventListener('scroll', function() {
      if (window.scrollY > 200) {
        topButton.classList.add('visible');
        topButton.classList.remove('hidden');
      } else {
        topButton.classList.add('hidden');
        topButton.classList.remove('visible');
      }
    });
    
    // 點擊按鈕時滾動到頂部
    topButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // 初始化手風琴/折疊面板
  initAccordions();
});

// 初始化手風琴/折疊面板
function initAccordions() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      
      // 切換當前面板狀態
      content.classList.toggle('open');
      
      // 更新圖標
      const icon = this.querySelector('i');
      if (icon) {
        if (content.classList.contains('open')) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-minus');
        } else {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      }
    });
  });
} 