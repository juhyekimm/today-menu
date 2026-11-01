/* =====================================================================
   mukbang.js — 화면 속 TV 에서 먹방이 계속 재생되도록
   - 유튜브 IFrame API 사용
   - 영상이 끝나면 다음 영상 자동 재생
   - 퍼가기가 막힌 영상은 오류가 나는 즉시 다음 영상으로 건너뜀
   - 브라우저 정책상 처음엔 소리 없이 시작, 화면을 한 번 누르면 소리 켜짐
   ===================================================================== */
const wantLink = document.getElementById("want");
const statusEl = document.getElementById("video-status");
let ytPlayer = null;
let currentVideo = null;
let failedIds = [];

function showInfo(video) {
  document.getElementById("video-title").textContent = video.title;
  const menu = findMenu(video.menu);
  if (menu) {
    wantLink.href = "roulette.html?pick=" + encodeURIComponent(menu.name);
    wantLink.textContent = "이 메뉴로 정하기";
  } else {
    wantLink.href = "dessert.html";
    wantLink.textContent = "디저트 뽑으러 가기";
  }
}

/* 아직 실패하지 않은 영상 중에서 하나 고르기 */
function nextVideo() {
  const usable = VIDEOS.filter(function (v) { return !failedIds.includes(v.id); });
  if (usable.length === 0) return null;
  return pickRandom(usable, currentVideo);
}

function playVideo(video) {
  currentVideo = video;
  showInfo(video);
  ytPlayer.loadVideoById(video.id);
}

/* 유튜브 API 가 준비되면 자동으로 불리는 함수 */
function onYouTubeIframeAPIReady() {
  /* HTML 에 이미 있는 iframe(#player)에 연결 */
  ytPlayer = new YT.Player("player", {
    events: {
      onReady: function (e) {
        e.target.mute();
        playVideo(nextVideo());
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.ENDED) {
          const v = nextVideo();
          if (v) playVideo(v);
        }
      },
      onError: function () {
        failedIds.push(currentVideo.id);
        const v = nextVideo();
        if (v) {
          playVideo(v);
        } else {
          statusEl.hidden = false;
        }
      }
    }
  });
}

document.getElementById("next-video").addEventListener("click", function () {
  if (!ytPlayer) return;
  const v = nextVideo();
  if (v) playVideo(v);
});

/* 화면을 처음 누르면 소리 켜기 */
function unmuteOnce() {
  if (ytPlayer && ytPlayer.unMute) {
    ytPlayer.unMute();
    ytPlayer.setVolume(60);
  }
  window.removeEventListener("pointerdown", unmuteOnce);
  window.removeEventListener("keydown", unmuteOnce);
}
window.addEventListener("pointerdown", unmuteOnce);
window.addEventListener("keydown", unmuteOnce);

/* 인터넷이 안 돼서 유튜브 API 를 못 불러온 경우 */
setTimeout(function () {
  if (!ytPlayer) {
    document.getElementById("video-title").textContent = "먹방을 불러오지 못했어요";
    statusEl.hidden = false;
  }
}, 8000);
