/* =====================================================================
   roulette.js — 메뉴 룰렛 (메뉴 목록은 js/data.js)
   ===================================================================== */
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const chancesEl = document.getElementById("chances");
const nowShowing = document.getElementById("now-showing");
const resultCard = document.getElementById("result");

const SLICE_COLORS = ["#D7263D", "#FFF6EE", "#FF8A4C", "#FFB3BF"];
const SLICE = 360 / MENUS.length;
const EMOJI_RADIUS = 136;
const MAX_CHANCES = 3;

let chancesLeft = MAX_CHANCES;
let rotation = 0;
let spinning = false;

/* ---------- 1. 룰렛판 그리기 (메뉴 수에 맞춰 칸이 자동으로 나뉨) ---------- */
const stops = MENUS.map(function (menu, i) {
  return SLICE_COLORS[i % SLICE_COLORS.length] + " " + (i * SLICE) + "deg " + ((i + 1) * SLICE) + "deg";
});
wheel.style.background = "conic-gradient(" + stops.join(", ") + ")";

MENUS.forEach(function (menu, i) {
  const emoji = document.createElement("span");
  emoji.className = "wheel-emoji";
  emoji.textContent = menu.emoji;
  emoji.style.transform = "rotate(" + (i * SLICE + SLICE / 2) + "deg) translateY(-" + EMOJI_RADIUS + "px)";
  wheel.appendChild(emoji);
});

/* ---------- 2. 바늘 아래 메뉴 이름을 돌아가는 동안 계속 보여 주기 ---------- */
function currentAngle() {
  const m = getComputedStyle(wheel).transform;
  if (!m || m === "none") return 0;
  const v = m.match(/matrix\(([^)]+)\)/)[1].split(",").map(Number);
  return (Math.atan2(v[1], v[0]) * 180 / Math.PI + 360) % 360;
}

function menuUnderPointer() {
  const pointerAngle = (360 - currentAngle()) % 360;
  return MENUS[Math.floor(pointerAngle / SLICE) % MENUS.length];
}

function trackPointer() {
  const menu = menuUnderPointer();
  nowShowing.textContent = menu.emoji + " " + menu.name;
  if (spinning) requestAnimationFrame(trackPointer);
}

/* ---------- 3. 결과 카드 ---------- */
function showResult(menu) {
  nowShowing.textContent = menu.emoji + " " + menu.name;
  document.getElementById("result-emoji").textContent = menu.emoji;
  document.getElementById("result-name").textContent = menu.name + " 당첨!";
  document.getElementById("result-comment").textContent = menu.comment;
  document.getElementById("pair-name").textContent = menu.pair;
  /* GET 방식으로 디저트 페이지에 메뉴 이름을 넘김 → dessert.html?main=메뉴 */
  document.getElementById("pair-link").href = "dessert.html?main=" + encodeURIComponent(menu.name);
  document.getElementById("result-pair").hidden = false;

  resultCard.classList.remove("pop");
  void resultCard.offsetWidth;
  resultCard.classList.add("pop");
}

function updateChances() {
  chancesEl.textContent = chancesLeft > 0 ? "남은 기회 " + chancesLeft + "번" : "기회를 다 썼어요";
}

/* ---------- 4. 돌리기 ---------- */
spinBtn.addEventListener("click", function () {
  if (spinning || chancesLeft <= 0) return;
  spinning = true;
  spinBtn.disabled = true;

  const index = Math.floor(Math.random() * MENUS.length);
  const jitter = (Math.random() - 0.5) * SLICE * 0.6;
  const target = (360 - (index * SLICE + SLICE / 2 + jitter) + 360) % 360;
  const current = ((rotation % 360) + 360) % 360;
  rotation += 360 * 5 + ((target - current + 360) % 360);
  wheel.style.transform = "rotate(" + rotation + "deg)";
  requestAnimationFrame(trackPointer);

  setTimeout(function () {
    spinning = false;
    chancesLeft--;
    updateChances();
    playSound("ding");
    showResult(MENUS[index]);

    if (chancesLeft === 0) {
      document.getElementById("final-msg").hidden = false;
      document.getElementById("restart").hidden = false;
    } else {
      spinBtn.disabled = false;
    }
  }, reduceMotion ? 100 : 4100);
});

/* ---------- 5. 전체 메뉴 표 (종류가 같으면 rowspan 으로 묶기) ---------- */
(function buildTable() {
  const tbody = document.getElementById("menu-table");
  document.getElementById("menu-count").textContent = MENUS.length;

  const groups = [];
  MENUS.forEach(function (menu) {
    let g = groups.find(function (x) { return x.type === menu.type; });
    if (!g) { g = { type: menu.type, items: [] }; groups.push(g); }
    g.items.push(menu);
  });

  groups.forEach(function (g) {
    g.items.forEach(function (menu, i) {
      const tr = document.createElement("tr");
      if (i === 0) {
        const th = document.createElement("th");
        th.scope = "row";
        th.rowSpan = g.items.length;
        th.textContent = g.type;
        tr.appendChild(th);
      }
      const name = document.createElement("td");
      name.textContent = menu.emoji + " " + menu.name;
      const desc = document.createElement("td");
      desc.textContent = menu.comment;
      const map = document.createElement("td");
      const a = document.createElement("a");
      a.href = "https://map.naver.com/p/search/" + encodeURIComponent(menu.name);
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "지도에서 찾기";
      map.appendChild(a);
      tr.append(name, desc, map);
      tbody.appendChild(tr);
    });
  });
})();

/* ---------- 6. 다른 페이지에서 ?pick=메뉴 로 넘어온 경우 ---------- */
const picked = findMenu(getParam("pick") || "");
if (picked) {
  const banner = document.getElementById("pick-banner");
  banner.textContent = "‘" + picked.name + "’ 골라서 왔네요. 룰렛 안 돌려도 오늘은 이거예요!";
  banner.hidden = false;
  showResult(picked);
}
