// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("saindo");
    loader.addEventListener(
      "transitionend",
      () => loader.remove(),
      { once: true }
    );
  }, 800);
});

// ===== MENU MOBILE =====
const menuBtn = document.getElementById("menu-btn");
const menuMobile = document.getElementById("menu-mobile");

if (menuBtn && menuMobile) {
  menuBtn.addEventListener("click", () => {
    const aberto = menuMobile.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", String(aberto));
  });

  menuMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("aberto");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== FORMULÁRIO DE CONTATO =====
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = form.nome.value.trim();
    const whats = form.whats.value.trim();
    const msg = form.msg.value.trim();

    const texto = encodeURIComponent(
      `Olá! Meu nome é ${nome}.\n\n${msg}\n\nMeu WhatsApp: ${whats}`
    );

    // Troque pelo WhatsApp real do estúdio.
    window.open(`https://wa.me/5561900000000?text=${texto}`, "_blank");
  });
}

// ===== BOTÃO VOLTAR AO TOPO =====
const botaoTopo = document.querySelector(".botao-topo");

if (botaoTopo) {
  function atualizarBotaoTopo() {
    const rolouBastante = window.scrollY > window.innerHeight * 0.6;
    botaoTopo.classList.toggle("visivel", rolouBastante);
  }

  window.addEventListener("scroll", atualizarBotaoTopo, { passive: true });
  atualizarBotaoTopo();
}

// ===== LIGHTBOX DA GALERIA: NÚCLEO =====
const lightbox = document.getElementById("lightbox-galeria");
const lightboxImagem = document.getElementById("lightbox-imagem");
const lightboxContador = document.getElementById("lightbox-contador");
const lightboxFechar = document.getElementById("lightbox-fechar");
const lightboxAnterior = document.getElementById("lightbox-anterior");
const lightboxProxima = document.getElementById("lightbox-proxima");

let itensLightboxAtual = [];
let indiceLightboxAtual = 0;
let overflowOriginalDoBody = "";

function abrirLightboxGaleria(itens, indiceInicial) {
  if (
    !lightbox ||
    !lightboxImagem ||
    !lightboxContador ||
    !itens.length
  ) {
    return;
  }

  itensLightboxAtual = itens;
  indiceLightboxAtual = indiceInicial;

  atualizarImagemLightbox();

  if (!lightbox.open) {
    overflowOriginalDoBody = document.body.style.overflow;
    lightbox.showModal();
    document.body.style.overflow = "hidden";
  }
}

function fecharLightboxGaleria() {
  if (!lightbox || !lightbox.open) return;

  lightbox.close();
  document.body.style.overflow = overflowOriginalDoBody;
}

function atualizarImagemLightbox() {
  const item = itensLightboxAtual[indiceLightboxAtual];
  if (!item || !lightboxImagem || !lightboxContador) return;

  lightboxImagem.classList.remove("visivel");

  const imagemTemp = new Image();
  imagemTemp.src = item.src;

  imagemTemp.onload = () => {
    lightboxImagem.src = item.src;
    lightboxImagem.alt = item.alt;

    requestAnimationFrame(() => {
      lightboxImagem.classList.add("visivel");
    });
  };

  imagemTemp.onerror = () => {
    lightboxImagem.src = item.src;
    lightboxImagem.alt = item.alt;

    requestAnimationFrame(() => {
      lightboxImagem.classList.add("visivel");
    });
  };

  lightboxContador.textContent =
    `${indiceLightboxAtual + 1} / ${itensLightboxAtual.length}`;
}

function navegarLightbox(delta) {
  const total = itensLightboxAtual.length;
  if (!total) return;

  indiceLightboxAtual =
    (indiceLightboxAtual + delta + total) % total;

  atualizarImagemLightbox();
}

