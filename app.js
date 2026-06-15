const CONFIG = {
  // Apps Script web app URL을 배포 후 여기에 붙여 넣으면 구글시트로 문의가 저장됩니다.
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbwWKwyRAqOXQJi6OieEBAWQIpmmPACn1qzEoCASXgnwIturt7WyiBakN6i2pwYZJ9EP1g/exec"
};

const posts = [
  {
    category: "어르신 활동",
    date: "2026.06.13",
    title: "80대 어르신들이 계란 탁구에 진심이 된 이유?",
    excerpt: "마더책방 최인정 단장의 데이케어센터 그림책 인지활동 현장입니다.",
    href: "https://blog.naver.com/booknori2025/224314721430",
    image: "assets/naver-thumb-01.jpg?v=3"
  },
  {
    category: "어르신 활동",
    date: "2026.06.13",
    title: "AI 그림책 '코뿔소 파투'가 만든 특별한 변화",
    excerpt: "박경희 강사가 양평경로당과 신길3동 경로당에서 진행한 어르신 책놀이 현장입니다.",
    href: "https://blog.naver.com/booknori2025/224314683526",
    image: "assets/naver-thumb-02.jpg?v=3"
  },
  {
    category: "어르신 활동",
    date: "2026.06.13",
    title: "월드컵보다 재미있었다는 방학경로당 책놀이",
    excerpt: "고아라 강사의 그림책 기반 평생학습, 언어인지, 회상활동 수업 기록입니다.",
    href: "https://blog.naver.com/booknori2025/224314533121",
    image: "assets/naver-thumb-03.jpg?v=3"
  },
  {
    category: "대외 활동",
    date: "2026.06.12",
    title: "환경교육 전문가 허은혜 강사 신규 입단",
    excerpt: "환경교육, 평생교육, 독서교육, 보드게임 교육까지 넓은 전문성을 가진 새 활동가 소식입니다.",
    href: "https://blog.naver.com/booknori2025/224314204887",
    image: "assets/naver-thumb-04.png?v=3"
  },
  {
    category: "어르신 활동",
    date: "2026.06.12",
    title: "치매안심센터에 뜬 보드게임 정예군단",
    excerpt: "김지영, 정민희 강사와 최인정 단장이 함께한 인지강화 보드게임 프로그램입니다.",
    href: "https://blog.naver.com/booknori2025/224313492542",
    image: "assets/naver-thumb-05.jpg?v=3"
  },
  {
    category: "아동 활동",
    date: "2026.06.12",
    title: "초등 늘봄교실 구름 무드등 수업",
    excerpt: "고진희 강사의 그림책 독서교실과 창의 체험을 연결한 수업 후기입니다.",
    href: "https://blog.naver.com/booknori2025/224313482168",
    image: "assets/naver-thumb-06.jpg?v=3"
  },
  {
    category: "아동 활동",
    date: "2026.06.12",
    title: "지역아동센터 문해력 독서수업",
    excerpt: "정민희 강사가 그림책과 글쓰기 활동으로 아이들의 자기표현을 이끈 현장입니다.",
    href: "https://blog.naver.com/booknori2025/224313474829",
    image: "assets/naver-thumb-07.png?v=3"
  },
  {
    category: "대외 활동",
    date: "2026.05.25",
    title: "50플러스부터 치매안심센터까지 확장된 6월 변화",
    excerpt: "신규 경로당, 늘봄학교, 50플러스, AI 그림책 프로젝트로 확장되는 운영 안내입니다.",
    href: "https://blog.naver.com/booknori2025/224295721505",
    image: "assets/naver-thumb-08.png?v=3"
  }
];

const postGrid = document.querySelector("#postGrid");
const form = document.querySelector("#inquiryForm");
const statusEl = document.querySelector("#formStatus");

function renderPosts() {
  postGrid.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='assets/thumb-community.svg?v=2'" />
          <div class="post-body">
            <span class="post-meta">${post.category} · ${post.date}</span>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="${post.href}" target="_blank" rel="noreferrer">현장 자세히 보기</a>
          </div>
        </article>
      `
    )
    .join("");
}

function saveLocalInquiry(payload) {
  const saved = JSON.parse(localStorage.getItem("motherBookInquiries") || "[]");
  saved.push(payload);
  localStorage.setItem("motherBookInquiries", JSON.stringify(saved));
}

async function submitInquiry(payload) {
  if (!CONFIG.appsScriptUrl) {
    saveLocalInquiry(payload);
    return "local";
  }

  await fetch(CONFIG.appsScriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return "remote";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "문의 내용을 접수하는 중입니다.";

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.createdAt = new Date().toISOString();

  try {
    const mode = await submitInquiry(payload);
    form.reset();
    statusEl.textContent =
      mode === "remote"
        ? "접수되었습니다. 구글시트에서 문의 내용을 확인할 수 있습니다."
        : "접수 예시가 브라우저에 저장되었습니다. Apps Script URL을 연결하면 구글시트로 저장됩니다.";
  } catch (error) {
    statusEl.textContent = "접수 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.";
  }
});

renderPosts();
