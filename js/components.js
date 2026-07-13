const HEADER_FALLBACK = `
<header class="navbar">
  <a href="index.html" class="brand" aria-label="Inicio LOOOP">
    <img src="img/logo.png" alt="LOOOP" class="logo">
  </a>

  <nav aria-label="Navegación principal">
    <a href="index.html" data-page="index">Inicio</a>

    <div class="nav-dropdown">
      <a href="index.html#proyectos" class="nav-link" data-page="proyectos">
        Proyectos <span class="arrow">▾</span>
      </a>

      <div class="dropdown-menu">
        <a href="animacion.html" data-page="animacion">Animación</a>
        <a href="reels.html" data-page="reels">Reels</a>
        <a href="cortometrajes.html" data-page="cortometrajes">Edición de videos / cortometrajes</a>
        <a href="otros_trabajos.html" data-page="otros_trabajos">Otros</a>
      </div>
    </div>

    <a href="about.html" data-page="about">Sobre mí</a>
    <a href="contacto.html" data-page="contacto">Contacto</a>
  </nav>
</header>`;

const FOOTER_FALLBACK = `
<footer class="site-footer">
  <div class="footer-brand">
    <img src="img/logo.png" alt="LOOOP" class="footer-logo">
    <p>Seguime en mis redes</p>
  </div>

  <div class="footer-social">
    <span>Redes sociales</span>
    <div class="socials footer-contact-socials">
      <a href="https://www.instagram.com/estudio.looop/" target="_blank" rel="noopener noreferrer"><img src="img/instagram_contactame.png" alt="Instagram"></a>
      <a href="https://www.tiktok.com/@looop.estudio?lang=es-419" target="_blank" rel="noopener noreferrer"><img src="img/tik_tok_contactame.png" alt="TikTok"></a>
      <a href="https://www.linkedin.com/in/agostina-rodriguez-b6430b286/" target="_blank" rel="noopener noreferrer"><img src="img/linkedin_contactame.png" alt="LinkedIn"></a>
      <a href="https://www.youtube.com/channel/UCXOnVyYCOhjBqPG5II_MTww" target="_blank" rel="noopener noreferrer"><img src="img/youtube_contactame.png" alt="YouTube"></a>
      <a href="https://www.behance.net/agostinrodrigu26" target="_blank" rel="noopener noreferrer"><img src="img/behance.png" alt="Behance"></a>
      <a href="https://ar.pinterest.com/estudiolooop/" target="_blank" rel="noopener noreferrer"><img src="img/pinterest_contactame.png" alt="Pinterest"></a>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© 2026 LOOOP — Portfolio Audiovisual</p>
  </div>
</footer>`;

const pageMap = {
  "": "index",
  "index.html": "index",
  "animacion.html": "animacion",
  "reels.html": "reels",
  "cortometrajes.html": "cortometrajes",
  "otros_trabajos.html": "otros_trabajos",
  "about.html": "about",
  "contacto.html": "contacto",
};

const musicMap = {
  index: "audio/musica-index.mp3",
  animacion: "audio/musica-animacion.mp3",
  reels: "audio/musica-reels.mp3",
  cortometrajes: "audio/musica-cortometrajes.mp3",
  otros_trabajos: "audio/musica-otros-trabajos.mp3",
  about: "audio/musica-about.mp3",
  contacto: "audio/musica-contacto.mp3",
};

const projectPages = new Set([
  "animacion",
  "reels",
  "cortometrajes",
  "otros_trabajos",
]);

const MOBILE_DESKTOP_GATE_KEY = "looopDesktopVersionOnMobile";
const DESKTOP_VIEWPORT_CONTENT =
  "width=1440, initial-scale=0.25, minimum-scale=0.1, maximum-scale=5, user-scalable=yes";

function getViewportMeta() {
  let meta = document.querySelector('meta[name="viewport"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "viewport";
    document.head.appendChild(meta);
  }

  return meta;
}

function forceDesktopViewport() {
  getViewportMeta().setAttribute("content", DESKTOP_VIEWPORT_CONTENT);
  document.documentElement.classList.add("desktop-version-on-mobile");
}

