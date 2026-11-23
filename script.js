const translations = {
  es: {
    page_title: "Portfolio — Desarrollo Web (1º DAW)",
    back_home: "← Inicio",
    tag: "Desarrollo Web",
    hero_title: "Hola, soy Khaoula",
    hero_subtitle: "Creo páginas web sencillas, limpias y adaptadas a móvil según lo que necesite cada persona o proyecto.",
    btn_projects: "Ver ejemplos",
    btn_contact: "Contactar",
    skills_title: "Qué sé hacer",
    skill_1: "HTML5 & CSS3 (diseño responsive)",
    skill_2: "JavaScript (interacciones básicas)",
    skill_3: "Java & SQL (fundamentos)",
    projects_title: "Tipos de páginas y ejemplos",
    proj1_title: "Página web informativa o de presentación",
    proj1_desc: "Ideal para mostrar información, servicios o un proyecto de forma clara y adaptable a móvil.",
    proj2_title: "Página promocional o a medida",
    proj2_desc: "Pensada para destacar una idea, campaña o necesidad concreta según lo que me pida cada cliente.",
    view_demo: "Cuéntame tu idea",
    contact_title: "Contacto",
    contact_text: "Cuéntame qué tipo de página o ayuda web necesitas y vemos cómo hacerlo. Escríbeme a:",
    footer_text: "Hecho con HTML, CSS y JavaScript · Disponible para proyectos web"
  },
  en: {
    page_title: "Portfolio — Web Development (1st Year DAW)",
    back_home: "← Home",
    tag: "Web Development",
    hero_title: "Hi, I'm Khaoula",
    hero_subtitle: "I build simple, clean, mobile-friendly websites tailored to what each person or project needs.",
    btn_projects: "View examples",
    btn_contact: "Contact me",
    skills_title: "What I can do",
    skill_1: "HTML5 & CSS3 (responsive design)",
    skill_2: "JavaScript (basic interactions)",
    skill_3: "Java & SQL (fundamentals)",
    projects_title: "Website types & examples",
    proj1_title: "Informational or profile website",
    proj1_desc: "Great for sharing information, services, or a project cleanly and responsively on mobile.",
    proj2_title: "Promotional or custom page",
    proj2_desc: "Designed to highlight an idea, campaign, or specific goal based on what the client asks for.",
    view_demo: "Tell me your idea",
    contact_title: "Contact",
    contact_text: "Tell me what kind of page or web help you need and we can see how to build it. Email me at:",
    footer_text: "Built with HTML, CSS & JavaScript · Available for web projects"
  }
};

const buttons = document.querySelectorAll(".lang-btn");

function setLanguage(lang) {
  const dict = translations[lang] || translations.es;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  try {
    localStorage.setItem("portfolio_lang", lang);
  } catch (e) {
    // Ignorar si el navegador bloquea localStorage
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

let savedLang = "es";
try {
  savedLang = localStorage.getItem("portfolio_lang") || "es";
} catch (e) {
  savedLang = "es";
}

setLanguage(savedLang);