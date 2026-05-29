const unitCards = document.querySelectorAll(".unit-card");
const unitSections = document.querySelectorAll(".unit-section");
const revealItems = document.querySelectorAll(".reveal");
const searchInput = document.getElementById("searchInput");
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.getElementById("scrollProgress");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const siteHeader = document.getElementById("siteHeader");
const emptyState = document.getElementById("emptyState");

// Modal elements
const openButtons = document.querySelectorAll(".open-btn");
const notesModal = document.getElementById("notesModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalList = document.getElementById("modalList");

// Popup content for all 5 units
const unitContent = {
  unit1: {
    title: "Introduction to Java",
    text: "Java is a high-level, object-oriented programming language. It is platform independent because Java programs run on JVM.",
    points: [
      "History of Java",
      "Features of Java",
      "JDK, JRE and JVM",
      "Bytecode",
      "Applications of Java"
    ]
  },
  unit2: {
    title: "Variables and Data Types",
    text: "Variables store data and data types define what type of value can be stored in a variable.",
    points: [
      "Meaning of variable",
      "Primitive data types",
      "Non-primitive data types",
      "Declaration and initialization",
      "Type casting"
    ]
  },
  unit3: {
    title: "Operators",
    text: "Operators are symbols used to perform operations on variables and values in Java.",
    points: [
      "Arithmetic operators",
      "Relational operators",
      "Logical operators",
      "Assignment operators",
      "Unary and ternary operators"
    ]
  },
  unit4: {
    title: "Control Statements",
    text: "Control statements control the flow of execution in a Java program.",
    points: [
      "if statement",
      "if-else and nested if",
      "switch statement",
      "for, while, do-while loops",
      "break and continue"
    ]
  },
  unit5: {
    title: "OOP Concepts",
    text: "OOP stands for Object-Oriented Programming. It is based on class and object.",
    points: [
      "Class and object",
      "Constructor",
      "Inheritance",
      "Polymorphism",
      "Encapsulation and abstraction"
    ]
  }
};

// Smooth scroll for top unit cards
unitCards.forEach((card) => {
  card.addEventListener("click", () => {
    const targetId = card.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Reveal animation on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Active card highlight
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        unitCards.forEach((card) => {
          card.classList.toggle("active", card.dataset.target === id);
        });
      }
    });
  },
  { threshold: 0.45 }
);

unitSections.forEach((section) => sectionObserver.observe(section));

// Search and filter
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  let visibleCount = 0;

  unitSections.forEach((section) => {
    const content = section.textContent.toLowerCase();
    const keywords = section.dataset.keywords.toLowerCase();
    const matched = content.includes(query) || keywords.includes(query);

    section.classList.toggle("hidden", !matched);

    const relatedCard = document.querySelector(`[data-target="${section.id}"]`);
    if (relatedCard) {
      relatedCard.classList.toggle("hidden", !matched);
    }

    if (matched) visibleCount++;
  });

  emptyState.classList.toggle("hidden", visibleCount !== 0);
});

// Scroll progress, sticky header, back-to-top
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  backToTop.classList.toggle("show", scrollTop > 420);
  siteHeader.classList.toggle("scrolled", scrollTop > 20);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme switch
const savedTheme = localStorage.getItem("java-notes-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("java-notes-theme", isLight ? "light" : "dark");
});

// Open popup for all 5 unit buttons
openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const unit = button.getAttribute("data-unit");
    const data = unitContent[unit];

    modalTitle.textContent = data.title;
    modalText.textContent = data.text;

    modalList.innerHTML = "";

    data.points.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      modalList.appendChild(li);
    });

    notesModal.classList.add("show");
  });
});

// Close popup
closeModal.addEventListener("click", () => {
  notesModal.classList.remove("show");
});

notesModal.addEventListener("click", (e) => {
  if (e.target === notesModal) {
    notesModal.classList.remove("show");
  }
});