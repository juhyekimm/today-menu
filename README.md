# 오늘 뭐먹지? — 관심사 소개 웹페이지 과제

메뉴 고르기가 제일 어려운 사람을 위한 사이트입니다.
메뉴 룰렛, 디저트 뽑기, 술안주 추천, 랜덤 먹방으로 "오늘 뭐 먹지" 고민을 대신 해결해 줍니다.

## 여는 방법
- `index.html` 을 브라우저로 열면 됩니다.
- 유튜브 영상은 파일을 더블클릭해서 열면(`file://`) 유튜브가 재생을 막습니다(오류 153).
  VS Code 의 **Live Server** 로 열거나, GitHub Pages 주소로 열어 주세요.
- 배경음악은 브라우저 정책상 화면을 처음 한 번 누르는 순간부터 재생됩니다.
- 글꼴(Jua, Gowun Dodum)은 Google Fonts 에서 불러오므로 인터넷이 연결되어 있어야 합니다.

## 파일 구조
```
today-menu/
├─ index.html      메인 (오늘의 추천, 바로가기, 이번 주 식단표)
├─ roulette.html   메뉴 룰렛 (메뉴 56가지, 기회 3번, 전체 메뉴표)
├─ dessert.html    디저트 뽑기통 + 도감 (디저트 34가지)
├─ anju.html       안주 뭐 먹지 (술 21가지, GET 폼, 술 × 안주 궁합표)
├─ mukbang.html    랜덤 먹방 (유튜브 임베드, 끝나면 다음 영상 자동 재생)
├─ css/
│  ├─ common.css   모든 페이지 공통 (색 변수, 헤더, 카드, 버튼, 표, 마스코트, 커서)
│  ├─ index.css · roulette.css · dessert.css · anju.css · mukbang.css  (페이지 전용)
├─ js/
│  ├─ data.js      메뉴 · 디저트 · 안주 · 영상 목록 (여기만 고치면 전체 반영)
│  ├─ common.js    공통 함수
│  └─ index.js · roulette.js · dessert.js · anju.js · mukbang.js
├─ img/            직접 그린 SVG (연어초밥 캐릭터, 연어초밥 커서)
├─ sound/          직접 만든 소리 (배경음악, 룰렛 띠링, 뽑기, 건배)
├─ 레이아웃_도안/   (캔버스에서 내보낸 도안 PDF · 이미지를 넣는 곳)
└─ prompts.txt     사용한 생성형 AI 와 프롬프트
```

## 평가 항목별 위치
| 항목 | 어디서 확인하나요 |
|---|---|
| 1. HTML 기본 구조 | 모든 html 파일 맨 위 (DOCTYPE, html, head, body) |
| 2. TABLE | index.html 식단표 (rowspan · colspan · caption · thead/tbody 직접 작성), roulette.html 전체 메뉴표 · anju.html 궁합표 (data.js 로 자동 생성, rowspan) |
| 3. 하이퍼링크 | 상단 메뉴 5개, 지도 링크 56개(룰렛 메뉴표), 유튜브 검색 링크 6개(먹방), 해장 가게 찾기 |
| 3. 동영상 | mukbang.html 유튜브 임베드 |
| 3. 그림 | img/salmon-sushi.svg (메인 figure, 로고) |
| 3. 음악 | 모든 페이지 `<audio id="bgm">` 배경음악 (작은 소리로 계속 재생, 왼쪽 아래 버튼으로 끄기) + 효과음 3개 |
| 4. 시맨틱 태그 | header, nav, main, section, article, aside, figure, figcaption, footer |
| 5. 셀렉터 3종 이상 | css/common.css 맨 위 주석에 10가지 정리 |
| 6. CSS 10건 이상 | common.css 40건 이상 + 페이지별 css |
| 7. 레이아웃 도안 | 함께 첨부한 도안 파일 |
| 8. AI 프롬프트 | prompts.txt |

## 가산점 관련
1. **스타일 합치기 · 오버라이딩** : common.css → 페이지 css 순서로 불러오기,
   `.card` → `.card.dessert` 덮어쓰기 (dessert.css),
   anju.css 에서 색 변수만 바꿔 포차 테마로 전환 (body.pocha)
2. **GET 방식 실제 구현** : anju.html 폼 (`method="get"`) → `anju.html?drink=soju`
   주소의 값을 읽어 결과 표시. 그 밖에 `roulette.html?pick=`, `dessert.html?main=` 로 페이지끼리 값 전달
   **HTTPS** : GitHub Pages 로 배포하면 `https://아이디.github.io/today-menu/` 주소가 생깁니다.
3. **유지보수** : 색 · 글꼴은 `:root` 변수 한 곳, 메뉴 목록은 `js/data.js` 한 곳에서 관리.
   룰렛 칸 · 메뉴표 · 술 목록 · 궁합표 · 도감이 목록 개수에 맞춰 자동으로 그려짐.
   먹방은 재생이 막힌 영상을 자동으로 건너뜀
4. **통일감** : 모든 페이지가 같은 헤더 · 카드 · 버튼 · 표 · 마스코트 · 커서 · 색 팔레트 사용

## 메뉴 추가하는 법
`js/data.js` 의 `MENUS` 에 한 줄 추가하면 룰렛판에 자동으로 칸이 생깁니다.
```js
{ type: "한식", name: "비빔밥", emoji: "🍚", pair: "약과", comment: "있는 재료 다 넣고 쓱쓱" },
```

## GitHub Pages 로 배포하기 (HTTPS)
1. GitHub 에 새 저장소를 만들고 이 폴더의 파일을 전부 올립니다.
2. Settings → Pages → Branch 를 `main` 으로 선택하고 Save.
3. 잠시 뒤 `https://아이디.github.io/저장소이름/` 주소로 접속됩니다.
