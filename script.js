/* ===== CONFIGURAÇÕES (mude aqui) ===== */
const CONFIG = {
  // Data e hora do encontro (ano, mês-1, dia, hora, minuto). Outubro = 9.
  eventDate: new Date(2026, 9, 5, 20, 10),

  // Texto que aparece digitando e apagando na "mensagem do WhatsApp"
  draftMessages: ["bora sair?", "oi sumida", "quer sair comigo sexta? digo, segunda", "esquece, vou fazer um site"],

  // Respostas que aparecem ao tocar na tarja do local (uma por toque)
  placeAnswers: [
    "Ainda em negociação com o destino. Ele tá pedindo muito.",
    "Tenho três opções e uma planilha. Sim, uma planilha.",
    "Dica: tem comida. Não é muita dica, eu sei.",
    "Se eu contar agora perde a graça. Confia em mim?",
    "Tá bom, vou revelar no dia. Prometo."
  ],

  // Respostas do botão "Vou pensar" (uma por clique)
  maybeAnswers: [
    "Justo. Eu espero. 🙂",
    "Pensou?",
    "Tô olhando o relógio aqui, sem pressão nenhuma.",
    "Ok, o botão cansou de esperar."
  ],

  // Mensagem enviada pelo botão do WhatsApp depois de aceitar
  whatsappText: "Vi o site. Aceito o convite ❤ Mas agora quero saber o local."
};

/* ===== Entrada suave das seções ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ===== Mensagem digitando e apagando ===== */
(function typing() {
  const el = document.getElementById("typing");
  let msg = 0, char = 0, deleting = false;
  function tick() {
    const text = CONFIG.draftMessages[msg];
    el.textContent = text.slice(0, char);
    if (!deleting && char < text.length) { char++; return setTimeout(tick, 90); }
    if (!deleting) { deleting = true; return setTimeout(tick, 1200); }
    if (char > 0) { char--; return setTimeout(tick, 40); }
    deleting = false; msg = (msg + 1) % CONFIG.draftMessages.length;
    setTimeout(tick, 600);
  }
  tick();
})();

/* ===== Contagem regressiva ===== */
(function countdown() {
  const units = {};
  document.querySelectorAll("[data-unit]").forEach((b) => (units[b.dataset.unit] = b));
  const pad = (n) => String(n).padStart(2, "0");
  function update() {
    let diff = Math.max(0, CONFIG.eventDate - new Date());
    if (diff === 0) document.getElementById("countdown-note").textContent = "chegou a hora. olha pela janela.";
    const d = Math.floor(diff / 864e5); diff %= 864e5;
    const h = Math.floor(diff / 36e5); diff %= 36e5;
    const m = Math.floor(diff / 6e4);
    const s = Math.floor((diff % 6e4) / 1000);
    units.d.textContent = pad(d); units.h.textContent = pad(h);
    units.m.textContent = pad(m); units.s.textContent = pad(s);
  }
  update(); setInterval(update, 1000);
})();

/* ===== Local secreto ===== */
(function place() {
  const btn = document.getElementById("redacted");
  const out = document.getElementById("place-answer");
  let i = 0;
  btn.addEventListener("click", () => {
    out.style.opacity = 0;
    setTimeout(() => {
      out.textContent = CONFIG.placeAnswers[i % CONFIG.placeAnswers.length];
      out.style.opacity = 1; i++;
    }, 250);
  });
})();

/* ===== Chance de beijo ===== */
document.getElementById("kiss-btn").addEventListener("click", (e) => {
  const out = document.getElementById("kiss-chance");
  const steps = ["12%", "47%", "83%", "99%"];
  let i = 0;
  e.target.disabled = true;
  const run = setInterval(() => {
    out.textContent = steps[i++];
    if (i === steps.length) {
      clearInterval(run);
      setTimeout(() => {
        out.textContent = "depende de você";
        out.style.fontSize = "1rem";
        e.target.textContent = "o algoritmo foi sincero";
      }, 700);
    }
  }, 350);
});

/* ===== Botão "Vou pensar" ===== */
(function maybe() {
  const btn = document.getElementById("btn-maybe");
  const note = document.getElementById("maybe-note");
  let i = 0;
  btn.addEventListener("click", () => {
    note.textContent = CONFIG.maybeAnswers[i];
    i++;
    if (i >= CONFIG.maybeAnswers.length) {
      btn.textContent = "Tá bom, topo 🙂";
      btn.onclick = accept;
    }
  });
})();

/* ===== Aceitar ===== */
document.getElementById("btn-yes").addEventListener("click", accept);
document.getElementById("whats").href = "https://wa.me/?text=" + encodeURIComponent(CONFIG.whatsappText);

function accept() {
  const screen = document.getElementById("accepted");
  screen.classList.add("show");
  screen.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  hearts();
}

/* Corações discretos subindo devagar */
function hearts() {
  const canvas = document.getElementById("hearts");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  function resize() { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  resize(); addEventListener("resize", resize);

  const colors = ["#e6bfba", "#9b1c2e", "#f5ede1"];
  const parts = Array.from({ length: 28 }, () => newHeart(true));
  function newHeart(initial) {
    return {
      x: Math.random() * innerWidth,
      y: initial ? innerHeight + Math.random() * innerHeight : innerHeight + 20,
      size: 6 + Math.random() * 10,
      speed: 0.3 + Math.random() * 0.6,
      drift: Math.random() * Math.PI * 2,
      alpha: 0.25 + Math.random() * 0.45,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }
  function drawHeart(p) {
    const s = p.size;
    ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y); ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
    ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
    ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
    ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
    ctx.fill(); ctx.restore();
  }
  (function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach((p, i) => {
      p.y -= p.speed; p.drift += 0.01; p.x += Math.sin(p.drift) * 0.3;
      if (p.y < -20) parts[i] = newHeart(false);
      drawHeart(p);
    });
    requestAnimationFrame(loop);
  })();
}
