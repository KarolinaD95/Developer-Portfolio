// Type-like functionality 
document.addEventListener("DOMContentLoaded", () => {
    const text = "Frontend developer, Web developer, SEO specialist.";
    const typingContainer = document.querySelector(".type-header");
    let index = 0;

    function type() {
        if (index < text.length) {
            typingContainer.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); 
        }
    }

    type();
});

// Random place switching for icons
function switchPlaces() {
    const columns = document.querySelectorAll('.tech-icons > div');
    let icons = [];
    columns.forEach(column => {
        icons.push(...Array.from(column.children));
    });
    icons.sort(() => Math.random() - 0.5);
    columns.forEach(column => {
        while (column.firstChild) {
            column.removeChild(column.firstChild);
        }
    });
    icons.forEach((icon, index) => {
        const column = columns[index % columns.length];
        column.appendChild(icon);
        icon.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
        setTimeout(() => {
            icon.style.transform = '';
        }, 500);
    });
}

setInterval(switchPlaces, 5000); 

// Scroll to top
document.querySelector('.to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
