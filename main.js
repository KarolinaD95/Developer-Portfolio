document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle")
    const navItems = document.querySelector("nav ul")

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener("click", function () {
            this.classList.toggle("active")

            if (this.classList.contains("active")) {
                this.innerHTML = '<i class="fa-solid fa-xmark"></i>'

                // Create mobile menu if it doesn't exist
                if (!document.querySelector(".mobile-menu")) {
                    const mobileMenu = document.createElement("div")
                    mobileMenu.className = "mobile-menu"
                    mobileMenu.innerHTML = navItems.outerHTML
                    document.body.appendChild(mobileMenu)

                    // Add click event to mobile menu links to close menu
                    const mobileLinks = mobileMenu.querySelectorAll("a")
                    mobileLinks.forEach((link) => {
                        link.addEventListener("click", closeMobileMenu)
                    })

                    // Animate menu appearance
                    setTimeout(() => {
                        mobileMenu.style.transform = "translateX(0)"
                    }, 10)
                } else {
                    document.querySelector(".mobile-menu").style.transform = "translateX(0)"
                }

                // Prevent scrolling when menu is open
                document.body.style.overflow = "hidden"
            } else {
                this.innerHTML = '<i class="fa-solid fa-bars"></i>'
                closeMobileMenu()
            }
        })
    }

    function closeMobileMenu() {
        const mobileMenu = document.querySelector(".mobile-menu")
        if (mobileMenu) {
            mobileMenu.style.transform = "translateX(100%)"
            document.body.style.overflow = ""
        }
        if (mobileNavToggle) {
            mobileNavToggle.classList.remove("active")
            mobileNavToggle.innerHTML = '<i class="fa-solid fa-bars"></i>'
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                // Close mobile menu if open
                if (document.querySelector(".mobile-menu")) {
                    closeMobileMenu()
                }

                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Accounting for header height
                    behavior: "smooth",
                })
            }
        })
    })

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".project-card, .skill-card, .about-image")

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top
            const windowHeight = window.innerHeight

            if (elementPosition < windowHeight - 100) {
                element.classList.add("animate-in")
            }
        })
    }

    // Add CSS for animation
    const style = document.createElement("style")
    style.textContent = `
    .project-card, .skill-card, .about-image {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    .mobile-menu {
      position: fixed;
      top: 0;
      right: 0;
      width: 80%;
      max-width: 300px;
      height: 100vh;
      background-color: var(--black);
      z-index: 999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      padding: 5rem 2rem 2rem;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    }
    .mobile-menu ul {
      flex-direction: column;
      gap: 2rem;
    }
    .mobile-menu a {
      font-size: 1.2rem;
    }
    .form-message {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: var(--border-radius);
      text-align: center;
    }
    .form-message.success {
      background-color: rgba(0, 128, 0, 0.2);
      color: #4caf50;
    }
    .form-message.error {
      background-color: rgba(255, 0, 0, 0.2);
      color: #f44336;
    }
  `
    document.head.appendChild(style)

    // Run on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
})
