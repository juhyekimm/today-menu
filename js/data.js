/* =====================================================================
   data.js — 사이트에 나오는 메뉴 · 디저트 · 술/안주 · 영상 목록
   [유지보수] 목록을 추가하거나 빼고 싶으면 이 파일만 고치면
   룰렛판, 메뉴표, 뽑기통, 도감, 안주 추천, 먹방이 전부 자동으로 바뀜
   ===================================================================== */

/* ---------- 메인 메뉴 (룰렛) ----------
   type : 종류(메뉴표에서 묶는 기준) / pair : 어울리는 디저트 (DESSERTS 의 name 과 같게) */
const MENUS = [
  /* 한식 */
  { type: "한식", name: "육회 비빔밥",   emoji: "🥩", pair: "아이스크림",        comment: "고소한 참기름 향이 당기는 날" },
  { type: "한식", name: "김치찌개",     emoji: "🍲", pair: "약과",             comment: "밥 두 공기 각" },
  { type: "한식", name: "된장찌개",     emoji: "🍲", pair: "인절미 토스트",     comment: "집밥이 그리울 때" },
  { type: "한식", name: "제육볶음",     emoji: "🐷", pair: "아이스크림",        comment: "매콤달콤 밥도둑" },
  { type: "한식", name: "불고기",       emoji: "🥘", pair: "꿀떡",             comment: "달짝지근 실패 없는 맛" },
  { type: "한식", name: "삼겹살",       emoji: "🥓", pair: "아포가토",          comment: "지글지글 소리부터 맛있음" },
  { type: "한식", name: "부대찌개",     emoji: "🍲", pair: "요아정",           comment: "라면 사리는 필수" },
  { type: "한식", name: "순대국밥",     emoji: "🍜", pair: "붕어빵",           comment: "뜨끈하게 속 데우기" },
  { type: "한식", name: "냉면",        emoji: "🍜", pair: "팥빙수",           comment: "더운 날엔 무조건" },
  { type: "한식", name: "칼국수",       emoji: "🍜", pair: "호떡",             comment: "비 오는 날 생각나는 맛" },
  { type: "한식", name: "감자탕",       emoji: "🍖", pair: "약과",             comment: "뼈 발라 먹는 재미" },
  { type: "한식", name: "닭갈비",       emoji: "🍗", pair: "아이스크림",        comment: "마지막은 볶음밥으로" },
  { type: "한식", name: "보쌈",        emoji: "🥬", pair: "딸기 생크림 케이크", comment: "쌈 싸 먹는 행복" },
  { type: "한식", name: "족발",        emoji: "🍖", pair: "버블티",           comment: "쫀득쫀득 야식 대장" },
  { type: "한식", name: "갈비탕",       emoji: "🍲", pair: "꿀떡",             comment: "든든하게 한 그릇" },
  { type: "한식", name: "곱창",        emoji: "🔥", pair: "탕후루",           comment: "고소함 끝판왕" },
  { type: "한식", name: "찜닭",        emoji: "🍗", pair: "아이스크림",        comment: "당면부터 건져 먹기" },
  { type: "한식", name: "순두부찌개",   emoji: "🍲", pair: "푸딩",             comment: "보들보들 얼큰하게" },
  /* 일식 */
  { type: "일식", name: "모듬초밥",     emoji: "🍣", pair: "요아정",           comment: "이것저것 다 먹고 싶을 땐 모듬" },
  { type: "일식", name: "회",          emoji: "🐟", pair: "설빙",             comment: "초장에 콕, 깔끔하게" },
  { type: "일식", name: "후토마끼",     emoji: "🍱", pair: "두쫀쿠",           comment: "한 입 가득 꽉 찬 김밥" },
  { type: "일식", name: "연어초밥",     emoji: "🍣", pair: "아이스크림",        comment: "이 사이트 공식 최애 메뉴" },
  { type: "일식", name: "연어덮밥",     emoji: "🍚", pair: "젤라또",           comment: "연어 듬뿍 사케동" },
  { type: "일식", name: "돈까스",       emoji: "🍛", pair: "푸딩",             comment: "겉바속촉 바삭바삭" },
  { type: "일식", name: "라멘",        emoji: "🍜", pair: "에그타르트",        comment: "진한 국물에 차슈 한 장" },
  { type: "일식", name: "우동",        emoji: "🍜", pair: "붕어빵",           comment: "탱글한 면발 후루룩" },
  { type: "일식", name: "규동",        emoji: "🍚", pair: "말차 롤케이크",     comment: "빠르고 든든하게" },
  { type: "일식", name: "텐동",        emoji: "🍤", pair: "아포가토",          comment: "튀김 산 쌓아 올린 덮밥" },
  { type: "일식", name: "오코노미야키", emoji: "🥞", pair: "젤라또",           comment: "가쓰오부시 춤추는 거 구경" },
  { type: "일식", name: "장어덮밥",     emoji: "🍱", pair: "말차 롤케이크",     comment: "기운 내야 하는 날" },
  /* 중식 */
  { type: "중식", name: "마라탕",       emoji: "🌶️", pair: "탕후루",           comment: "얼얼하게 땀 쫙" },
  { type: "중식", name: "짜장면",       emoji: "🍝", pair: "꿀떡",             comment: "이사 안 해도 먹는 맛" },
  { type: "중식", name: "짬뽕",        emoji: "🍜", pair: "아이스크림",        comment: "얼큰한 해물 국물" },
  { type: "중식", name: "탕수육",       emoji: "🍖", pair: "버블티",           comment: "부먹 찍먹 논쟁은 내려놓고" },
  { type: "중식", name: "마라샹궈",     emoji: "🥘", pair: "과일 요거트",       comment: "재료 고르는 재미까지" },
  { type: "중식", name: "꿔바로우",     emoji: "🍖", pair: "탕후루",           comment: "쫀득 바삭 새콤달콤" },
  /* 분식 */
  { type: "분식", name: "엽떡",        emoji: "🌶️", pair: "요아정",           comment: "맵고 달고, 끝나면 쿨피스" },
  { type: "분식", name: "김밥",        emoji: "🍙", pair: "소금빵",           comment: "가볍게, 근데 맛있게" },
  { type: "분식", name: "라볶이",       emoji: "🍜", pair: "도넛",             comment: "떡볶이에 라면 한 사리" },
  { type: "분식", name: "순대",        emoji: "🌭", pair: "호떡",             comment: "간이랑 허파도 주세요" },
  { type: "분식", name: "쫄면",        emoji: "🍜", pair: "팥빙수",           comment: "새콤달콤 쫄깃쫄깃" },
  /* 치킨 */
  { type: "치킨", name: "허콤",        emoji: "🍗", pair: "카중 와플",        comment: "달달 짭짤 허니콤보" },
  { type: "치킨", name: "뿌링클",       emoji: "🍗", pair: "허니버터칩",       comment: "치즈 시즈닝 손가락까지" },
  { type: "치킨", name: "양념치킨",     emoji: "🍗", pair: "아이스크림",        comment: "근본 중의 근본" },
  { type: "치킨", name: "후라이드",     emoji: "🍗", pair: "츄러스",           comment: "바삭함 하나로 승부" },
  /* 양식 */
  { type: "양식", name: "피자랑 스파게티", emoji: "🍕", pair: "와대 샤머호정식", comment: "둘 다 시키면 고민 끝" },
  { type: "양식", name: "크림 파스타",   emoji: "🍝", pair: "티라미수",          comment: "꾸덕꾸덕 행복한 맛" },
  { type: "양식", name: "스테이크",     emoji: "🥩", pair: "바스크 치즈케이크", comment: "오늘은 나한테 주는 선물" },
  { type: "양식", name: "리조또",       emoji: "🍚", pair: "휘낭시에",          comment: "부드럽게 한 숟갈" },
  { type: "양식", name: "햄버거",       emoji: "🍔", pair: "오레오 쉐이크",     comment: "한 입 크게 와앙" },
  { type: "양식", name: "샌드위치",     emoji: "🥪", pair: "크로플",           comment: "가볍게 들고 먹기" },
  /* 아시안 */
  { type: "아시안", name: "쌀국수",     emoji: "🍜", pair: "버블티",           comment: "고수는 취향껏" },
  { type: "아시안", name: "팟타이",     emoji: "🍝", pair: "과일 요거트",       comment: "땅콩 가루 솔솔" },
  { type: "아시안", name: "커리",       emoji: "🍛", pair: "아이스크림",        comment: "난 찢어서 듬뿍" },
  { type: "아시안", name: "분짜",       emoji: "🥗", pair: "젤라또",           comment: "새콤한 소스에 푹" },
  { type: "아시안", name: "타코",       emoji: "🌮", pair: "츄러스",           comment: "한 손에 쏙" }
];