if (
  lightbox &&
  lightboxFechar &&
  lightboxAnterior &&
  lightboxProxima
) {
  lightboxFechar.addEventListener("click", fecharLightboxGaleria);

  lightboxAnterior.addEventListener("click", () => {
    navegarLightbox(-1);
  });

  lightboxProxima.addEventListener("click", () => {
    navegarLightbox(1);
  });

  lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) {
      fecharLightboxGaleria();
    }
  });

  lightbox.addEventListener("cancel", (evento) => {
    evento.preventDefault();
    fecharLightboxGaleria();
  });

  document.addEventListener("keydown", (evento) => {
    if (!lightbox.open) return;

    if (evento.key === "ArrowLeft") {
      navegarLightbox(-1);
    }

    if (evento.key === "ArrowRight") {
      navegarLightbox(1);
    }
  });

  let toqueInicialX = 0;

  lightbox.addEventListener(
    "touchstart",
    (evento) => {
      toqueInicialX = evento.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (evento) => {
      const toqueFinalX = evento.changedTouches[0].screenX;
      const diferenca = toqueFinalX - toqueInicialX;
      const limiarMinimo = 40;

      if (diferenca > limiarMinimo) {
        navegarLightbox(-1);
      }

      if (diferenca < -limiarMinimo) {
        navegarLightbox(1);
      }
    },
    { passive: true }
  );
}

// ===== GALERIAS POR ESTILO =====
const galeriasPorEstilo = {
  "blackwork-oldschool": [
    {
      src: "src/j-silverhand.jpg",
      alt: "Tatuagem blackwork ornamental no antebraço",
      destaque: "destaque-grande"
    },
    {
      src: "src/lw.jpg",
      alt: "Tatuagem blackwork ornamental no peito"
    },
    {
      src: "src/rita2.jpg",
      alt: "Tatuagem blackwork ornamental na perna"
    },
    {
      src: "src/v.jpg",
      alt: "Tatuagem old school de rosa colorida no braço",
      destaque: "destaque-largo"
    }
  ],

  "fineline-botanico": [
    {
      src: "src/v2.jpg",
      alt: "Tatuagem fine line ornamental no antebraço",
      destaque: "destaque-grande"
    },
    {
      src: "src/v.jpg",
      alt: "Tatuagem fine line ornamental no pescoço"
    },
    {
      src: "src/j-silverhand.jpg",
      alt: "Tatuagem fine line ornamental na mão"
    },
    {
      src: "src/kirishi.jpg",
      alt: "Tatuagem botânica de rosa colorida no braço",
      destaque: "destaque-largo"
    }
  ],

  "realismo-retrato": [
    {
      src: "src/kirishi.jpg",
      alt: "Tatuagem realista ornamental no antebraço",
      destaque: "destaque-grande"
    },
     {
      src: "src/lw.jpg",
      alt: "Tatuagem realista ornamental na bunda",
    },
    {
      src: "src/v2.jpg",
      alt: "Tatuagem realista ornamental na bunda"
    },
    {
      src: "src/j-silverhand.jpg",
      alt: "Tatuagem de retrato de rosa colorida no braço",
      destaque: "destaque-largo"
    }
  ],

  "autoral-ilustrativo": [
    {
      src: "src/lw.jpg",
      alt: "Tatuagem autoral no antebraço",
      destaque: "destaque-grande"
    },
    {
      src: "src/rita2.jpg",
      alt: "Tatuagem autoral nas costas"
    },
    {
      src: "src/v2.jpg",
      alt: "Tatuagem autoral na coxa"
    },
    {
      src: "src/kirishi.jpg",
      alt: "Tatuagem ilustrativa de rosa colorida no braço",
      destaque: "destaque-largo"
    }
  ]
};

const secoesGaleria = document.querySelectorAll(".galeria-estilo");

