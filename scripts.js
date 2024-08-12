document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode switch function
    const toggleButton = document.getElementById('theme-toggle-button');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Light Mode';
        toggleButton.classList.add('light-mode');
    }

    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        toggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        toggleButton.classList.toggle('light-mode');
        localStorage.setItem('theme', theme);
    });

    // Function to load blog post
    const blogList = document.getElementById('blog-list');

    if (blogList) {
        fetch('posts.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('blog-post');

                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p><em>${post.date}</em></p>
                        <p>${post.content}</p>
                    `;

                    blogList.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error loading blog posts:', error));
    }
});
