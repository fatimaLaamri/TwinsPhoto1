// Navbar: Change navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.navbar-brand img'); // Select the logo
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-light', 'scrolled');
        navbar.classList.remove('navbar-dark');
         logo.style.filter = 'none'
    } else {
        navbar.classList.remove('navbar-light', 'scrolled');
        navbar.classList.add('navbar-dark');
        logo.style.filter = 'invert(1) sepia(1) saturate(5) hue-rotate(180deg)'; 
    }
});

// Testimonial sction : Initialize Bootstrap Carousel
const testimonialsCarousel = document.querySelector('#testimonialsCarousel');
if (testimonialsCarousel) {
    new bootstrap.Carousel(testimonialsCarousel, {
        interval: 5000, // Auto-slide every 5 seconds
        wrap: true, // Loop carousel
    });
}
//steps section
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step-content");
    const prevBtn = document.querySelector(".prev-step");
    const nextBtn = document.querySelector(".next-step");
    let currentStep = 0;

    function updateSteps(direction) {
        // Remove the active class from the current step
        steps[currentStep].classList.remove("active");

        // Add exit animation
        if (direction === "next") {
            steps[currentStep].classList.add("exit-left");
        } else if (direction === "prev") {
            steps[currentStep].classList.add("exit-right");
        }

        // Reset animation after it's complete
        setTimeout(() => {
            steps[currentStep].classList.remove("exit-left", "exit-right");

            // Update the index for the new current step
            if (direction === "next") {
                currentStep = (currentStep + 1) % steps.length;
            } else if (direction === "prev") {
                currentStep = (currentStep - 1 + steps.length) % steps.length;
            }

            // Add the active class to the new current step
            steps[currentStep].classList.add("active");
        }, 500); // Match transition duration
    }

    // Add event listeners for the navigation buttons
    prevBtn.addEventListener("click", () => updateSteps("prev"));
    nextBtn.addEventListener("click", () => updateSteps("next"));
});



///introoo section scroll
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider-images");
    const images = document.querySelectorAll(".slider-images img");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    const updateSliderPosition = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateSliderPosition();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateSliderPosition();
    });
});
//into section
document.addEventListener("DOMContentLoaded", () => {
    const introSection = document.querySelector(".intro-section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    introSection.classList.add("animate-section");
                }
            });
        },
        {
            threshold: 0.3, // Trigger animation when 30% of the section is visible
        }
    );

    observer.observe(introSection);
});


//service section
document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".service-card");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-card");
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        },
        {
            threshold: 0.2, // Trigger animation when 20% of the element is visible
        }
    );

    serviceCards.forEach((card) => {
        observer.observe(card);
    });
});
// serviceCards.forEach((card, index) => {
//     card.style.transitionDelay = `${index * 0.2}s`;
//     observer.observe(card);
// });


//films section
document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".film-container video");
    const playButton = document.querySelector(".play-button i"); // Target the play button icon
    const overlay = document.querySelector(".film-overlay");
    const filmContainer = document.querySelector(".film-container");

    // Toggle Play/Pause on overlay click
    overlay.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            video.muted = false; // Unmute the video when playing
            overlay.classList.add("hidden"); // Hide overlay
            playButton.classList.remove("fa-play-circle");
            playButton.classList.add("fa-pause-circle");
        } else {
            video.pause();
            overlay.classList.remove("hidden"); // Show overlay
            playButton.classList.remove("fa-pause-circle");
            playButton.classList.add("fa-play-circle");
        }
    });

    // Handle video pause event (show overlay)
    video.addEventListener("pause", () => {
        overlay.classList.remove("hidden"); // Show overlay
        playButton.classList.remove("fa-pause-circle");
        playButton.classList.add("fa-play-circle");
    });

    // Handle video play event (hide overlay)
    video.addEventListener("play", () => {
        overlay.classList.add("hidden"); // Hide overlay
        playButton.classList.remove("fa-play-circle");
        playButton.classList.add("fa-pause-circle");
    });

    // Add fullscreen functionality (double-click to toggle fullscreen)
    filmContainer.addEventListener("dblclick", () => {
        if (!document.fullscreenElement) {
            filmContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Ensure video starts paused and overlay is visible
    video.addEventListener("loadeddata", () => {
        video.muted = true; // Start muted
        video.pause(); // Ensure video starts paused
        overlay.classList.remove("hidden"); // Show overlay initially
    });
});



//statistics section
document.addEventListener("DOMContentLoaded", () => {
    const statNumbers = document.querySelectorAll(".stat-number");

    const animateNumbers = (numberElement) => {
        const targetNumber = parseInt(numberElement.getAttribute("data-target"));
        const duration = 2000; // Durée totale de l'animation (2 secondes)
        const increment = targetNumber / duration * 10; // Incrément par intervalle (~10ms)
        let currentNumber = 0;

        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                numberElement.textContent = targetNumber.toLocaleString();
                clearInterval(timer); // Arrête l'animation lorsque la cible est atteinte
            } else {
                numberElement.textContent = Math.floor(currentNumber).toLocaleString();
            }
        }, 10);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                numberElement.classList.add("visible"); // Ajoute la classe pour l'animation CSS
                animateNumbers(numberElement); // Lance l'animation des nombres
                observer.unobserve(numberElement); // Arrête d'observer cet élément
            }
        });
    }, {
        threshold: 0.5, // 50% visible pour déclencher
    });

    statNumbers.forEach((number) => observer.observe(number));
    console.log("Nombres détectés :", statNumbers);
});

//send to email 
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const serviceID = 'service_fsyqjrq'; // Remplacez par votre Service ID
    const templateID = 'template_0ebfys7'; // Remplacez par votre Template ID

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Message envoyé avec succès !');
            this.reset(); // Réinitialise le formulaire
        }, (err) => {
            alert('Une erreur s\'est produite, veuillez réessayer.');
            console.error('EmailJS Error:', err);
        });
});






