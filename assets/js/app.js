// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// フェードインアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ヘッダーのスクロール効果とhide/show機能
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }

    // スクロール方向によってヘッダーを表示/非表示
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // 下にスクロール - ヘッダーを隠す
        header.classList.add('hidden');
    } else {
        // 上にスクロール - ヘッダーを表示
        header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// パーティクルエフェクト（簡単版）
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255,255,255,0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        hero.appendChild(particle);
    }
}

// 犯罪情報ページ専用のJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 犯罪カードの遅延表示とスクロールアニメーション
    initializeCrimeCards();
    
    // ステータス更新アニメーション
    initializeStatusAnimations();
    
    // アイテムカードのホバーエフェクト
    initializeItemCardEffects();
    
    // スムーズスクロール効果
    initializeSmoothScrolling();
    
    // ヘッダーのスクロール効果
    initializeHeaderScrollEffect();
});

/**
 * 犯罪カードの遅延表示とスクロールアニメーションを初期化
 */
function initializeCrimeCards() {
    const crimeCards = document.querySelectorAll('.crime-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply animations to each card
    crimeCards.forEach((card, index) => {
        // Set animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Observe for scroll animation
        observer.observe(card);
        
        // Add hover effect for better interactivity
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
}

/**
 * ステータス更新アニメーションを初期化
 */
function initializeStatusAnimations() {
    const statusElements = document.querySelectorAll('.crime-status');
    
    statusElements.forEach(status => {
        const statusText = status.textContent.trim();
        
        // 進行中の案件にパルスアニメーションを追加
        if (statusText === '進行中') {
            status.style.animation = 'pulse 2s infinite';
            
            // リアルタイム感を演出するため、時々点滅
            setInterval(() => {
                status.style.opacity = '0.7';
                setTimeout(() => {
                    status.style.opacity = '1';
                }, 150);
            }, 3000);
        }
        
        // 捜査中の案件に軽微なアニメーション
        if (statusText === '捜査中') {
            status.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            status.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

/**
 * アイテムカードのホバーエフェクトを初期化
 */
function initializeItemCardEffects() {
    const itemCards = document.querySelectorAll('.item-card');
    
    itemCards.forEach(card => {
        // マウスエンターエフェクト
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
            
            // 数量バッジにもエフェクト追加
            const quantity = this.querySelector('.item-quantity');
            if (quantity) {
                quantity.style.transform = 'scale(1.1)';
                quantity.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.4)';
            }
        });
        
        // マウスリーブエフェクト
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 3px 15px rgba(0,0,0,0.1)';
            
            const quantity = this.querySelector('.item-quantity');
            if (quantity) {
                quantity.style.transform = 'scale(1)';
                quantity.style.boxShadow = 'none';
            }
        });
        
        // クリックエフェクト
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
}

/**
 * スムーズスクロール効果を初期化
 */
function initializeSmoothScrolling() {
    // 内部リンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * ヘッダーのスクロール効果を初期化
 */
function initializeHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール方向に基づいてヘッダーを表示/非表示
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下スクロール - ヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上スクロール - ヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        // スクロール停止時のヘッダー背景変更
        clearTimeout(scrollTimeout);
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        
        scrollTimeout = setTimeout(() => {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }, 150);
        
        lastScrollTop = scrollTop;
    });
}

/**
 * 統計カードのカウントアップアニメーション
 */
function animateStatNumbers() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent.replace(/[^0-9]/g, '');
                const isPercentage = target.textContent.includes('%');
                
                if (finalNumber) {
                    animateCountUp(target, 0, parseInt(finalNumber), isPercentage);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
}

/**
 * 数値のカウントアップアニメーション
 */
function animateCountUp(element, start, end, isPercentage = false) {
    const duration = 2000;
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（ease-out）
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (range * easedProgress));
        
        element.textContent = current + (isPercentage ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * パルスアニメーションのCSS動的追加
 */
function addPulseAnimation() {
    if (!document.querySelector('#pulse-animation-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation-style';
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.02); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * レスポンシブ対応のメニュー切り替え（必要に応じて）
 */
function initializeMobileMenu() {
    // モバイルメニューが必要な場合の処理
    const navLinks = document.querySelector('.nav-links');
    const mobileBreakpoint = 768;
    
    function checkScreenSize() {
        if (window.innerWidth <= mobileBreakpoint) {
            navLinks.classList.add('mobile-nav');
        } else {
            navLinks.classList.remove('mobile-nav');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', function(e) {
    console.warn('Crime page error:', e.error);
});

// 初期化実行
document.addEventListener('DOMContentLoaded', function() {
    addPulseAnimation();
    setTimeout(animateStatNumbers, 500); // 少し遅延させて実行
    initializeMobileMenu();
});

// パフォーマンス最適化: スクロールイベントのthrottling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential external use
window.CrimesPageJS = {
    animateCountUp,
    throttle
};

// 検索機能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('crime-search');
    const resultsCount = document.getElementById('results-count');
    const crimeCards = document.querySelectorAll('.crime-card');
    const crimesListContainer = document.querySelector('.crimes-list .container');
    
    // 検索結果なしメッセージを作成
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results';
    noResultsMessage.innerHTML = '🔍 該当する犯罪情報が見つかりませんでした';
    crimesListContainer.appendChild(noResultsMessage);
    
    // 全体の犯罪数
    const totalCrimes = crimeCards.length;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        crimeCards.forEach(card => {
            const crimeName = card.querySelector('.crime-name').textContent.toLowerCase();
            
            if (searchTerm === '' || crimeName.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // 結果数を更新
        if (searchTerm === '') {
            resultsCount.textContent = `${totalCrimes}件の犯罪情報`;
        } else {
            resultsCount.textContent = `${visibleCount}件の検索結果`;
        }
        
        // 結果なしメッセージの表示/非表示
        if (visibleCount === 0 && searchTerm !== '') {
            noResultsMessage.classList.add('show');
        } else {
            noResultsMessage.classList.remove('show');
        }
    }
    
    // 検索入力時のイベント
    searchInput.addEventListener('input', performSearch);
    
    // Enterキーでも検索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 初期化
    resultsCount.textContent = `${totalCrimes}件の犯罪情報`;
});