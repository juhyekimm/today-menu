/* =====================================================================
   common.js — 모든 페이지에서 같이 쓰는 작은 함수 모음
   ===================================================================== */

/* 효과음 재생 (처음부터 다시) */
function playSound(id) {
  const audio = document.getElementById(id);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(function () {});
}

/* 주소창의 ?이름=값 읽기 (GET 방식으로 넘어온 값) */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* 목록에서 하나 무작위로 고르기 (except 와 같은 건 피함) */
function pickRandom(list, except) {
  if (list.length < 2) return list[0];
  let item;
  do {
    item = list[Math.floor(Math.random() * list.length)];
  } while (item === except);
  return item;
}

/* 이름으로 메뉴 / 디저트 찾기 */
function findMenu(name) {
  return MENUS.find(function (m) { return m.name === name; });
}

function findDessert(name) {
  return DESSERTS.find(function (d) { return d.name === name; });
}

/* 움직임 줄이기 설정을 켠 사용자인지 */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =====================================================================
   배경음악 — 모든 페이지에서 작은 소리로 계속 재생
   - 페이지를 옮겨도 이어서 재생되도록 재생 위치를 기억
   - 브라우저가 소리 자동 재생을 막으면, 화면을 처음 누르는 순간 바로 시작
   - 왼쪽 아래 작은 버튼으로 끄고 켤 수 있음
   ===================================================================== */
(function () {
  const bgm = document.getElementById("bgm");
  const toggle = document.getElementById("bgm-toggle");
  if (!bgm) return;

  const TIME_KEY = "todayMenu.bgmTime";
  const MUTE_KEY = "todayMenu.bgmOff";
  let off = false;
  try { off = localStorage.getItem(MUTE_KEY) === "1"; } catch (e) {}

  bgm.volume = 0.15;

  bgm.addEventListener("loadedmetadata", function () {
    try {
      const saved = parseFloat(sessionStorage.getItem(TIME_KEY));
      if (saved > 0 && saved < bgm.duration) bgm.currentTime = saved;
    } catch (e) {}
  });

  function updateButton() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", off ? "false" : "true");
    toggle.setAttribute("aria-label", off ? "배경음악 켜기" : "배경음악 끄기");
    toggle.classList.toggle("off", off);
  }

  function start() {
    if (off) return;
    bgm.play().catch(function () {});
  }

  /* 자동 재생이 막혔을 때 : 첫 클릭 · 터치 · 키 입력에 맞춰 시작 */
  function unlock() {
    start();
    ["pointerdown", "keydown", "touchstart"].forEach(function (type) {
      window.removeEventListener(type, unlock);
    });
  }
  ["pointerdown", "keydown", "touchstart"].forEach(function (type) {
    window.addEventListener(type, unlock);
  });

  if (toggle) {
    toggle.addEventListener("click", function () {
      off = !off;
      try { localStorage.setItem(MUTE_KEY, off ? "1" : "0"); } catch (e) {}
      if (off) bgm.pause(); else bgm.play().catch(function () {});
      updateButton();
    });
  }

  window.addEventListener("pagehide", function () {
    try { sessionStorage.setItem(TIME_KEY, String(bgm.currentTime)); } catch (e) {}
  });

  updateButton();
  start();
})();
