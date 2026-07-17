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

    // Click details popup
    floater.addEventListener('click', () => {
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

  // Initializing physics floaters
  const initGarden = () => {
    gardenField.innerHTML = '';
    floaters = [];
    gardenCount.textContent = gardenCrew.length.toString();

    // Get garden size (default boundaries if client bounding rect is not ready)
    const fieldWidth = gardenField.clientWidth || 800;
    const fieldHeight = gardenField.clientHeight || 460;

    gardenCrew.forEach(member => {
      const dom = createFloaterDOM(member);
      gardenField.appendChild(dom);

      // Random starting coordinates
      const x = Math.random() * (fieldWidth - 80);
      const y = Math.random() * (fieldHeight - 80);

      // Small random floating velocities (-0.5 to 0.5 pixels/frame)
      const vx = (Math.random() * 0.8 - 0.4);
      const vy = (Math.random() * 0.8 - 0.4);

      floaters.push({
        element: dom,
        member: member,
        x: x,
        y: y,
        vx: vx === 0 ? 0.2 : vx, // ensure it actually moves
        vy: vy === 0 ? -0.2 : vy,
        width: 72,
        height: 80
      });
    });
  };

  // Main animation loop
  const updatePhysics = () => {
    const fieldWidth = gardenField.clientWidth || 800;
    const fieldHeight = gardenField.clientHeight || 460;

    floaters.forEach(f => {
      f.x += f.vx;
      f.y += f.vy;

      // Wall boundaries collision bounce
      if (f.x <= 0) {
        f.x = 0;
        f.vx = -f.vx;
      } else if (f.x >= fieldWidth - f.width) {
        f.x = fieldWidth - f.width;
        f.vx = -f.vx;
      }

      if (f.y <= 0) {
        f.y = 0;
        f.vy = -f.vy;
      } else if (f.y >= fieldHeight - f.height) {
        f.y = fieldHeight - f.height;
        f.vy = -f.vy;
      }

      // Apply coordinates using 3D hardware translate
      f.element.style.transform = `translate3d(${f.x}px, ${f.y}px, 0)`;
    });

    requestAnimationFrame(updatePhysics);
  };

  // Initialize and run
  initGarden();
  requestAnimationFrame(updatePhysics);


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
  // 6. 정도(情度) 테스트 (10 Questions Quiz)
  // ==========================================
  const quizQuestions = [
    {
      title: "Q1. 엘리베이터에 탔을 때 이웃과 눈이 마주쳤다. 나의 행동은?",
      options: [
        { text: "빛의 속도로 스마트폰을 꺼내 바쁜 척을 한다.", score: 10 },
        { text: "조금 어색하지만 살짝 목례 정도만 건넨다.", score: 20 },
        { text: "밝은 표정으로 먼저 '안녕하세요, 좋은 하루 보내세요!' 하고 인사한다.", score: 35 }
      ]
    },
    {
      title: "Q2. 배달 음식을 주문할 때 나의 요청사항 스타일은?",
      options: [
        { text: "마주치는 일을 최소화하기 위해 '문 앞에 두고 벨X'만 쓴다.", score: 10 },
        { text: "평범하게 '문 앞에 놔주세요'라고 기재한다.", score: 20 },
        { text: "'안전 배송 감사드립니다. 오늘 날씨가 추운데 건강 조심하세요!' 문구를 남긴다.", score: 35 }
      ]
    },
    {
      title: "Q3. 비 내리는 출근길, 미화원 아저씨께서 바닥의 빗물을 닦고 계신다면?",
      options: [
        { text: "바닥이 미끄러우니 내 발밑에만 집중해 조심히 비껴서 간다.", score: 10 },
        { text: "눈이 마주치면 속으로만 '고생하신다' 생각하고 가볍게 목례한다.", score: 20 },
        { text: "'덕분에 아침 골목이 깨끗하네요! 빗길 조심하세요!' 눈인사를 건넨다.", score: 35 }
      ]
    },
    {
      title: "Q4. 길거리에서 지도를 보며 몹시 헤매고 있는 외국인 관광객을 보면?",
      options: [
        { text: "영어 울렁증이 있어 나도 모르게 시선을 돌리며 피해 지나간다.", score: 10 },
        { text: "주변에 영어를 잘하거나 도와줄 사람이 없는지 힐끔 살핀다.", score: 20 },
        { text: "다가가 지도를 가리키며 목적지까지 방향을 천천히 짚어 안내해준다.", score: 35 }
      ]
    },
    {
      title: "Q5. 친한 친구가 본인의 과실로 인해 큰 실패를 겪고 심하게 위축되어 있을 때?",
      options: [
        { text: "'다음부터 조심해야지' 하며 현실적인 해결방안이나 대처법을 조언한다.", score: 10 },
        { text: "'토닥토닥.. 그럴 수도 있지' 정도로만 덤덤하게 등 두드려준다.", score: 20 },
        { text: "따뜻하고 든든한 밥을 함께 먹으며 밤늦게까지 그의 넋두리를 들어준다.", score: 35 }
      ]
    },
    {
      title: "Q6. 식당이나 카페에서 직원을 마주하고 음식을 주문할 때?",
      options: [
        { text: "휴대폰을 손에서 떼지 않고 기계적으로 소통하거나 무인 키오스크만 쓴다.", score: 10 },
        { text: "평범하게 용건 위주로 주문하고 카드를 주고받는다.", score: 20 },
        { text: "상대의 눈을 보며 감사하다는 인사를 꼭 덧붙여 말한다.", score: 35 }
      ]
    },
    {
      title: "Q7. 친구의 소중한 생일날, 축하를 나누는 나의 방법은?",
      options: [
        { text: "카카오톡 기프티콘과 '생일축하해~' 단톡방 메시지만 보낸다.", score: 10 },
        { text: "조금 쓸만한 물건을 고르고, 배송 메시지에 축하 글귀를 담아 보낸다.", score: 20 },
        { text: "되도록 직접 만나 축하 밥을 사고, 비뚤빼뚤하더라도 손편지를 건넨다.", score: 35 }
      ]
    },
    {
      title: "Q8. 직장 동료나 친구의 안색이 몹시 피곤해 보일 때 나의 반응은?",
      options: [
        { text: "괜히 참견하는 것은 실례라 여겨 모른 척 지나간다.", score: 10 },
        { text: "'오늘 조금 피곤해 보여, 괜찮아?' 한마디 물어본다.", score: 20 },
        { text: "몰래 그의 책상 위에 상큼한 귤이나 사탕, 비타민 음료를 얹어 둔다.", score: 35 }
      ]
    },
    {
      title: "Q9. 회사나 학교에 출근/등교할 때 나의 첫 행동은?",
      options: [
        { text: "귀에 무선 이어폰을 꽉 꽂은 채 곧장 내 자리로 직행한다.", score: 10 },
        { text: "마주치고 인사하는 이웃이 있다면 가볍게 목인사 정도를 나눈다.", score: 20 },
        { text: "주변 동료들에게 먼저 환하게 아침 인사를 건네고 대화를 나눈다.", score: 35 }
      ]
    },
    {
      title: "Q10. 나에게 타인에게 건네는 '정(情)'이란 무엇인가?",
      options: [
        { text: "바쁜 현대 사회에서 다소 불필요하거나 부담스러울 수 있는 오지랖.", score: 10 },
        { text: "있으면 좋고 없어도 사는 데 무방한 부가적인 사회적 도덕.", score: 20 },
        { text: "대가 없이 마음과 마음을 이어 사회를 훈훈하게 하는 소통의 힘.", score: 35 }
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
    const prefixes = ['A', 'B', 'C'];
    
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
    
    // Scale score to 10-99% range
    // Max score is 350, Min is 100
    const percentage = Math.round(((score - 100) / 250) * 89 + 10);
    
    let title = '바삭따끈 붕어빵';
    let emoji = '🐟';
    let desc = '';

    if (percentage <= 45) {
      title = '꽁꽁 얼어붙은 눈사람';
      emoji = '⛄';
      desc = `현재 당신의 마음 정도(情度)는 바쁜 일상의 흐름 속에서 다소 굳어 있는 상태입니다. 
      타인에게 관심을 주고받는 과정이 어색하게 느껴지거나 번거롭게 여겨질 수 있습니다. 
      하지만 당신에게도 순수한 아홉 살 시절, 대가 없이 이웃을 도우며 행복했던 동심이 숨어있을 것입니다. 
      가벼운 감사 인사나 온라인 편지를 전하며 꽁꽁 언 마음을 슬며시 녹여 보세요!`;
    } else if (percentage <= 78) {
      title = '바삭따끈 붕어빵';
      emoji = '🐟';
      desc = `당신은 마음 한구석에 고운 정을 듬뿍 안고서도, 쑥스럽거나 어색한 마음에 먼저 표현하지 못하는 마음 따뜻한 관조형 이웃입니다. 
      소박한 계기만 주어진다면 누구보다 다정하게 온기를 나눌 수 있습니다. 
      '정주는 아홉살'의 감사 챌린지에 동참해 당신의 숨은 온기를 한 칸 더 올려보세요!`;
    } else {
      title = '펄펄 끓는 노란 군고구마';
      emoji = '🍠';
      desc = `대단합니다! 당신은 메마른 도시 속에서도 주변을 훈훈하게 달구어 주는 살아있는 인간 난로이자, '정(情)의 화신'입니다! 
      아홉 살의 순수한 어린아이처럼 타인의 슬픔에 공감하고 다정한 말 한마디를 먼저 건넬 준비가 되어있는 따뜻한 분이시네요. 
      어서 '정원'이 되어 우리 사회에 더 커다란 따뜻함의 싹을 틔워주세요!`;
    }

    quizResultScore.textContent = `${percentage}%`;
    quizResultTitle.textContent = title;
    quizResultEmoji.textContent = emoji;
    quizResultDesc.textContent = desc;

    // Text color styling
    if (percentage <= 45) quizResultScore.style.color = 'var(--text-color)';
    else if (percentage <= 78) quizResultScore.style.color = 'var(--secondary-color)';
    else quizResultScore.style.color = 'var(--primary-color)';

    quizResultScreen.classList.add('active');
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
