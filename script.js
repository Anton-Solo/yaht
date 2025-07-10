// Configuration state
const selectedConfig = {
  color: "vmg-bronze",
  interior: "luxury",
  layout: "standard",
}

// Performance state
let windSpeed = 15
let windAngle = 45
let yachtWeight = "18"

// Color options
const colors = {
  "vmg-bronze": "VMG Bronze",
  "midnight-black": "Midnight Black",
  platinum: "Platinum Silver",
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeConfiguration()
  initializePerformance()
  initializeGallery()
  updatePerformanceDisplay()
})

// Navigation functionality
function initializeNavigation() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Mobile menu toggle (placeholder for future implementation)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      // Mobile menu functionality can be added here
      console.log("Mobile menu clicked")
    })
  }
}

// Configuration functionality
function initializeConfiguration() {
  // Color selection
  const colorOptions = document.querySelectorAll(".color-option")
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      colorOptions.forEach((opt) => {
        opt.classList.remove("border-amber-500", "bg-gray-800")
        opt.classList.add("border-gray-700", "hover:border-gray-600")
      })

      // Add active class to selected option
      this.classList.remove("border-gray-700", "hover:border-gray-600")
      this.classList.add("border-amber-500", "bg-gray-800")

      // Update selected config
      selectedConfig.color = this.dataset.color
      updateConfigurationDisplay()
    })
  })

  // Interior selection
  const interiorSelect = document.getElementById("interior-select")
  if (interiorSelect) {
    interiorSelect.addEventListener("change", function () {
      selectedConfig.interior = this.value
      updateConfigurationDisplay()
    })
  }

  // Layout selection
  const layoutSelect = document.getElementById("layout-select")
  if (layoutSelect) {
    layoutSelect.addEventListener("change", function () {
      selectedConfig.layout = this.value
      updateConfigurationDisplay()
    })
  }
}

// Update configuration display
function updateConfigurationDisplay() {
  const colorBadge = document.getElementById("color-badge")
  const hullDisplay = document.getElementById("hull-display")
  const interiorDisplay = document.getElementById("interior-display")
  const layoutDisplay = document.getElementById("layout-display")

  if (colorBadge) colorBadge.textContent = colors[selectedConfig.color]
  if (hullDisplay) hullDisplay.textContent = colors[selectedConfig.color]
  if (interiorDisplay) {
    interiorDisplay.textContent =
      selectedConfig.interior.charAt(0).toUpperCase() + selectedConfig.interior.slice(1) + " Package"
  }
  if (layoutDisplay) {
    layoutDisplay.textContent =
      selectedConfig.layout.charAt(0).toUpperCase() + selectedConfig.layout.slice(1) + " Layout"
  }
}

// Performance functionality
function initializePerformance() {
  // Wind speed slider
  const windSpeedSlider = document.getElementById("wind-speed")
  const windSpeedValue = document.getElementById("wind-speed-value")

  if (windSpeedSlider && windSpeedValue) {
    windSpeedSlider.addEventListener("input", function () {
      windSpeed = Number.parseInt(this.value)
      windSpeedValue.textContent = windSpeed
      updatePerformanceDisplay()
    })
  }

  // Wind angle slider
  const windAngleSlider = document.getElementById("wind-angle")
  const windAngleValue = document.getElementById("wind-angle-value")

  if (windAngleSlider && windAngleValue) {
    windAngleSlider.addEventListener("input", function () {
      windAngle = Number.parseInt(this.value)
      windAngleValue.textContent = windAngle
      updatePerformanceDisplay()
    })
  }

  // Yacht weight selection
  const yachtWeightSelect = document.getElementById("yacht-weight")
  if (yachtWeightSelect) {
    yachtWeightSelect.addEventListener("change", function () {
      yachtWeight = this.value
      updatePerformanceDisplay()
    })
  }
}

// Calculate and update performance display
function updatePerformanceDisplay() {
  const speed = calculateSpeed()
  const heelAngle = Math.round(windAngle / 10)

  // Update speed displays
  const calculatedSpeed = document.getElementById("calculated-speed")
  const sailingSpeed = document.getElementById("sailing-speed")
  if (calculatedSpeed) calculatedSpeed.textContent = speed.toFixed(1)
  if (sailingSpeed) sailingSpeed.textContent = speed.toFixed(1)

  // Update heel angle
  const heelAngleDisplay = document.getElementById("heel-angle")
  if (heelAngleDisplay) heelAngleDisplay.textContent = heelAngle + "°"

  // Update wind display
  const displayWindSpeed = document.getElementById("display-wind-speed")
  const displayWindAngle = document.getElementById("display-wind-angle")
  const displayWeight = document.getElementById("display-weight")

  if (displayWindSpeed) displayWindSpeed.textContent = windSpeed
  if (displayWindAngle) displayWindAngle.textContent = windAngle
  if (displayWeight) displayWeight.textContent = yachtWeight
}

// Calculate yacht speed based on conditions
function calculateSpeed() {
  const baseSpeed = 8
  const windFactor = windSpeed / 10
  const angleFactor = Math.sin((windAngle * Math.PI) / 180)
  const weightFactor = yachtWeight === "16" ? 1.1 : yachtWeight === "17" ? 1.05 : 1

  return baseSpeed * windFactor * angleFactor * weightFactor
}

// Gallery functionality
function initializeGallery() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.dataset.tab

      // Remove active class from all buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-amber-500", "text-gray-950")
        btn.classList.add("text-gray-300")
      })

      // Add active class to clicked button
      this.classList.add("active", "bg-amber-500", "text-gray-950")
      this.classList.remove("text-gray-300")

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove("active")
      })

      // Show target tab content
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })
}

// Utility function for smooth scrolling (fallback for older browsers)
function smoothScrollTo(element) {
  const targetPosition = element.offsetTop - 80 // Account for fixed header
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 1000
  let start = null

  function animation(currentTime) {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

// Add scroll effect for navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav")
  if (window.scrollY > 100) {
    navbar.classList.add("bg-gray-950")
    navbar.classList.remove("bg-gray-950/95")
  } else {
    navbar.classList.remove("bg-gray-950")
    navbar.classList.add("bg-gray-950/95")
  }
})

// Add intersection observer for animations (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in")
    }
  })
}, observerOptions)

// Observe sections for animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })
})

const section = document.getElementById('configuration');

  // Блокуємо scroll на всій сторінці
  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  // Відновлюємо scroll
  function enableScroll() {
    document.body.style.overflow = '';
  }

  section.addEventListener('mouseenter', disableScroll);
  section.addEventListener('mouseleave', enableScroll);
