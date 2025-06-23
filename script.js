// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 检查本地存储或系统偏好
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// 切换主题
themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// 轮播图功能
const slider = document.querySelector('.slider-inner');
const slides = document.querySelectorAll('.slider-item');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

let currentIndex = 0;
const slideCount = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

// 自动轮播
let slideInterval = setInterval(nextSlide, 5000);

// 鼠标悬停时暂停自动轮播
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

heroSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// 按钮事件
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// 指示点事件
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// 动态内容
document.addEventListener('DOMContentLoaded', function() {
    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('感谢你的留言！我会尽快回复你。');
        contactForm.reset();
    });
    
    // 滚动动画
    const animateElements = document.querySelectorAll('.timeline-item, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// 图片模态框功能
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
    
    // 禁用滚动
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
    
    // 恢复滚动
    document.body.style.overflow = "auto";
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}

// 添加滚动时导航栏效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            nav.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    } else {
        nav.style.boxShadow = 'none';
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            nav.style.background = 'rgba(17, 24, 39, 0.9)';
        }
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// AI聊天机器人功能
const chatbotLauncher = document.getElementById('chatbotLauncher');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

let isChatbotOpen = false;

// 切换聊天机器人显示/隐藏
function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    if (isChatbotOpen) {
        chatbotContainer.classList.add('active');
        chatbotLauncher.style.opacity = '0';
        chatbotInput.focus();
    } else {
        chatbotContainer.classList.remove('active');
        chatbotLauncher.style.opacity = '1';
    }
}

chatbotLauncher.addEventListener('click', toggleChatbot);
chatbotToggle.addEventListener('click', toggleChatbot);

// 添加消息到聊天界面
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// 显示"正在输入"指示器
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <span>AI正在输入</span>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatbotBody.appendChild(typingDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// 隐藏"正在输入"指示器
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 模拟AI响应 (实际应用中应替换为真实的API调用)
async function getAIResponse(userMessage) {
    // 这里应该替换为真实的API调用
    // 示例中使用模拟响应
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // 根据用户问题提供不同的响应
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('你好') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
        return "你好！我是李好好的AI助手，很高兴和你聊天！";
    } else if (lowerMessage.includes('专业') || lowerMessage.includes('区块链')) {
        return "李好好的专业是区块链工程，这是一个新兴的技术领域，专注于分布式账本技术和智能合约开发。";
    } else if (lowerMessage.includes('爱好') || lowerMessage.includes('兴趣')) {
        return "李好好有很多爱好，包括阅读、音乐剧、绘画和美食。她特别喜欢古典文学和现代科技书籍。";
    } else if (lowerMessage.includes('学校') || lowerMessage.includes('三亚学院')) {
        return "李好好就读于三亚学院盛宝金融科技商学院，学习区块链工程专业。";
    } else if (lowerMessage.includes('年龄') || lowerMessage.includes('多大')) {
        return "李好好今年19岁，生日是2005年8月30日。";
    } else if (lowerMessage.includes('作品') || lowerMessage.includes('项目')) {
        return "李好好有几个有趣的项目，包括AI聊天助手、盛宝学院网站设计和哈希应用。你可以在作品集部分查看更多详情。";
    } else if (lowerMessage.includes('偶像') || lowerMessage.includes('王一博')) {
        return "李好好的偶像是王一博，她欣赏他的才华和努力。你可以在主页轮播图中看到相关内容。";
    } else {
        // 默认响应 - 在实际应用中，这里应该调用AI API
        const responses = [
            "这是一个有趣的问题！李好好可能会说她对这方面很感兴趣。",
            "我不太确定如何回答这个问题，但李好好的网站上可能有相关信息。",
            "作为AI助手，我还在学习中，可能无法完全回答这个问题。",
            "李好好的专业领域是区块链技术，也许你可以问她相关的问题。",
            "你可以尝试问一些关于区块链、编程或者李好好兴趣爱好方面的问题。"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// 处理用户发送消息
async function handleUserMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // 添加用户消息
    addMessage(message, true);
    chatbotInput.value = '';
    
    // 显示"正在输入"指示器
    showTypingIndicator();
    
    try {
        // 获取AI响应
        const aiResponse = await getAIResponse(message);
        
        // 隐藏"正在输入"指示器并添加AI响应
        hideTypingIndicator();
        addMessage(aiResponse, false);
    } catch (error) {
        hideTypingIndicator();
        addMessage("抱歉，我暂时无法处理您的请求。请稍后再试。", false);
        console.error("AI请求错误:", error);
    }
}

// 发送按钮点击事件
chatbotSend.addEventListener('click', handleUserMessage);

// 输入框回车事件
chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// 点击聊天头部也可以最小化
chatbotHeader.addEventListener('click', function() {
    if (isChatbotOpen) {
        toggleChatbot();
    }
});

// 初始化时间轴动画
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // 联系表单动画
    const contactForm = document.querySelector('.contact-form');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    contactObserver.observe(contactForm);
});