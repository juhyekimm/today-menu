/* =====================================================================
   anju.js — 술을 고르면 어울리는 안주를 딱 하나 무작위로 추천
   GET 방식 : anju.html?drink=beer 처럼 주소로 넘어온 값을 읽음
   ===================================================================== */
const select = document.getElementById("drink");

/* ---------- 1. 술 고르기 목록 만들기 (종류별로 optgroup) ---------- */
const groups = {};
Object.keys(DRINKS).forEach(function (key) {
  const drink = DRINKS[key];
  if (!groups[drink.group]) {
    groups[drink.group] = document.createElement("optgroup");
    groups[drink.group].label = drink.group;
    select.appendChild(groups[drink.group]);
  }
  const option = document.createElement("option");
  option.value = key;
  option.textContent = drink.label;
  groups[drink.group].appendChild(option);
});

/* ---------- 2. 추천 ---------- */
let currentKey = null;
let currentAnju = null;

function recommend(key) {
  const drink = DRINKS[key];
  currentKey = key;
  currentAnju = pickRandom(drink.anju, currentAnju);

  document.getElementById("anju-glass").textContent = drink.glass;
  document.getElementById("anju-drink").textContent = drink.label;
  document.getElementById("anju-emoji").textContent = currentAnju[1];
  const name = document.getElementById("anju-name");
  name.textContent = currentAnju[0] + "!";
  name.classList.remove("pop");
  void name.offsetWidth;
  name.classList.add("pop");

  document.getElementById("hangover-name").textContent = drink.hangover;
  document.getElementById("hangover-link").href = "https://map.naver.com/p/search/" + encodeURIComponent(drink.hangover);

  document.getElementById("anju-empty").hidden = true;
  document.getElementById("anju-filled").hidden = false;
}

const drinkKey = getParam("drink");
if (drinkKey && DRINKS[drinkKey]) {
  select.value = drinkKey;
  recommend(drinkKey);
}

/* 같은 술로 다른 안주 하나 더 */
document.getElementById("reroll").addEventListener("click", function () {
  if (currentKey) recommend(currentKey);
});

/* 건배 : 잔 부딪히는 소리 + 잔 흔들기 */
document.getElementById("cheers").addEventListener("click", function () {
  const glass = document.getElementById("anju-glass");
  playSound("cheers-sound");
  glass.classList.remove("clink");
  void glass.offsetWidth;
  glass.classList.add("clink");
});

/* ---------- 3. 궁합표 (분류가 같으면 rowspan 으로 묶기) ---------- */
(function buildTable() {
  const tbody = document.getElementById("match-table");
  const byGroup = {};
  Object.keys(DRINKS).forEach(function (key) {
    const d = DRINKS[key];
    (byGroup[d.group] = byGroup[d.group] || []).push(d);
  });
  Object.keys(byGroup).forEach(function (group) {
    byGroup[group].forEach(function (d, i) {
      const tr = document.createElement("tr");
      if (i === 0) {
        const th = document.createElement("th");
        th.scope = "row";
        th.rowSpan = byGroup[group].length;
        th.textContent = group;
        tr.appendChild(th);
      }
      const drink = document.createElement("td");
      drink.textContent = d.glass + " " + d.label;
      const anju = document.createElement("td");
      anju.textContent = d.anju.map(function (a) { return a[0]; }).join(", ");
      tr.append(drink, anju);
      tbody.appendChild(tr);
    });
  });
})();
