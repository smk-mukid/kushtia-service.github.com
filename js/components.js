// Create a function to add the marquee banner
function addMarqueeBanner() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        
        @keyframes marquee-mobile {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-180%); }
        }
        
        .animate-marquee {
            display: inline-block;
            animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
            animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
            .animate-marquee {
                animation: marquee-mobile 20s linear infinite;
            }
            
            .emergency-text {
                font-size: 0.875rem;
            }
            
            .emergency-icon {
                font-size: 1rem;
            }
        }
        
        .marquee-container {
            position: relative;
            width: 100%;
            overflow: hidden;
        }
        
        .marquee-gradient {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50px;
            z-index: 1;
            pointer-events: none;
        }
        
        .marquee-gradient-left {
            left: 0;
            background: linear-gradient(to right, rgb(234 179 8), transparent);
        }
        
        .marquee-gradient-right {
            right: 0;
            background: linear-gradient(to left, rgb(234 179 8), transparent);
        }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.className = 'bg-yellow-500 py-2 relative';
    banner.innerHTML = `
        <div class="marquee-container">
            <div class="marquee-gradient marquee-gradient-left"></div>
            <div class="marquee-gradient marquee-gradient-right"></div>
            <div class="animate-marquee whitespace-nowrap">
                <span class="emergency-text text-red-700 font-semibold mx-4">
                    <span class="emergency-icon">🚨</span> জরুরী প্রয়োজনে কল করুন - ফায়ার সার্ভিস: <a href="tel:16163" class="hover:underline">16163</a>
                </span>
                <span class="emergency-text text-red-700 font-semibold mx-4">
                    <span class="emergency-icon">🚔</span> পুলিশ: <a href="tel:999" class="hover:underline">999</a>
                </span>
                <span class="emergency-text text-red-700 font-semibold mx-4">
                    <span class="emergency-icon">🚑</span> অ্যাম্বুলেন্স: <a href="tel:999" class="hover:underline">999</a>
                </span>
                <span class="emergency-text text-red-700 font-semibold mx-4">
                    <span class="emergency-icon">⚡</span> বিদ্যুৎ জরুরী সেবা: <a href="tel:16120" class="hover:underline">16120</a>
                </span>
                <span class="emergency-text text-red-700 font-semibold mx-4">
                    <span class="emergency-icon">📞</span> জাতীয় হেল্পলাইন: <a href="tel:333" class="hover:underline">333</a>
                </span>
            </div>
        </div>
    `;

    // Insert after header
    const header = document.querySelector('header');
    header.parentNode.insertBefore(banner, header.nextSibling);

    // Add touch event handling for mobile devices
    const marquee = banner.querySelector('.animate-marquee');
    let touchStartX = 0;
    let touchEndX = 0;

    marquee.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        marquee.style.animationPlayState = 'paused';
    }, { passive: true });

    marquee.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const touchDiff = touchEndX - touchStartX;

        // Adjust animation speed based on swipe direction
        if (Math.abs(touchDiff) > 50) {
            const currentAnimation = window.getComputedStyle(marquee).animationDuration;
            const currentDuration = parseFloat(currentAnimation);
            const newDuration = touchDiff > 0 ? currentDuration * 1.2 : currentDuration * 0.8;
            marquee.style.animationDuration = `${newDuration}s`;
        }
        marquee.style.animationPlayState = 'running';
    }, { passive: true });

    // Handle visibility change to pause animation when tab is inactive
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            marquee.style.animationPlayState = 'paused';
        } else {
            marquee.style.animationPlayState = 'running';
        }
    });
}