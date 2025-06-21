// 貓貓戰爭臉2025東京自由行網站功能

// 夜間模式切換
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('theme-btn');

    // 檢查是否有儲存的主題偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '切換日間模式';
    }

    // 主題切換功能
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '切換日間模式';
        } else {
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '切換夜間模式';
        }
    });

    // 平滑捲動功能
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // 動態添加當前瀏覽區域的高亮
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Google Maps 連結處理
function openGoogleMaps(url) {
    window.open(url, '_blank');
}

// 預算計算器功能
class BudgetCalculator {
    constructor() {
        this.exchangeRate = 0.25; // 1日圓 = 0.25新台幣 (約略值)
        this.budgets = {
            day1: { transport: 2570, food: 2500, shopping: 1000 },
            day2: { transport: 500, food: 2000, shopping: 4000 },
            day3: { transport: 500, food: 2500, shopping: 6000 },
            day4: { transport: 1000, food: 2500, shopping: 3000 },
            day5: { transport: 2570, food: 2000, shopping: 2000 }
        };
    }

    getTotalBudget() {
        let total = 0;
        for (const day in this.budgets) {
            const dayBudget = this.budgets[day];
            total += dayBudget.transport + dayBudget.food + dayBudget.shopping;
        }
        return total;
    }

    getTotalBudgetNTD() {
        return this.getTotalBudget() * this.exchangeRate;
    }

    getDailyBudget(day) {
        const dayBudget = this.budgets[day];
        if (!dayBudget) return 0;
        return dayBudget.transport + dayBudget.food + dayBudget.shopping;
    }
}

// 初始化預算計算器
const budgetCalc = new BudgetCalculator();
console.log(`總預算 (日圓): ¥${budgetCalc.getTotalBudget()}`);
console.log(`總預算 (新台幣): NT$${budgetCalc.getTotalBudgetNTD()}`);