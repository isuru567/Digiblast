document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.links');

    function setActiveLink() {
        const currentUrl = window.location.href;

        navLinks.forEach(link => {
            link.classList.remove('active'); 

            const linkUrl = link.href;

            
            if (currentUrl === linkUrl) {
                link.classList.add('active');
            } 
            
            else if (currentUrl.includes(linkUrl) && !currentUrl.includes('#') && !linkUrl.includes('#')) {
                link.classList.add('active');
            }
        });
    }

    
    setActiveLink();

    
    window.addEventListener('hashchange', setActiveLink);

    // Hamburger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});