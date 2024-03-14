document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close');
    const form = document.getElementById('modalForm');
    const inputs = form.querySelectorAll('input');

    function openModal() {
        modal.style.display = 'block';
        gsap.fromTo(modal, { opacity: 0 }, { duration: 0.5, opacity: 1, ease: "power1.out" });
        gsap.fromTo('.modal-content', { y: -50, opacity: 0 }, { duration: 0.5, y: 0, opacity: 1, ease: "power1.out" });
    }

    function closeModal() {
        gsap.to('.modal-content', { duration: 0.5, y: 50, opacity: 0, ease: "power1.in", onComplete: () => {
            gsap.to(modal, { duration: 0.5, opacity: 0, ease: "power1.in", onComplete: () => modal.style.display = 'none' });
        }});
    }

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, { duration: 0.5, borderColor: "#007bff", borderWidth: "2px" });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { duration: 0.5, borderColor: "#ccc", borderWidth: "1px" });
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isValid = Array.from(inputs).every(input => input.value.trim() !== '');
        if (isValid) {
            gsap.to('.submit-btn', { duration: 0.5, backgroundColor: "#28a745", onComplete: () => {
                alert('Form submitted successfully!');
                closeModal();
            }});
        } else {
            gsap.to('.submit-btn', { duration: 0.5, backgroundColor: "#dc3545" });
        }
    });
});
