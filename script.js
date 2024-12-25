// Dynamically highlight the active section in navigation
function setActiveNavLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active')); // Remove active class from all links

    const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename
    if (currentPage === 'about.html') {
        document.getElementById('about-link').classList.add('active');
    } else {
        document.getElementById('illustration-link').classList.add('active');
    }
}

// Set the active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Modal Variables
const modal = document.createElement('div');
modal.id = 'modal';
modal.innerHTML = `
    <span class="close">&times;</span>
    <span class="prev">&#8249;</span>
    <img src="" alt="Artwork">
    <span class="next">&#8250;</span>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('img');
const closeModal = modal.querySelector('.close');
const prevButton = modal.querySelector('.prev');
const nextButton = modal.querySelector('.next');
const artworks = document.querySelectorAll('.artwork');
let currentIndex = 0;

// Open Modal
function openModal(index) {
    currentIndex = index;
    modalImg.src = artworks[currentIndex].src;
    modal.style.display = 'flex';
    document.body.classList.add('modal-active');
}

// Close Modal
function closeModalHandler() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-active');
}

// Navigate Images
function navigateModal(direction) {
    currentIndex = (currentIndex + direction + artworks.length) % artworks.length;
    modalImg.src = artworks[currentIndex].src;
}

// Event Listeners
artworks.forEach((artwork, index) => {
    artwork.addEventListener('click', () => openModal(index));
});

closeModal.addEventListener('click', closeModalHandler);
prevButton.addEventListener('click', () => navigateModal(-1));
nextButton.addEventListener('click', () => navigateModal(1));

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});