/* ---------- 디저트 (뽑기통 · 도감) ---------- color : 캡슐 색 */
const DESSERTS = [
  { name: "두쫀쿠",            emoji: "🍪", color: "#8B5A3C", comment: "쫀득쫀득 두바이 쫀득쿠키" },
  { name: "아이스크림",         emoji: "🍦", color: "#FFB3BF", comment: "실패 없는 국룰 디저트" },
  { name: "요아정",            emoji: "🍧", color: "#FFFFFF", comment: "토핑은 마음 가는 대로" },
  { name: "설빙",              emoji: "🍧", color: "#9AD0EC", comment: "눈꽃 빙수 한 그릇 나눠 먹기" },
  { name: "카중 와플",          emoji: "🧇", color: "#FFD166", comment: "바삭한 와플에 크림 듬뿍" },
  { name: "와대 샤머호정식",     emoji: "🍮", color: "#D7263D", comment: "오늘의 특별 디저트 정식" },
  { name: "허니버터칩",         emoji: "🥔", color: "#FF8A4C", comment: "달고 짠 과자로 마무리" },
  { name: "탕후루",            emoji: "🍓", color: "#E8394E", comment: "와그작 깨지는 설탕 코팅" },
  { name: "마카롱",            emoji: "🍬", color: "#C9A7EB", comment: "뚱카롱 하나면 충분" },
  { name: "크로플",            emoji: "🧇", color: "#D9A25F", comment: "크루아상으로 만든 와플" },
  { name: "붕어빵",            emoji: "🐟", color: "#C68642", comment: "팥 vs 슈크림, 둘 다" },
  { name: "호떡",              emoji: "🥞", color: "#B5713A", comment: "꿀 흘리지 않게 조심" },
  { name: "티라미수",           emoji: "🍰", color: "#6F4E37", comment: "쌉싸름 달콤 커피 케이크" },
  { name: "바스크 치즈케이크",   emoji: "🍰", color: "#A0522D", comment: "겉은 탄 듯, 속은 꾸덕" },
  { name: "초코케이크",         emoji: "🎂", color: "#4B2E2A", comment: "기분 꿀꿀할 땐 초코" },
  { name: "딸기 생크림 케이크",  emoji: "🍰", color: "#FF9AA2", comment: "생일 아니어도 먹어도 됨" },
  { name: "에그타르트",         emoji: "🥧", color: "#F4C542", comment: "바삭한 결에 부드러운 커스터드" },
  { name: "휘낭시에",           emoji: "🧈", color: "#E0B15B", comment: "버터 향 가득 한 입" },
  { name: "소금빵",            emoji: "🥐", color: "#E6C28A", comment: "짭짤 고소 갓 구운 빵" },
  { name: "도넛",              emoji: "🍩", color: "#FF6F91", comment: "구멍까지 맛있음" },
  { name: "츄러스",            emoji: "🥖", color: "#C98B4F", comment: "설탕 솔솔 길쭉하게" },
  { name: "팥빙수",            emoji: "🍧", color: "#8E3B46", comment: "팥 듬뿍 옛날 빙수" },
  { name: "젤라또",            emoji: "🍨", color: "#A8E6CF", comment: "쫀득한 이탈리아 아이스크림" },
  { name: "푸딩",              emoji: "🍮", color: "#FFC857", comment: "탱글탱글 흔들어 보기" },
  { name: "약과",              emoji: "🍪", color: "#9C5B2E", comment: "할매니얼 감성 디저트" },
  { name: "인절미 토스트",       emoji: "🍞", color: "#E8C872", comment: "콩고물 묻히고 먹기" },
  { name: "브라우니",           emoji: "🍫", color: "#5C3A21", comment: "꾸덕한 초코 덩어리" },
  { name: "아포가토",           emoji: "☕", color: "#3E2723", comment: "아이스크림에 에스프레소 콸콸" },
  { name: "버블티",            emoji: "🧋", color: "#C8A27C", comment: "펄은 무조건 추가" },
  { name: "과일 요거트",         emoji: "🥣", color: "#FFE3EC", comment: "상큼하게 입가심" },
  { name: "오레오 쉐이크",       emoji: "🥤", color: "#2E2E2E", comment: "빨대로 쭉 빨아 먹기" },
  { name: "말차 롤케이크",       emoji: "🍵", color: "#7FB069", comment: "쌉쌀한 녹차 크림" },
  { name: "두바이 초콜릿",       emoji: "🍫", color: "#4F7942", comment: "피스타치오 바삭바삭" },
  { name: "꿀떡",              emoji: "🍡", color: "#FF8FB1", comment: "한 입에 쏙, 꿀이 톡" }
];

