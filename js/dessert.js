/* =====================================================================
   dessert.js — 디저트 뽑기통 + 도감
   ===================================================================== */
const machine = document.getElementById("machine");
const lever = document.getElementById("lever");
const dropCapsule = document.getElementById("drop-capsule");
const openCapsule = document.getElementById("open-capsule");
const dogam = document.getElementById("dogam");
const dogamList = document.getElementById("dogam-list");
const STORAGE_KEY = "todayMenu.dessertDogam";

let busy = false;
let leverTurns = 0;

/* 뽑기통 속 캡슐 색 = 디저트 색 */
document.querySelectorAll(".capsule-in").forEach(function (capsule, i) {
  capsule.style.background = DESSERTS[Math.floor(Math.random() * DESSERTS.length)].color;
});

/* ---------- 도감 (브라우저에 저장) ---------- */
function loadDogam() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function saveDogam() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collected));
  } catch (e) { /* 저장이 안 돼도 페이지는 그대로 동작 */ }
}

let collected = loadDogam();

function renderDogam() {
  dogamList.textContent = "";
  DESSERTS.forEach(function (d) {
    const li = document.createElement("li");
    li.dataset.got = collected.includes(d.name) ? "yes" : "no";
    const emoji = document.createElement("span");
    emoji.className = "dogam-emoji";
    emoji.textContent = d.emoji;
    li.appendChild(emoji);
    li.appendChild(document.createTextNode(d.name));
    dogamList.appendChild(li);
  });
  const got = DESSERTS.filter(function (d) { return collected.includes(d.name); }).length;
  document.getElementById("dogam-count").textContent = got + " / " + DESSERTS.length;
  dogam.classList.toggle("complete", got === DESSERTS.length);
}

document.getElementById("dogam-reset").addEventListener("click", function () {
  collected = [];
  saveDogam();
  renderDogam();
});

/* ---------- 뽑기 ---------- */
lever.addEventListener("click", function () {
  if (busy) return;
  busy = true;
  lever.disabled = true;

  const pick = pickRandom(DESSERTS);
  leverTurns++;
  lever.style.transform = "rotate(" + (leverTurns * 360) + "deg)";
  machine.classList.add("shake");
  openCapsule.classList.remove("open");
  dropCapsule.classList.remove("drop");
  playSound("gacha-sound");

  const fast = reduceMotion ? 0.1 : 1;

  /* 캡슐이 출구로 굴러 나옴 */
  setTimeout(function () {
    dropCapsule.style.background = pick.color;
    void dropCapsule.offsetWidth;
    dropCapsule.classList.add("drop");
  }, 700 * fast);

  /* 캡슐이 열리며 결과 */
  setTimeout(function () {
    document.getElementById("cap-top").style.background = pick.color;
    document.getElementById("dessert-emoji").textContent = pick.emoji;
    document.getElementById("dessert-name").textContent = pick.name + "!";
    const isNew = !collected.includes(pick.name);
    document.getElementById("dessert-msg").textContent = pick.comment + (isNew ? " (도감에 새로 추가!)" : "");
    openCapsule.classList.add("open");

    if (isNew) {
      collected.push(pick.name);
      saveDogam();
      renderDogam();
    }
    machine.classList.remove("shake");
    lever.disabled = false;
    busy = false;
  }, 1500 * fast);
});

/* ---------- 룰렛에서 넘어온 경우 (?main=메뉴) ---------- */
const mainMenu = findMenu(getParam("main") || "");
if (mainMenu) {
  const hint = document.getElementById("dessert-hint");
  hint.textContent = mainMenu.name + " 먹었다면 디저트는 " + mainMenu.pair + " 어때요? 근데 뽑기 결과가 우선!";
  hint.hidden = false;
}

renderDogam();
