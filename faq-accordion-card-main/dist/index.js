const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', (e) => {
        if (e.target.closest(".faq").classList.contains('active')) {
            faq.classList.remove('active');
            return;
        }

        faqs.forEach(activeFaq => {
            activeFaq.classList.remove('active');
        });

        faq.classList.add('active');
    });
});