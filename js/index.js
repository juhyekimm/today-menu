/* 메인 : 오늘의 추천 메뉴를 무작위로 보여 줌 */
const today = pickRandom(MENUS);
document.getElementById("today-emoji").textContent = today.emoji;
document.getElementById("today-name").textContent = today.name;
document.getElementById("today-comment").textContent = today.comment;
/* GET 방식으로 룰렛 페이지에 메뉴 이름을 넘김 → roulette.html?pick=메뉴 */
document.getElementById("today-link").href = "roulette.html?pick=" + encodeURIComponent(today.name);