/* ---------- 술 · 안주 ----------
   group : 고르기 목록에서 묶는 이름 / anju : 이 중에서 하나를 무작위로 추천 / hangover : 다음 날 해장 */
const DRINKS = {
  soju:       { group: "소주",       label: "소주",        glass: "🍶", hangover: "순대국밥",
                anju: [["삼겹살", "🥓"], ["국물 닭발", "🌶️"], ["오뎅탕", "🍢"], ["곱창볶음", "🔥"], ["감자탕", "🍖"]] },
  fruitsoju:  { group: "소주",       label: "과일소주",     glass: "🍑", hangover: "콩나물국밥",
                anju: [["떡볶이", "🌶️"], ["계란말이", "🍳"], ["치즈 불닭", "🧀"], ["나초", "🌮"]] },
  chungha:    { group: "소주",       label: "청하",        glass: "🍶", hangover: "재첩국",
                anju: [["모둠 회", "🐟"], ["연어 사시미", "🍣"], ["어묵탕", "🍢"], ["계란찜", "🥚"]] },
  rosechungha:{ group: "소주",       label: "로제청하",     glass: "🌸", hangover: "우동",
                anju: [["연어 사시미", "🍣"], ["크림 떡볶이", "🍝"], ["새우튀김", "🍤"], ["리코타 샐러드", "🥗"]] },
  maehwasu:   { group: "소주",       label: "매화수",       glass: "🌼", hangover: "북엇국",
                anju: [["모둠 전", "🥞"], ["두부김치", "🧈"], ["모둠 회", "🐟"]] },
  somaek:     { group: "소주",       label: "소맥",        glass: "🍻", hangover: "해장국",
                anju: [["치킨", "🍗"], ["족발", "🍖"], ["골뱅이무침", "🐚"], ["삼겹살", "🥓"]] },
  beer:       { group: "맥주",       label: "맥주",        glass: "🍺", hangover: "콩나물국밥",
                anju: [["치킨", "🍗"], ["감자튀김", "🍟"], ["노가리", "🐟"], ["소시지", "🌭"], ["피자", "🍕"]] },
  darkbeer:   { group: "맥주",       label: "흑맥주",       glass: "🍺", hangover: "쌀국수",
                anju: [["소시지", "🌭"], ["바비큐 폭립", "🍖"], ["견과류", "🥜"], ["피시앤칩스", "🐟"]] },
  craftbeer:  { group: "맥주",       label: "수제 맥주",     glass: "🍺", hangover: "쌀국수",
                anju: [["수제 버거", "🍔"], ["피시앤칩스", "🐟"], ["나초", "🌮"], ["감자튀김", "🍟"]] },
  makgeolli:  { group: "전통주",     label: "막걸리",       glass: "🍶", hangover: "북엇국",
                anju: [["파전", "🥞"], ["김치전", "🥞"], ["두부김치", "🧈"], ["도토리묵", "🥗"], ["보쌈", "🥬"]] },
  bokbunja:   { group: "전통주",     label: "복분자주",     glass: "🍇", hangover: "갈비탕",
                anju: [["장어구이", "🐍"], ["훈제 오리", "🦆"], ["수육", "🥩"], ["치즈", "🧀"]] },
  dongdongju: { group: "전통주",     label: "동동주",       glass: "🍶", hangover: "콩나물국밥",
                anju: [["해물파전", "🥞"], ["녹두전", "🥞"], ["묵사발", "🥣"]] },
  redwine:    { group: "와인",       label: "레드 와인",    glass: "🍷", hangover: "쌀국수",
                anju: [["스테이크", "🥩"], ["치즈 플래터", "🧀"], ["라자냐", "🍝"], ["하몽", "🥓"]] },
  whitewine:  { group: "와인",       label: "화이트 와인",   glass: "🥂", hangover: "우동",
                anju: [["해산물 파스타", "🍝"], ["연어 샐러드", "🥗"], ["굴", "🦪"], ["브리 치즈", "🧀"]] },
  rosewine:   { group: "와인",       label: "로제 와인",    glass: "🍷", hangover: "우동",
                anju: [["연어 카르파초", "🍣"], ["과일 플래터", "🍇"], ["리코타 샐러드", "🥗"]] },
  sparkling:  { group: "와인",       label: "스파클링 와인", glass: "🥂", hangover: "쌀국수",
                anju: [["딸기", "🍓"], ["카나페", "🍘"], ["굴", "🦪"], ["감자칩", "🥔"]] },
  highball:   { group: "양주 · 기타", label: "하이볼",       glass: "🥃", hangover: "우동",
                anju: [["가라아게", "🍗"], ["닭꼬치", "🍢"], ["교자", "🥟"], ["감자 고로케", "🥔"]] },
  whisky:     { group: "양주 · 기타", label: "위스키",       glass: "🥃", hangover: "북엇국",
                anju: [["다크 초콜릿", "🍫"], ["견과류", "🥜"], ["육포", "🥩"], ["치즈", "🧀"]] },
  sake:       { group: "양주 · 기타", label: "사케",        glass: "🍶", hangover: "우동",
                anju: [["모둠 사시미", "🍣"], ["오뎅탕", "🍢"], ["꼬치구이", "🍢"], ["타코와사비", "🐙"]] },
  goryangju:  { group: "양주 · 기타", label: "고량주",       glass: "🍶", hangover: "짬뽕",
                anju: [["꿔바로우", "🍖"], ["마라샹궈", "🥘"], ["깐풍기", "🍗"], ["양꼬치", "🍢"]] },
  cocktail:   { group: "양주 · 기타", label: "칵테일",       glass: "🍸", hangover: "쌀국수",
                anju: [["나초", "🌮"], ["감자튀김", "🍟"], ["과일 플래터", "🍇"], ["타코", "🌮"]] }
};

/* ---------- 먹방 영상 ----------
   id : 유튜브 주소 watch?v= 뒤 11글자 / menu : 연결할 룰렛 메뉴 이름 (없으면 "")
   재생이 막힌 영상은 자동으로 건너뛰므로 마음껏 추가해도 됨 */
const VIDEOS = [
  { id: "Gcakv7G4PBM", menu: "모듬초밥",       title: "초밥이랑 참치 먹방" },
  { id: "RK_nEgqUrc4", menu: "연어초밥",       title: "숙성 연어 이자카야 먹방" },
  { id: "Pdq4VoNf7tI", menu: "탕수육",         title: "옛날 중식당 먹방" },
  { id: "wHGHDJKorwY", menu: "뿌링클",         title: "바삭한 치킨 먹방" },
  { id: "VriakId3mz4", menu: "피자랑 스파게티", title: "피자랑 윙 먹방" },
  { id: "XIYbR6TwZBE", menu: "연어덮밥",       title: "초밥 볼 먹방" },
  { id: "hCGx-zy5y6M", menu: "",              title: "초코 케이크 먹방" }
];
