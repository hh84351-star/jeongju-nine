/**
 * 정주는 아홉살 - Interactive Core Script (v4)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Tab Routing Simulator (4 Tabs)
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const pageSections = document.querySelectorAll('.page-section');
  const logoHomeTrigger = document.getElementById('logo-home-trigger');

  const switchTab = (targetId) => {
    tabBtns.forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    pageSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        section.classList.remove('active');
      }
    });
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.target);
    });
  });

  logoHomeTrigger.addEventListener('click', () => switchTab('about'));


  // ==========================================
  // 2. Application Form Modal Controllers
  // ==========================================
  const applyFormModal = document.getElementById('apply-form-modal');
  const navApplyBtn = document.getElementById('nav-apply-btn');
  const gardenBottomApplyBtn = document.getElementById('garden-bottom-apply-btn');
  const btnResultApplyRedirect = document.getElementById('btn-result-apply-redirect');
  const applyModalCloseBtn = document.getElementById('apply-modal-close-btn');

  const openApplyModal = () => {
    applyFormModal.classList.add('active');
  };

  const closeApplyModal = () => {
    applyFormModal.classList.remove('active');
  };

  // Bind open modal events
  navApplyBtn.addEventListener('click', openApplyModal);
  gardenBottomApplyBtn.addEventListener('click', openApplyModal);
  btnResultApplyRedirect.addEventListener('click', () => {
    resetQuiz();
    openApplyModal();
  });

  applyModalCloseBtn.addEventListener('click', closeApplyModal);
  applyFormModal.addEventListener('click', (e) => {
    if (e.target === applyFormModal) {
      closeApplyModal();
    }
  });


  // ==========================================
  // 3. Deterministic Doodle SVG Generator
  // ==========================================
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const generateDoodleSVG = (name, size = 60) => {
    const seed = getHash(name);
    
    // Choose styling options deterministically based on seed
    const hairStyle = seed % 5;
    const eyeStyle = (seed >> 2) % 4;
    const mouthStyle = (seed >> 4) % 4;
    const accessoryStyle = (seed >> 6) % 3;
    const blushColor = ['#FFAAA6', '#FFB5A7', '#FFCAD4'][seed % 3];

    let svg = `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Ears
    svg += `<path d="M 13 42 C 5 42, 5 52, 13 52" stroke="#19191B" stroke-width="4.5" fill="#FFFFFF" stroke-linecap="round" />`;
    svg += `<path d="M 87 42 C 95 42, 95 52, 87 52" stroke="#19191B" stroke-width="4.5" fill="#FFFFFF" stroke-linecap="round" />`;

    // Head Outline (slightly irregular shape for hand-drawn pencil feeling)
    const headOutlinePath = `M 50 16 C 82 16, 90 35, 87 70 C 84 84, 70 84, 50 84 C 30 84, 16 84, 13 70 C 10 35, 18 16, 50 16 Z`;
    svg += `<path d="${headOutlinePath}" stroke="#19191B" stroke-width="5" fill="#FFFFFF" stroke-linejoin="round" />`;

    // Blush
    svg += `<circle cx="26" cy="59" r="7" fill="${blushColor}" opacity="0.75" />`;
    svg += `<circle cx="74" cy="59" r="7" fill="${blushColor}" opacity="0.75" />`;

    // Hair Styles
    if (hairStyle === 0) {
      svg += `<path d="M 28 22 L 32 10 L 42 16 L 50 8 L 60 16 L 68 10 L 72 22" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />`;
    } else if (hairStyle === 1) {
      svg += `<path d="M 50 16 C 50 6, 42 3, 40 9 Q 40 15 50 16 Z M 50 16 C 50 6, 58 3, 60 9 Q 60 15 50 16 Z" fill="#10B981" stroke="#19191B" stroke-width="2.5" stroke-linejoin="round" />`;
    } else if (hairStyle === 2) {
      svg += `<path d="M 20 25 Q 35 15 50 25 Q 65 15 80 25" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
      svg += `<path d="M 32 20 Q 50 8 68 20" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
    } else if (hairStyle === 3) {
      svg += `<path d="M 50 16 Q 44 4 38 6" stroke="#19191B" stroke-width="3" stroke-linecap="round" fill="none" />`;
      svg += `<path d="M 50 16 Q 50 3 53 4" stroke="#19191B" stroke-width="3" stroke-linecap="round" fill="none" />`;
      svg += `<path d="M 50 16 Q 56 4 62 7" stroke="#19191B" stroke-width="3" stroke-linecap="round" fill="none" />`;
    } else {
      svg += `<path d="M 18 30 Q 32 18 50 26 Q 68 18 82 30" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
      svg += `<path d="M 50 26 L 50 16" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" />`;
    }

    // Eye Styles
    if (eyeStyle === 0) {
      svg += `<circle cx="36" cy="48" r="4" fill="#19191B" />`;
      svg += `<circle cx="64" cy="48" r="4" fill="#19191B" />`;
    } else if (eyeStyle === 1) {
      svg += `<path d="M 28 48 Q 36 40 44 48" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
      svg += `<circle cx="64" cy="48" r="4" fill="#19191B" />`;
    } else if (eyeStyle === 2) {
      svg += `<path d="M 28 48 Q 36 39 44 48" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
      svg += `<path d="M 56 48 Q 64 39 72 48" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
    } else {
      svg += `<circle cx="36" cy="48" r="6" fill="#19191B" />`;
      svg += `<circle cx="64" cy="48" r="6" fill="#19191B" />`;
      svg += `<circle cx="34" cy="45" r="2" fill="#FFFFFF" />`;
      svg += `<circle cx="62" cy="45" r="2" fill="#FFFFFF" />`;
    }

    // Mouth Styles
    if (mouthStyle === 0) {
      svg += `<path d="M 43 65 Q 50 72 57 65" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
    } else if (mouthStyle === 1) {
      svg += `<line x1="43" y1="66" x2="57" y2="66" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" />`;
    } else if (mouthStyle === 2) {
      svg += `<circle cx="50" cy="66" r="4.5" stroke="#19191B" stroke-width="3.5" fill="none" />`;
    } else {
      svg += `<path d="M 43 63 Q 50 71 57 63" stroke="#19191B" stroke-width="4.5" stroke-linecap="round" fill="none" />`;
      svg += `<path d="M 47 65 Q 50 73 53 65 Z" fill="#E63946" stroke="#19191B" stroke-width="1.5" />`;
    }

    // Accessories
    if (accessoryStyle === 1) {
      svg += `<circle cx="36" cy="48" r="10" stroke="#19191B" stroke-width="3" fill="none" />`;
      svg += `<circle cx="64" cy="48" r="10" stroke="#19191B" stroke-width="3" fill="none" />`;
      svg += `<line x1="46" y1="48" x2="54" y2="48" stroke="#19191B" stroke-width="3" />`;
    } else if (accessoryStyle === 2) {
      svg += `<path d="M 68 64 L 78 68 M 70 68 L 76 64" stroke="#19191B" stroke-width="2.5" stroke-linecap="round" />`;
    }

    svg += `</svg>`;
    return svg;
  };


  // ==========================================
  // 4. Garden Database & Floating Physics Engine
  // ==========================================
  let gardenCrew = [
    {
      name: "이도현",
      age: 23,
      affiliation: "한국대학교 사회학과",
      history: "감사 챌린지 2회",
      motivation: "개인주의가 만연한 사회에서 이웃과의 연결고리가 헐거워짐을 느끼던 차에, '아홉살'이라는 귀엽고 순수한 무브먼트의 가치에 반해 뛰어들었습니다. 편지를 쓸 때 정말 온몸이 훈훈해지더군요."
    },
    {
      name: "박하은",
      age: 21,
      affiliation: "서울예술대학교 시각디자인과",
      history: "온기 편지 배달 3회",
      motivation: "저의 작은 그림 재능으로 소방관분들과 경비실 아저씨들께 소소한 행복을 나눠드리고 싶었어요. 봉사를 진행하며 되려 제가 큰 위로와 선물을 받아갑니다."
    },
    {
      name: "최준식",
      age: 27,
      affiliation: "스타트업 개발자",
      history: "감사 챌린지 1회",
      motivation: "종일 컴퓨터 모니터의 코드만 바라보는 딱딱한 일상에서 벗어나, 대면 인사를 통해 사람 냄새 나는 문화를 체감하고 싶었습니다. 봉사는 노동이 아니라 정을 채우는 놀이예요."
    },
    {
      name: "양유리",
      age: 22,
      affiliation: "동국대학교 프랑스문학과",
      history: "온기 편지 배달 1회",
      motivation: "아무런 조건 없이 이웃을 도우며 기뻐하던 9살 적 기억을 되살리고 싶어 지원하게 되었습니다. 편지를 배달하며 나눈 소소한 눈맞춤들이 제 삶의 큰 원동력이 되었습니다."
    }
  ];

  const gardenField = document.getElementById('garden-field-container');
  const gardenCount = document.getElementById('garden-count');

  // Modal Detail DOM elements
  const memberModal = document.getElementById('garden-member-modal');
  const memberModalCloseBtn = document.getElementById('member-modal-close-btn');
  const modalDoodleAvatar = document.getElementById('modal-doodle-avatar');
  const modalMName = document.getElementById('modal-m-name');
  const modalMAge = document.getElementById('modal-m-age');
  const modalMAffiliation = document.getElementById('modal-m-affiliation');
  const modalMHistory = document.getElementById('modal-m-history');
  const modalMMotivation = document.getElementById('modal-m-motivation');

  // Array to hold floater physics states
  let floaters = [];

  const createFloaterDOM = (member) => {
    const floater = document.createElement('div');
    floater.className = 'garden-floater';
    
    const svgContent = generateDoodleSVG(member.name, 48);
    floater.innerHTML = `
      <div class="garden-floater-avatar">${svgContent}</div>
      <div class="garden-floater-name">${member.name}</div>
    `;

    // Click details popup (only if it wasn't dragged)
    floater.addEventListener('click', () => {
      if (floater.dataset.dragged === "true") {
        floater.dataset.dragged = "false"; // reset
        return;
      }
      openMemberModal(member);
    });

    return floater;
  };

  const openMemberModal = (member) => {
    modalDoodleAvatar.innerHTML = generateDoodleSVG(member.name, 80);
    modalMName.textContent = member.name;
    modalMAge.textContent = `9세 (실제 ${member.age}세)`;
    modalMAffiliation.textContent = member.affiliation;
    modalMHistory.textContent = member.history;
    modalMMotivation.textContent = member.motivation;
    memberModal.classList.add('active');
  };

  memberModalCloseBtn.addEventListener('click', () => {
    memberModal.classList.remove('active');
  });
  memberModal.addEventListener('click', (e) => {
    if (e.target === memberModal) {
      memberModal.classList.remove('active');
    }
  });

  // Draggable logic for garden members (with smart drag-vs-click detection)
  const makeDraggable = (element, member) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      
      // Read the latest real position from the global state (prevents jumping/shifting)
      const fIdx = floaters.findIndex(f => f.member === member);
      const posX = fIdx !== -1 ? floaters[fIdx].x : 0;
      const posY = fIdx !== -1 ? floaters[fIdx].y : 0;

      startX = e.clientX - posX;
      startY = e.clientY - posY;

      element.dataset.dragging = "true";
      element.dataset.dragged = "false";
      element.style.zIndex = 1000;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const fieldRect = gardenField.getBoundingClientRect();
      let x = e.clientX - startX;
      let y = e.clientY - startY;

      const minX = 0;
      const maxX = fieldRect.width - 72;
      const minY = 0;
      const maxY = fieldRect.height - 80;

      x = Math.max(minX, Math.min(x, maxX));
      y = Math.max(minY, Math.min(y, maxY));

      const fIdx = floaters.findIndex(f => f.member === member);
      if (fIdx !== -1) {
        // If moved more than 4px, set dragged flag to prevent detail modal on mouse release
        if (Math.abs(x - floaters[fIdx].x) > 4 || Math.abs(y - floaters[fIdx].y) > 4) {
          element.dataset.dragged = "true";
        }
        floaters[fIdx].x = x;
        floaters[fIdx].y = y;
      }

      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMouseUp = () => {
      isDragging = false;
      element.dataset.dragging = "false";
      element.style.zIndex = 10;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onTouchStart = (e) => {
      isDragging = true;
      const touch = e.touches[0];
      
      const fIdx = floaters.findIndex(f => f.member === member);
      const posX = fIdx !== -1 ? floaters[fIdx].x : 0;
      const posY = fIdx !== -1 ? floaters[fIdx].y : 0;

      startX = touch.clientX - posX;
      startY = touch.clientY - posY;

      element.dataset.dragging = "true";
      element.dataset.dragged = "false";
      element.style.zIndex = 1000;

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const fieldRect = gardenField.getBoundingClientRect();
      let x = touch.clientX - startX;
      let y = touch.clientY - startY;

      const minX = 0;
      const maxX = fieldRect.width - 72;
      const minY = 0;
      const maxY = fieldRect.height - 80;

      x = Math.max(minX, Math.min(x, maxX));
      y = Math.max(minY, Math.min(y, maxY));

      const fIdx = floaters.findIndex(f => f.member === member);
      if (fIdx !== -1) {
        if (Math.abs(x - floaters[fIdx].x) > 4 || Math.abs(y - floaters[fIdx].y) > 4) {
          element.dataset.dragged = "true";
        }
        floaters[fIdx].x = x;
        floaters[fIdx].y = y;
      }

      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      e.preventDefault(); // prevent scroll
    };

    const onTouchEnd = () => {
      isDragging = false;
      element.dataset.dragging = "false";
      element.style.zIndex = 10;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    // Attach listeners to the avatar circle specifically
    const avatarEl = element.querySelector('.garden-floater-avatar');
    avatarEl.addEventListener('mousedown', onMouseDown);
    avatarEl.addEventListener('touchstart', onTouchStart);
    avatarEl.addEventListener('dragstart', (e) => e.preventDefault());
  };

  // Initializing draggable garden members
  const initGarden = () => {
    // Keep decorative flowers intact (do not clear the entire innerHTML)
    const floatersInDOM = gardenField.querySelectorAll('.garden-floater');
    floatersInDOM.forEach(el => el.remove());

    floaters = [];
    gardenCount.textContent = gardenCrew.length.toString();

    const fieldWidth = gardenField.clientWidth || 800;
    const fieldHeight = gardenField.clientHeight || 460;

    gardenCrew.forEach((member, i) => {
      const dom = createFloaterDOM(member);
      gardenField.appendChild(dom);

      // Distribute starting positions nicely
      const x = Math.max(10, Math.min((i * 120 + 50) % (fieldWidth - 100), fieldWidth - 80));
      const y = Math.max(10, Math.min((Math.floor(i / 5) * 110 + 60) % (fieldHeight - 100), fieldHeight - 90));

      floaters.push({
        element: dom,
        member: member,
        x: x,
        y: y,
        state: 'idle', // 'idle' or 'moving'
        timer: Math.random() * 2000 + 1000, // randomized staggered timing offset
        vx: 0,
        vy: 0
      });

      // Apply initial coordinate translate
      dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Make it draggable
      makeDraggable(dom, member);
    });
  };

  // Slowly drift members: alternates between 3s idle and 4s drifting
  let lastDriftTime = performance.now();
  const updateGardenDrift = (time) => {
    const deltaTime = time - lastDriftTime;
    lastDriftTime = time;

    const fieldWidth = gardenField.clientWidth || 800;
    const fieldHeight = gardenField.clientHeight || 460;

    floaters.forEach(f => {
      // If user is currently dragging this element, freeze its drifting state
      if (f.element.dataset.dragging === "true") {
        f.state = 'idle';
        f.timer = 3000; // reset to 3s idle
        f.vx = 0;
        f.vy = 0;
        return;
      }

      f.timer -= deltaTime;

      if (f.timer <= 0) {
        if (f.state === 'idle') {
          // Switch to moving (duration: exactly 4 seconds)
          f.state = 'moving';
          f.timer = 4000;
          
          // Random drift direction (speed: ~15 to ~30 px/sec)
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.015 + Math.random() * 0.015; 
          f.vx = Math.cos(angle) * speed;
          f.vy = Math.sin(angle) * speed;
        } else {
          // Switch to idle (duration: exactly 3 seconds)
          f.state = 'idle';
          f.timer = 3000;
          f.vx = 0;
          f.vy = 0;
        }
      }

      // Apply drift movement if in moving state
      if (f.state === 'moving') {
        f.x += f.vx * deltaTime;
        f.y += f.vy * deltaTime;

        // Boundaries checks & bounce rebound
        const maxX = fieldWidth - 72;
        const maxY = fieldHeight - 80;

        if (f.x < 0) { f.x = 0; f.vx = -f.vx; }
        else if (f.x > maxX) { f.x = maxX; f.vx = -f.vx; }

        if (f.y < 0) { f.y = 0; f.vy = -f.vy; }
        else if (f.y > maxY) { f.y = maxY; f.vy = -f.vy; }

        // Translate element
        f.element.style.transform = `translate3d(${f.x}px, ${f.y}px, 0)`;
      }
    });

    requestAnimationFrame(updateGardenDrift);
  };

  // Initialize garden & start drifting loop
  initGarden();
  requestAnimationFrame(updateGardenDrift);


  // ==========================================
  // 5. Integrated Calendar Widget
  // ==========================================
  const calTitle = document.getElementById('cal-title');
  const calGridContainer = document.getElementById('calendar-grid-container');
  const calTooltipBox = document.getElementById('calendar-tooltip-box');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipDesc = document.getElementById('tooltip-desc');
  const tooltipApplyBtn = document.getElementById('tooltip-apply-btn');
  const calPrev = document.getElementById('cal-prev');
  const calNext = document.getElementById('cal-next');

  let calendarState = {
    year: 2026,
    month: 6 // 6 = July
  };

  const calendarEvents = {
    "2026-6-10": {
      title: "📢 감사 챌린지 - SNS 릴레이 런칭!",
      desc: "일주일간 주변의 소중한 지인 3명에게 감사의 뜻을 담은 간단한 편지나 메시지를 건네고 태그하여 이어가는 챌린지 런칭일입니다."
    },
    "2026-6-17": {
      title: "🚒 온기 우편 배달 봉사 - 소방관 편",
      desc: "불길 속에서 고투하시는 동네 소방서 소방관님들을 찾아가 따뜻한 응원의 손글씨 엽서 더미와 활력 비타민을 포장 배달합니다. (시간: 오후 2시 / 장소: 강남소방서)"
    },
    "2026-6-25": {
      title: "🍪 아홉살 정주 파티 (네트워킹)",
      desc: "그간 활동을 되짚고 정원들이 한데 모여 맛있는 간식을 나누며 대화하는 9살 순수 네트워킹의 날입니다. 다음 달 편지배달 대상을 함께 정합니다. (시간: 오후 6시)"
    },
    "2026-7-12": {
      title: "🧹 온기 우편 배달 - 환경 미화원 편",
      desc: "이른 새벽 골목을 청소해 주시는 미화원분들의 쉼터로 시원한 꿀배 음료와 크루원들의 감사 편지 보드를 비치하는 현장 프로젝트일입니다. (시간: 오전 5시)"
    },
    "2026-7-15": {
      title: "⭐ 따뜻한 칭찬 챌린지 - 로컬 보드 개설",
      desc: "이웃 간의 정과 격려 문화를 위해 주민들이 자주 지나는 자리에 익명 칭찬 엽서 보드와 우편함을 개설하고 따뜻함을 나눕니다. (시간: 오후 1시)"
    },
    "2026-7-22": {
      title: "📦 감사 챌린지 - 택배기사님 힐링데이",
      desc: "바쁜 일정으로 식사도 거르시는 택배 기사님들 보관함에 주민들과 작성한 대자보 엽서와 냉온 음료수를 걸어두는 이색 챌린지 진행일입니다. (시간: 오전 10시)"
    }
  };

  const renderCalendar = () => {
    // Clear old dates
    const dayCells = calGridContainer.querySelectorAll('.calendar-day-cell');
    dayCells.forEach(cell => cell.remove());

    const { year, month } = calendarState;
    const monthsKorean = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    calTitle.textContent = `${year}년 ${monthsKorean[month]}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const numberOfDays = new Date(year, month + 1, 0).getDate();

    // Render empty spaces
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-cell empty';
      calGridContainer.appendChild(emptyCell);
    }

    // Render days
    for (let day = 1; day <= numberOfDays; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell';
      
      const dateKey = `${year}-${month}-${day}`;
      const hasEvent = calendarEvents[dateKey];

      if (hasEvent) {
        cell.classList.add('has-event');
      }

      cell.innerHTML = `<span class="calendar-date">${day}</span>`;

      cell.addEventListener('click', () => {
        if (hasEvent) {
          tooltipTitle.textContent = hasEvent.title;
          tooltipDesc.textContent = hasEvent.desc;
          calTooltipBox.style.display = 'block';
          calTooltipBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          calTooltipBox.style.display = 'none';
        }
      });

      calGridContainer.appendChild(cell);
    }
  };

  calPrev.addEventListener('click', () => {
    calendarState.month -= 1;
    if (calendarState.month < 0) {
      calendarState.month = 11;
      calendarState.year -= 1;
    }
    calTooltipBox.style.display = 'none';
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    calendarState.month += 1;
    if (calendarState.month > 11) {
      calendarState.month = 0;
      calendarState.year += 1;
    }
    calTooltipBox.style.display = 'none';
    renderCalendar();
  });

  tooltipApplyBtn.addEventListener('click', () => {
    const selectedEventTitle = tooltipTitle.textContent;
    document.getElementById('apply-motivation').value = `[${selectedEventTitle}] 일정을 확인하고 함께 정을 나누기 위해 정원으로 지원하게 되었습니다!`;
    openApplyModal();
  });

  renderCalendar();


  // ==========================================
  // 6. 정도(情度) 테스트 (6 Questions Quiz)
  // ==========================================
  const quizQuestions = [
    {
      title: "Q1. 엘리베이터 문이 닫히려는 순간 누군가의 발소리가 들릴 때 나는?",
      options: [
        { text: "문 열림 버튼을 적극적으로 눌러준다.", score: 35 },
        { text: "아무 행동도 하지 않고 핸드폰만 뚫어지게 본다.", score: 20 },
        { text: "은근슬쩍 닫힘 버튼을 연타한다.", score: 10 },
        { text: "진짜로 발소리를 눈치채지 못한다.", score: 15 }
      ]
    },
    {
      title: "Q2. 우리 집에 이사 온 옆집 이웃이 시루떡을 들고 인사하러 온다면?",
      options: [
        { text: "“아 너무 감사합니다!” 하며 웃는 얼굴로 반갑게 맞이한다.", score: 35 },
        { text: "가볍게 목례만 나누고 볼일이 있는 듯 서둘러 문을 닫는다.", score: 20 },
        { text: "부담스러움을 느끼고 문 앞에 두고 가시라며 끝내 문은 열어주지 않는다.", score: 10 },
        { text: "대체로 집에 없어 퇴근길 문 앞에 굳어버린 떡을 발견하는 편이다.", score: 15 }
      ]
    },
    {
      title: "Q3. 학생식당(혹은 사내식당)에서 혼자 외롭게 밥을 먹고 있는 동기를 발견하면?",
      options: [
        { text: "먼저 반갑게 다가가 인사하며 “같이 먹자!”고 앞에 앉는다.", score: 35 },
        { text: "상황이나 분위기를 조심스레 보고 인사만 나눈 뒤 다른 테이블에 앉는다.", score: 25 },
        { text: "크게 관심이 없어 아예 눈길을 주지 않고 다른 자리에 앉는다.", score: 10 },
        { text: "상황을 피하고 싶어 슬며시 나와 아예 다른 식당으로 향한다.", score: 15 }
      ]
    },
    {
      title: "Q4. 내가 목격했을 때 일상 속에서 가장 마음이 불편하고 정(情)이 없다고 느끼는 상황은?",
      options: [
        { text: "모임에서 대화에 잘 끼지 못해 겉도는 사람을 아무도 신경 쓰지 않는 방관.", score: 35 },
        { text: "도움을 받고서도 당연하다는 듯 고맙다는 인사 한마디 없는 태도.", score: 30 },
        { text: "가장 가깝고 하루 종일 붙어있는 사람들 사이에서 단 한마디 대화도 없는 상황.", score: 25 },
        { text: "사소하게 실수한 것에 대해 격려보단 비난과 지적만 오가는 분위기.", score: 20 }
      ]
    },
    {
      title: "Q5. 만약 해외 여행에 나갔을 때 가장 깊은 '정(情)'을 느껴보고 싶은 이색 문화는?",
      options: [
        { text: "카페나 상점에서 주문할 때 일상적인 안부와 위트를 자연스레 나누는 스몰토크.", score: 35 },
        { text: "내 뒤에 따라오는 낯선 사람을 위해 기꺼이 출입문을 오랫동안 잡아주는 매너.", score: 30 },
        { text: "나라를 지키느라 헌신하는 군인이나 경찰들을 조건 없이 예우하고 존중해주는 문화.", score: 25 },
        { text: "길가에서 남의 반려견을 예뻐할 때도 먼저 조심스럽게 예의를 갖춰 물어보는 존중.", score: 20 }
      ]
    },
    {
      title: "Q6. 내가 타인에게 작게나마 정을 베풀었을 때 상대방에게 들으면 가장 뿌듯한 칭찬은?",
      options: [
        { text: "“넌 정말 곁에 두기만 해도 마음이 포근해지고 따뜻한 사람이야.”", score: 35 },
        { text: "“너 덕분에 오늘 하루가 어떻게 갔는지 모르게 정말 즐겁고 특별해졌어!”", score: 30 },
        { text: "“상황이 많이 꼬여있었는데 네 덕분에 실질적으로 큰 도움이 되었어.”", score: 25 },
        { text: "“내 골치 아픈 현실적인 난제를 명쾌하게 해결해 줘서 정말 든든하다.”", score: 20 }
      ]
    }
  ];

  const btnQuizStart = document.getElementById('btn-quiz-start');
  const quizIntroScreen = document.getElementById('quiz-intro-screen');
  const quizQuestionScreen = document.getElementById('quiz-question-screen');
  const quizProgressFillBar = document.getElementById('quiz-progress-fill-bar');
  const quizQNumber = document.getElementById('quiz-q-number');
  const quizQTitle = document.getElementById('quiz-q-title');
  const quizQOptionsContainer = document.getElementById('quiz-q-options-container');
  
  const quizResultScreen = document.getElementById('quiz-result-screen');
  const quizResultScore = document.getElementById('quiz-result-score');
  const quizResultTitle = document.getElementById('quiz-result-title');
  const quizResultEmoji = document.getElementById('quiz-result-emoji');
  const quizResultDesc = document.getElementById('quiz-result-desc');
  const btnResultRetry = document.getElementById('btn-result-retry');

  let quizProgress = {
    currentIndex: 0,
    cumulativeScore: 0
  };

  const startQuiz = () => {
    quizProgress.currentIndex = 0;
    quizProgress.cumulativeScore = 0;
    quizIntroScreen.classList.remove('active');
    quizQuestionScreen.classList.add('active');
    renderQuestion();
  };

  const renderQuestion = () => {
    const q = quizQuestions[quizProgress.currentIndex];
    
    // Update labels and progress bar
    const progressPercent = ((quizProgress.currentIndex + 1) / quizQuestions.length) * 100;
    quizProgressFillBar.style.width = `${progressPercent}%`;
    quizQNumber.textContent = `Q${quizProgress.currentIndex + 1} / ${quizQuestions.length}`;
    quizQTitle.textContent = q.title;

    // Render option buttons
    quizQOptionsContainer.innerHTML = '';
    const prefixes = ['1', '2', '3', '4'];
    
    q.options.forEach((opt, idx) => {
      const button = document.createElement('button');
      button.className = 'quiz-option-btn';
      button.innerHTML = `
        <span class="quiz-option-prefix">${prefixes[idx]}</span>
        <span>${opt.text}</span>
      `;
      button.addEventListener('click', () => handleOptionClick(opt.score));
      quizQOptionsContainer.appendChild(button);
    });
  };

  const handleOptionClick = (score) => {
    quizProgress.cumulativeScore += score;
    quizProgress.currentIndex += 1;

    if (quizProgress.currentIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      quizQuestionScreen.classList.remove('active');
      calculateAndShowResult();
    }
  };

  const calculateAndShowResult = () => {
    const score = quizProgress.cumulativeScore;
    
    // Scale score to 10-99% range based on 6 questions
    // Max score is 210, Min is 60 (range = 150)
    const percentage = Math.round(((score - 60) / 150) * 89 + 10);
    
    let title = '선택적 정(情) 조절 장치';
    let emoji = '🐟';
    let typeOndol = 0;
    let typeControl = 0;
    let typeShield = 0;
    let htmlDesc = '';

    if (percentage <= 40) {
      title = '드라이아이스급 철벽 방어막';
      emoji = '⛄';
      
      // Calculate relative percentages for other types
      typeShield = percentage;
      typeControl = Math.round((100 - percentage) * 0.7);
      typeOndol = 100 - typeShield - typeControl;

      htmlDesc = `
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">🧊 성향 한줄 요약</div>
          <div class="quiz-desc-body">개인주의 현대 사회에 완벽하게 최적화된 철벽 냉동 인간!</div>
        </div>
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">🧊 주요 특징</div>
          <div class="quiz-desc-body">엘리베이터 문이 닫히려는 소리가 나면 번개 같은 반사 신경으로 닫힘 버튼을 누르거나 바쁜 척 핸드폰만 뚫어지게 응시하곤 합니다. 이웃이 먼저 떡을 전하러 와도 속으로 적잖이 부담스러워하며 문 앞에 놓아달라는 시크함을 지니고 있을 확률이 높습니다.</div>
        </div>
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">🧊 온기 처방전</div>
          <div class="quiz-desc-body">당신에게도 순수한 아홉 살 시절, 아무 대가 없이 이웃을 도우며 기뻐하던 동심이 숨어있을 것입니다. 온라인 선플 달기나 가벼운 미소 인사를 건네며 꽁꽁 얼어붙은 마음을 슬며시 녹여보는 건 어떨까요?</div>
        </div>
      `;
    } else if (percentage <= 75) {
      title = '선택적 정(情) 조절 장치';
      emoji = '🐟';
      
      typeControl = percentage;
      typeShield = Math.round((100 - percentage) * 0.5);
      typeOndol = 100 - typeShield - typeControl;

      htmlDesc = `
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">💧 성향 한줄 요약</div>
          <div class="quiz-desc-body">눈치와 이성으로 대인 관계 온도를 알맞게 조절하는 스마트 미온수!</div>
        </div>
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">💧 주요 특징</div>
          <div class="quiz-desc-body">필요한 만큼 온기를 키고 끌 줄 아는 뛰어난 사회성을 가졌습니다. 아는 척을 해야 할지, 모르는 척 넘어갈지 0.5초 만에 머릿속으로 시뮬레이션(MBTI의 'I'가 강력하게 의심되는군요!)을 돌려 가장 안전한 중간 스탠스를 택합니다. 식당에서 마주친 친구에게 살짝 목인사만 하고 도망치는 효율적 다정함의 소유자입니다.</div>
        </div>
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">💧 온기 처방전</div>
          <div class="quiz-desc-body">조금만 더 마음을 열어 주변에 온기를 보탠다면, 당신도 모르는 사이에 주변 사람들에게 스파 온천 같은 기분 좋은 포근함을 선물할 수 있는 훌륭한 온기 유망주입니다!</div>
        </div>
      `;
    } else {
      title = '정이 넘쳐 흐르는 아궁이 온돌';
      emoji = '🍠';
      
      typeOndol = percentage;
      typeControl = Math.round((100 - percentage) * 0.8);
      typeShield = 100 - typeOndol - typeControl;

      htmlDesc = `
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">🔥 성향 한줄 요약</div>
          <div class="quiz-desc-body">주변 모든 이들을 후끈하게 데워주는 걸어다니는 인간 난로!</div>
        </div>
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">🔥 주요 특징</div>
          <div class="quiz-desc-body">남 일에 관심이 많고, 대가 없이 먼저 정을 베풀어주는 따뜻한 오지랖의 화신입니다! 식당 이모님께 먼저 안부를 건네거나 닫히는 엘리베이터를 몸으로라도 잡아주는 따뜻함이 가득합니다. 이웃이 시루떡을 가져오면 빈 접시를 보낼 수 없어 집에 있는 귤 한 박스를 안겨 돌려보내야 직성이 풀리는 아궁이 같은 심성을 지녔습니다.</div>
        </div>
        <div class="quiz-result-desc-block">
          <div class="quiz-desc-title">🔥 온기 처방전</div>
          <div class="quiz-desc-body">대가를 바라지 않는 사랑으로 주변 온도를 너무 올려 주변 사람들을 다소 덥게(?) 만들 수도 있으니 가끔은 속도 조절이 필요합니다! 바로 '정원'이 되어 우리 사회에 사랑의 싹을 심어보세요.</div>
        </div>
      `;
    }

    quizResultScore.textContent = `${percentage}%`;
    quizResultTitle.textContent = title;
    quizResultEmoji.textContent = emoji;
    
    // Inject structured visual descriptions
    quizResultDesc.innerHTML = htmlDesc;

    // Apply color to main score text
    if (percentage <= 40) quizResultScore.style.color = 'var(--text-color)';
    else if (percentage <= 75) quizResultScore.style.color = 'var(--secondary-color)';
    else quizResultScore.style.color = 'var(--primary-color)';

    // Update and animate breakdown chart bars
    document.getElementById('val-ondol').textContent = `${typeOndol}%`;
    document.getElementById('val-control').textContent = `${typeControl}%`;
    document.getElementById('val-shield').textContent = `${typeShield}%`;

    // Trigger transitions via timeout
    setTimeout(() => {
      document.getElementById('bar-ondol').style.width = `${typeOndol}%`;
      document.getElementById('bar-control').style.width = `${typeControl}%`;
      document.getElementById('bar-shield').style.width = `${typeShield}%`;
    }, 100);

    // Setup save image button listener
    const saveImgBtn = document.getElementById('btn-result-save-img');
    
    // Clean old listeners to avoid multiple binding
    const newSaveImgBtn = saveImgBtn.cloneNode(true);
    saveImgBtn.parentNode.replaceChild(newSaveImgBtn, saveImgBtn);
    
    newSaveImgBtn.addEventListener('click', () => {
      const textDescForImage = (percentage <= 40) 
        ? "개인주의 현대 사회에 완벽하게 최적화된 철벽 냉동 인간! 엘리베이터 문이 닫히려는 소리가 나면 번개 같은 반사 신경으로 닫힘 버튼을 누르거나 바쁜 척 핸드폰만 뚫어지게 응시하곤 합니다." 
        : (percentage <= 75)
          ? "눈치와 이성으로 대인 관계 온도를 알맞게 조절하는 스마트 미온수! 필요한 만큼 온기를 키고 끌 줄 아는 뛰어난 사회성을 가졌습니다. 눈인사만 하고 도망치는 효율적 다정함의 소유자입니다."
          : "주변 모든 이들을 후끈하게 데워주는 걸어다니는 인간 난로! 남 일에 관심이 많고, 대가 없이 먼저 정을 베풀어주는 따뜻한 오지랖의 화신입니다. 이웃이 떡을 주면 귤 박스를 안겨 돌려보냅니다.";

      saveResultAsImage(percentage, title, emoji, textDescForImage);
    });

    quizResultScreen.classList.add('active');
  };

  // Canvas image generator helper
  const saveResultAsImage = (percentage, title, emoji, desc) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Fill background (white card with border)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 600, 700);

    ctx.strokeStyle = '#19191B';
    ctx.lineWidth = 6;
    ctx.strokeRect(15, 15, 570, 670);

    // Draw header banner
    ctx.fillStyle = '#FF4D4D';
    ctx.fillRect(15, 15, 570, 90);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px Pretendard';
    ctx.textAlign = 'center';
    ctx.fillText('정주는 아홉살 - 나의 정도(情度) 테스트 결과', 300, 70);

    // Draw score percentage
    ctx.fillStyle = '#19191B';
    ctx.font = '800 80px Outfit';
    ctx.fillText(`${percentage}%`, 300, 220);

    // Draw card header title
    ctx.fillStyle = '#19191B';
    ctx.font = 'bold 34px Pretendard';
    ctx.fillText(title, 300, 290);

    // Draw emoji
    ctx.font = '100px Pretendard';
    ctx.fillText(emoji, 300, 420);

    // Draw description wrapping text
    ctx.fillStyle = '#444444';
    ctx.font = 'bold 16px Pretendard';
    
    // Word wrap paragraph helper
    const words = desc.split(' ');
    let line = '';
    let y = 490;
    const maxWidth = 480;
    const lineHeight = 30;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 300, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 300, y);

    // Draw footer Vercel link
    ctx.fillStyle = '#888888';
    ctx.font = 'bold 13px Outfit';
    ctx.fillText('https://jeongju-nine.vercel.app', 300, 655);

    // Trigger download
    const link = document.createElement('a');
    link.download = `정주는아홉살_정도테스트_결과.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const resetQuiz = () => {
    quizResultScreen.classList.remove('active');
    quizQuestionScreen.classList.remove('active');
    quizIntroScreen.classList.add('active');
    quizProgress.currentIndex = 0;
    quizProgress.cumulativeScore = 0;
  };

  btnQuizStart.addEventListener('click', startQuiz);
  btnResultRetry.addEventListener('click', resetQuiz);


  // ==========================================
  // 7. Garden Application Form Submission
  // ==========================================
  const applicationForm = document.getElementById('application-form');

  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('apply-name').value.trim();
    const age = parseInt(document.getElementById('apply-age').value, 10);
    const phone = document.getElementById('apply-phone').value.trim();
    const affiliation = document.getElementById('apply-affiliation').value.trim();
    const motivation = document.getElementById('apply-motivation').value.trim();

    if (!name || !age || !phone || !affiliation || !motivation) {
      alert("신청서 양식을 모두 작성해 주세요!");
      return;
    }

    // Create new member object
    const newMember = {
      name,
      age,
      affiliation,
      history: "신규 정원 (새싹 대기중 🌱)",
      motivation
    };

    // Add to crew list
    gardenCrew.unshift(newMember);

    // Reset Form & Close Modal
    applicationForm.reset();
    closeApplyModal();

    // Re-render & append new floater to garden
    initGarden();

    // Redirect to garden tab
    switchTab('garden');

    // Instantly popup detail of newly added member
    setTimeout(() => {
      alert(`축하합니다, ${name}님!\n\n순수한 아홉살 정원이 되셨습니다.\n당신만의 캐릭터가 정원에 성공적으로 심어져 돌아다니고 있습니다! 🌱`);
      openMemberModal(newMember);
    }, 400);
  });

});
