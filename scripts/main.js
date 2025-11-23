document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const hiddenElements = document.querySelectorAll('.section-title, .project-card, .hero-content > *, .about-text, .contact-text');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Timeline Animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((el) => {
        if (el.classList.contains('left')) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    // Scroll-driven timeline filling
    const timelineSection = document.querySelector('.experience');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineContainer = document.querySelector('.timeline');

    window.addEventListener('scroll', () => {
        if (!timelineSection || !timelineLine || !timelineContainer) return;

        const sectionTop = timelineSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Trigger when middle of screen hits section

        // Calculate the maximum height based on the timeline container, not the whole section
        // We want the line to stop at the bottom of the last item
        const lastItem = timelineItems[timelineItems.length - 1];
        let maxLineHeight = 0;

        if (lastItem) {
            // Distance from top of timeline container to bottom of last item
            maxLineHeight = lastItem.offsetTop + lastItem.offsetHeight;
        } else {
            maxLineHeight = timelineContainer.offsetHeight;
        }

        if (scrollPosition > sectionTop) {
            let height = scrollPosition - sectionTop;

            // Clamp height
            if (height > maxLineHeight) height = maxLineHeight;
            if (height < 0) height = 0;

            timelineLine.style.height = `${height}px`;

            // Check for dots filling
            timelineItems.forEach(item => {
                // The dot is at 50% of the item height
                const dotPosition = item.offsetTop + (item.offsetHeight / 2);
                if (height >= dotPosition) {
                    item.classList.add('filled');
                } else {
                    item.classList.remove('filled');
                }
            });

        } else {
            timelineLine.style.height = '0px';
            timelineItems.forEach(item => item.classList.remove('filled'));
        }
    });

    // Theme toggle (optional simple implementation)
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        // This is a placeholder for theme switching logic
        // For now, we'll just log it or maybe toggle a class if we had a light theme
        console.log('Theme toggle clicked');
    });
});