secoesGaleria.forEach((secao) => {
  const chaveGaleria = secao.dataset.galeria;
  const fotosDaGaleria = galeriasPorEstilo[chaveGaleria] || [];

  const preview = secao.querySelector(".galeria-preview");
  const setaAnterior = secao.querySelector(
    ".galeria-seta-preview-esquerda"
  );
  const setaProxima = secao.querySelector(
    ".galeria-seta-preview-direita"
  );
  const botaoMostrar = secao.querySelector(
    ".botao-mostrar-galeria"
  );
  const wrapperExpandido = secao.querySelector(
    ".galeria-expandida-wrapper"
  );

  let galeriaJaMontada = false;
  // ===== CARROSSEL SIMPLES: SOBRE O ESTÚDIO =====

document.querySelectorAll(".carrossel-simples").forEach((carrossel) => {
  const trilho = carrossel.querySelector(".carrossel-simples-trilho");
  const anterior = carrossel.querySelector(".carrossel-simples-anterior");
  const proxima = carrossel.querySelector(".carrossel-simples-proxima");
  const itens = carrossel.querySelectorAll(".carrossel-simples-item");

  if (!trilho || !anterior || !proxima || !itens.length) return;

  function larguraDoPasso() {
    const primeiroItem = trilho.querySelector(".carrossel-simples-item");
    if (!primeiroItem) return 0;

    const larguraItem = primeiroItem.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(trilho).gap) || 0;

    return larguraItem + gap;
  }

  function atualizarSetas() {
    const inicio = trilho.scrollLeft <= 4;

    const fim =
      trilho.scrollLeft + trilho.clientWidth >=
      trilho.scrollWidth - 4;

    anterior.classList.toggle("desabilitada", inicio);
    proxima.classList.toggle("desabilitada", fim);
  }

  anterior.addEventListener("click", () => {
    trilho.scrollBy({
      left: -larguraDoPasso(),
      behavior: "smooth"
    });
  });

  proxima.addEventListener("click", () => {
    trilho.scrollBy({
      left: larguraDoPasso(),
      behavior: "smooth"
    });
  });

  let frameAgendado = false;

  trilho.addEventListener(
    "scroll",
    () => {
      if (frameAgendado) return;

      frameAgendado = true;

      requestAnimationFrame(() => {
        atualizarSetas();
        frameAgendado = false;
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", atualizarSetas);
  atualizarSetas();

  itens.forEach((item, indice) => {
    item.addEventListener("click", () => {
      const imagens = Array.from(
        trilho.querySelectorAll(".carrossel-simples-item img")
      ).map((img) => ({
        src: img.src,
        alt: img.alt
      }));

      abrirLightboxGaleria(imagens, indice);
    });
  });
});

  // ===== PREVIEW: SETAS =====
  function larguraDoPasso() {
    const primeiroItem = preview?.querySelector(
      ".galeria-preview-item"
    );

    if (!primeiroItem) return 0;

    const larguraItem = primeiroItem.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(preview).gap) || 0;

    return larguraItem + gap;
  }

  function atualizarEstadoSetas() {
    if (!preview || !setaAnterior || !setaProxima) return;

    const inicio = preview.scrollLeft <= 4;

    const fim =
      preview.scrollLeft + preview.clientWidth >=
      preview.scrollWidth - 4;

    setaAnterior.classList.toggle("desabilitada", inicio);
    setaProxima.classList.toggle("desabilitada", fim);
  }

  if (preview && setaAnterior && setaProxima) {
    setaAnterior.addEventListener("click", () => {
      preview.scrollBy({
        left: -larguraDoPasso(),
        behavior: "smooth"
      });
    });

    setaProxima.addEventListener("click", () => {
      preview.scrollBy({
        left: larguraDoPasso(),
        behavior: "smooth"
      });
    });

    let frameAgendado = false;

    preview.addEventListener(
      "scroll",
      () => {
        if (frameAgendado) return;

        frameAgendado = true;

        requestAnimationFrame(() => {
          atualizarEstadoSetas();
          frameAgendado = false;
        });
      },
      { passive: true }
    );

    window.addEventListener("resize", atualizarEstadoSetas);
    atualizarEstadoSetas();
  }

  // ===== PREVIEW: CLIQUE / LIGHTBOX =====
  if (preview) {
    const botoesPreview = preview.querySelectorAll(
      ".galeria-preview-item"
    );

    botoesPreview.forEach((botaoPreview, indice) => {
      botaoPreview.addEventListener("click", () => {
        const itensPreview = Array.from(
          preview.querySelectorAll(".galeria-preview-item img")
        ).map((img) => ({
          src: img.src,
          alt: img.alt
        }));

        abrirLightboxGaleria(itensPreview, indice);
      });
    });
  }

  // ===== MOSAICO: MONTAGEM =====
  function montarGaleriaExpandida() {
    if (!wrapperExpandido) return;

    const cardsHTML = fotosDaGaleria
      .map((foto, indice) => {
        const classeDestaque = foto.destaque
          ? ` ${foto.destaque}`
          : "";

        return `
          <button
            class="galeria-card${classeDestaque}"
            type="button"
            data-indice="${indice}"
            aria-label="Ampliar foto: ${foto.alt}"
          >
            <img
              src="${foto.src}"
              alt="${foto.alt}"
              loading="lazy"
            >
          </button>
        `;
      })
      .join("");

    wrapperExpandido.innerHTML = `
      <div class="galeria-mosaico">
        ${cardsHTML}
      </div>
    `;

    ativarCliqueNosCards();
  }

  // ===== MOSAICO: CLIQUE / LIGHTBOX =====
  function ativarCliqueNosCards() {
    if (!wrapperExpandido) return;

    wrapperExpandido
      .querySelectorAll(".galeria-card")
      .forEach((card) => {
        card.addEventListener("click", () => {
          const cards = Array.from(
            wrapperExpandido.querySelectorAll(".galeria-card")
          );

          const itensMosaico = cards.map((item) => {
            const img = item.querySelector("img");

            return {
              src: img.src,
              alt: img.alt
            };
          });

          const indice = cards.indexOf(card);
          abrirLightboxGaleria(itensMosaico, indice);
        });
      });
  }

  // ===== EXPANDIR / RECOLHER =====
  function expandirGaleria() {
    if (!wrapperExpandido || !botaoMostrar) return;

    if (!galeriaJaMontada) {
      montarGaleriaExpandida();
      galeriaJaMontada = true;
    }

    wrapperExpandido.hidden = false;

    requestAnimationFrame(() => {
      wrapperExpandido.style.maxHeight =
        `${wrapperExpandido.scrollHeight}px`;
    });

    wrapperExpandido
      .querySelectorAll(".galeria-card")
      .forEach((card, indice) => {
        setTimeout(() => {
          card.classList.add("visivel");
        }, 120 + indice * 45);
      });

    botaoMostrar.setAttribute("aria-expanded", "true");

    const textoBotao = botaoMostrar.querySelector(".texto-botao");
    if (textoBotao) {
      textoBotao.textContent = "Mostrar menos";
    }
  }

  function recolherGaleria() {
    if (!wrapperExpandido || !botaoMostrar) return;

    wrapperExpandido.style.maxHeight = "0px";

    wrapperExpandido
      .querySelectorAll(".galeria-card")
      .forEach((card) => {
        card.classList.remove("visivel");
      });

    botaoMostrar.setAttribute("aria-expanded", "false");

    const textoBotao = botaoMostrar.querySelector(".texto-botao");
    if (textoBotao) {
      textoBotao.textContent = "Mostrar mais";
    }
  }

  if (botaoMostrar && wrapperExpandido) {
    botaoMostrar.addEventListener("click", () => {
      const estaExpandido =
        botaoMostrar.getAttribute("aria-expanded") === "true";

      if (estaExpandido) {
        recolherGaleria();
      } else {
        expandirGaleria();
      }
    });
  }

  window.addEventListener("resize", () => {
    const estaExpandido =
      botaoMostrar?.getAttribute("aria-expanded") === "true";

    if (estaExpandido && wrapperExpandido) {
      wrapperExpandido.style.maxHeight =
        `${wrapperExpandido.scrollHeight}px`;
    }
  });
});
// ===== FOTOS DOS ARTISTAS: LIGHTBOX =====

const botoesFotosArtistas = document.querySelectorAll(
  ".artista-foto-botao"
);

botoesFotosArtistas.forEach((botao, indice) => {
  botao.addEventListener("click", () => {
    const itensArtistas = Array.from(botoesFotosArtistas)
      .map((item) => {
        const imagem = item.querySelector("img");

        return {
          src: imagem.src,
          alt: imagem.alt
        };
      });

    abrirLightboxGaleria(itensArtistas, indice);
  });
});