function hasAcceptedDesktopVersion() {
  try {
    return window.localStorage.getItem(MOBILE_DESKTOP_GATE_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function acceptDesktopVersion() {
  try {
    window.localStorage.setItem(MOBILE_DESKTOP_GATE_KEY, "true");
  } catch (error) {
    // If storage is unavailable, the viewport still changes for this visit.
  }

  forceDesktopViewport();
  window.location.reload();
}

function isMobileDevice() {
  if (navigator.userAgentData && typeof navigator.userAgentData.mobile === "boolean") {
    return navigator.userAgentData.mobile;
  }

  const userAgent = navigator.userAgent || "";
  const mobileUserAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const compactTouchScreen =
    navigator.maxTouchPoints > 1 &&
    Math.min(window.screen.width, window.screen.height) <= 820;

  return mobileUserAgent || compactTouchScreen;
}

function injectMobileGateStyles() {
  if (document.getElementById("mobile-desktop-gate-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "mobile-desktop-gate-styles";
  style.textContent = `
    .mobile-desktop-gate{
      position:fixed;
      inset:0;
      z-index:9999;
      display:grid;
      place-items:center;
      padding:24px;
      background:rgba(0,0,0,.92);
      color:#fff;
      font-family:var(--font-text, Arial, Helvetica, sans-serif);
    }

    .mobile-desktop-gate__panel{
      width:min(100%, 360px);
      padding:30px 24px;
      border:1px solid rgba(255,255,255,.18);
      border-radius:18px;
      background:#070707;
      text-align:center;
      box-shadow:0 24px 70px rgba(0,0,0,.45);
    }

    .mobile-desktop-gate__brand{
      width:86px;
      height:auto;
      display:block;
      margin:0 auto 22px;
    }

    .mobile-desktop-gate__message{
      margin:0;
      color:#fff;
      font-size:18px;
      line-height:1.35;
      font-weight:700;
    }

    .mobile-desktop-gate__button{
      width:100%;
      min-height:48px;
      margin-top:24px;
      border:0;
      border-radius:999px;
      background:var(--red, #A63838);
      color:#fff;
      font:700 14px/1 var(--font-text, Arial, Helvetica, sans-serif);
      cursor:pointer;
    }
  `;

  document.head.appendChild(style);
}

function showMobileDesktopGate() {
  if (document.querySelector(".mobile-desktop-gate")) {
    return;
  }

  injectMobileGateStyles();

  const gate = document.createElement("div");
  gate.className = "mobile-desktop-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "mobile-desktop-gate-message");
  gate.innerHTML = `
    <div class="mobile-desktop-gate__panel">
      <img src="img/logo.png" alt="LOOOP" class="mobile-desktop-gate__brand">
      <p class="mobile-desktop-gate__message" id="mobile-desktop-gate-message">
        no esta diseñado para celulares, te invitamos a verlo desde la version de escritorio
      </p>
      <button class="mobile-desktop-gate__button" type="button">Continuar</button>
    </div>
  `;

  gate
    .querySelector(".mobile-desktop-gate__button")
    .addEventListener("click", acceptDesktopVersion);

  document.body.appendChild(gate);
  gate.querySelector(".mobile-desktop-gate__button").focus();
}

function initMobileDesktopGate() {
  if (!isMobileDevice()) {
    return;
  }

  if (hasAcceptedDesktopVersion()) {
    forceDesktopViewport();
    return;
  }

  showMobileDesktopGate();
}

const getCurrentPage = () => {
  const fileName = window.location.pathname.split("/").pop();
  return pageMap[fileName] || "index";
};

async function includeComponent(target, name) {
  const fallback = name === "header" ? HEADER_FALLBACK : FOOTER_FALLBACK;

  try {
    const response = await fetch(`${name}.html`, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${name}.html`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    target.innerHTML = fallback;
  }
}

function setActiveNav() {
  const currentPage = getCurrentPage();
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
    includes.map((target) => includeComponent(target, target.dataset.include))
  );

  setActiveNav();
}

function initHomeCharacterLoop() {
  const agosCine = document.getElementById("agos-cine");

  if (!agosCine) {
    return;
  }

  let frame = 0;

  window.setInterval(() => {
    frame = frame === 0 ? 1 : 0;
    agosCine.src = frame === 1 ? "img/agos_cine2.png" : "img/agos_cine1.png";
    agosCine.style.width = frame === 1 ? "205px" : "220px";
  }, 350);
}

function initVideoCards(backgroundMusic) {
  const videoCards = [...document.querySelectorAll(".video-thumb")];

  videoCards.forEach((card) => {
    const cover = card.querySelector(".video-cover");
    const playBtn = card.querySelector(".play-btn");
    const video = card.querySelector(".video-player");

    if (!cover || !playBtn || !video) {
      return;
    }

    function playVideo(event) {
      event.stopPropagation();
      backgroundMusic.pauseForVideo();

      videoCards.forEach((otherCard) => {
        const otherVideo = otherCard.querySelector(".video-player");

        if (otherCard !== card && otherVideo) {
          otherVideo.pause();
          otherVideo.currentTime = 0;
          otherCard.classList.remove("playing");
        }
      });

      card.classList.add("playing");
      video.play();
    }

    cover.addEventListener("click", playVideo);
    playBtn.addEventListener("click", playVideo);
    video.addEventListener("click", (event) => event.stopPropagation());
    video.addEventListener("play", () => backgroundMusic.pauseForVideo());
    video.addEventListener("pause", () => backgroundMusic.resumeAfterVideo());
    video.addEventListener("ended", () => backgroundMusic.resumeAfterVideo());
  });

  document.addEventListener("click", () => {
    videoCards.forEach((card) => {
      const video = card.querySelector(".video-player");

      if (video && card.classList.contains("playing")) {
        video.pause();
        video.currentTime = 0;
        card.classList.remove("playing");
      }
    });
  });
}

function initBackgroundMusic() {
  const currentPage = getCurrentPage();
  const src = musicMap[currentPage];
  let wantsMusic = false;
  let pausedByVideo = false;

  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0.26;

  const button = document.createElement("button");
  button.className = "music-toggle";
  button.type = "button";
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-label", "Controlar música de fondo");
  button.textContent = "Activar música";
  document.body.appendChild(button);

  function isAnyVideoPlaying() {
    return [...document.querySelectorAll("video")]
      .some((video) => !video.paused && !video.ended);
  }

  async function playMusic() {
    wantsMusic = true;
    audio.muted = false;

    if (isAnyVideoPlaying()) {
      pausedByVideo = true;
      button.textContent = "Música pausada";
      button.classList.remove("is-playing");
      button.classList.add("is-paused");
      button.setAttribute("aria-pressed", "true");
      return;
    }

    try {
      await audio.play();
      button.textContent = "Silenciar música";
      button.classList.add("is-playing");
      button.classList.remove("is-paused");
      button.setAttribute("aria-pressed", "true");
    } catch (error) {
      wantsMusic = false;
      button.textContent = "Activar música";
      button.classList.remove("is-playing");
      button.classList.remove("is-paused");
      button.setAttribute("aria-pressed", "false");
    }
  }

  function stopMusic() {
    wantsMusic = false;
    audio.pause();
    button.textContent = "Activar música";
    button.classList.remove("is-playing");
    button.classList.remove("is-paused");
    button.setAttribute("aria-pressed", "false");
  }

  button.addEventListener("click", () => {
    if (pausedByVideo && wantsMusic) {
      pausedByVideo = false;
      stopMusic();
      return;
    }

    if (audio.paused) {
      playMusic();
    } else {
      stopMusic();
    }
  });

  return {
    pauseForVideo() {
      if (!audio.paused) {
        pausedByVideo = true;
        audio.pause();
        button.textContent = "Música pausada";
        button.classList.remove("is-playing");
        button.classList.add("is-paused");
      }
    },
    resumeAfterVideo() {
      window.setTimeout(() => {
        const videoStillPlaying = isAnyVideoPlaying();

        if (videoStillPlaying) {
          return;
        }

        if (pausedByVideo && wantsMusic) {
          pausedByVideo = false;
          playMusic();
        }
      }, 120);
    },
  };
}

function initPageAnimations() {
  const animatedItems = [
    ...document.querySelectorAll(
      "main > section, main > div, .project-tile, article, .site-footer"
    ),
  ];

  animatedItems.forEach((item, index) => {
    item.classList.add("looop-reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 240)}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedItems.forEach((item) => observer.observe(item));
  document.body.classList.add("page-ready");
}

function linkContactSocials() {
  const links = [
    ["instagram_contactame.png", "https://www.instagram.com/estudio.looop/"],
    ["tik_tok_contactame.png", "https://www.tiktok.com/@looop.estudio?lang=es-419"],
    ["linkedin_contactame.png", "https://www.linkedin.com/in/agostina-rodriguez-b6430b286/"],
    ["youtube_contactame.png", "https://www.youtube.com/channel/UCXOnVyYCOhjBqPG5II_MTww"],
    ["behance.png", "https://www.behance.net/agostinrodrigu26"],
    ["pinterest_contactame.png", "https://ar.pinterest.com/estudiolooop/"],
  ];

  links.forEach(([imageName, url]) => {
    document.querySelectorAll(`img[src$="${imageName}"]`).forEach((image) => {
      const link = image.closest("a");

      if (!link) {
        return;
      }

      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  });
}

async function initSite() {
  initMobileDesktopGate();
  await loadComponents();
  linkContactSocials();
  const backgroundMusic = initBackgroundMusic();
  initHomeCharacterLoop();
  initVideoCards(backgroundMusic);
  initPageAnimations();
}

initSite().catch((error) => {
  console.error(error);
});
