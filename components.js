const pageMap = {
  "": "index",
  "index.html": "index",
  "animacion.html": "animacion",
  "reels.html": "reels",
  "cortometrajes.html": "cortometrajes",
  "stopmotion.html": "stopmotion",
  "about.html": "about",
  "contacto.html": "contacto",
};

const projectPages = new Set([
  "animacion",
  "reels",
  "cortometrajes",
  "stopmotion",
]);

async function includeComponent(target, file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${file}`);
  }

  target.innerHTML = await response.text();
}

function setActiveNav() {
  const fileName = window.location.pathname.split("/").pop();
  const currentPage = pageMap[fileName] || "index";
  const activeTopPage = projectPages.has(currentPage) ? "proyectos" : currentPage;

  document.querySelectorAll(".navbar .active").forEach((link) => {
    link.classList.remove("active");
  });

  document
    .querySelector(`.navbar [data-page="${activeTopPage}"]`)
    ?.classList.add("active");

  document
    .querySelector(`.dropdown-menu [data-page="${currentPage}"]`)
    ?.classList.add("active");
}

async function loadComponents() {
  const includes = [...document.querySelectorAll("[data-include]")];

  await Promise.all(
    includes.map((target) => {
      const name = target.dataset.include;
      return includeComponent(target, `${name}.html`);
    })
  );

  setActiveNav();
}

loadComponents().catch((error) => {
  console.error(error);
});
