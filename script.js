document.addEventListener("DOMContentLoaded", () => {

    // 1. ПЕРЕМИКАННЯ ТЕМИ
    const themeBtn = document.getElementById('theme-toggle');
    const currentHour = new Date().getHours();

    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-theme');
            themeBtn.textContent = '☀️ Тема';
        } else {
            document.body.classList.remove('dark-theme');
            themeBtn.textContent = '🌙 Тема';
        }
    };

    // Автоматична перевірка часу
    if (currentHour >= 7 && currentHour < 21) {
        applyTheme(false); // Світла
    } else {
        applyTheme(true); // Темна
    }

    // Ручне перемикання
    themeBtn.addEventListener('click', () => {
        const isDarkNow = document.body.classList.contains('dark-theme');
        applyTheme(!isDarkNow);
    });

    // 2. LOCALSTORAGE
    const systemInfoElement = document.getElementById('system-info');
    const userAgentInfo = navigator.userAgent;
    localStorage.setItem('os_browser_info', userAgentInfo);
    
    const savedInfo = localStorage.getItem('os_browser_info');
    if (savedInfo) {
        systemInfoElement.textContent = `Ваша система: ${savedInfo}`;
    }

    // 3. FETCH API
    const commentsContainer = document.getElementById('comments-container');
    const fetchUrl = 'https://jsonplaceholder.typicode.com/posts/14/comments';

    fetch(fetchUrl)
        .then(response => {
            if (!response.ok) throw new Error('Помилка мережі');
            return response.json();
        })
        .then(comments => {
            commentsContainer.innerHTML = ''; 
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment-item');
                commentDiv.innerHTML = `
                    <strong>${comment.name}</strong>
                    <div class="comment-email">${comment.email}</div>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => {
            commentsContainer.innerHTML = `<p style="color: red;">Помилка: ${error.message}</p>`;
        });

    // 4. МОДАЛЬНЕ ВІКНО ФОРМИ
    const modal = document.getElementById('feedback-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // 60000 = 1 хвилина
    setTimeout(() => {
        modal.classList.add('show');
    }, 60000); 

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});