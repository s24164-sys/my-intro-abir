const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const languageToggle = document.querySelector('.language-toggle');
const languageActive = languageToggle.querySelector('.language-active');

const translations = {
  ja: {
    'nav.home': 'ホーム', 'nav.profile': 'プロフィール', 'nav.activities': '活動', 'nav.research': '研究', 'nav.skills': 'スキル', 'nav.contact': '連絡先',
    'hero.eyebrow': '製薬科学の専門家', 'hero.summary': '製薬科学の修士課程を修了し、HPLC、製剤、品質保証、継続的な専門成長に取り組んでいます。', 'hero.profile': 'プロフィールを見る', 'hero.contact': 'お問い合わせ', 'hero.snapshot': '専門スナップショット', 'hero.current': '現在の役職', 'hero.role': 'エグゼクティブ、GreenHill Pharmaceuticals', 'hero.location': '所在地', 'hero.locationValue': 'ダッカ、バングラデシュ', 'hero.direction': 'キャリアの方向性', 'hero.directionValue': '病院運営のマネジメント',
    'profile.eyebrow': '自己紹介', 'profile.title': '専門プロフィール', 'profile.p1': '製薬科学の大学院での学びと製薬業界での実務経験を通じて、専門的な基盤を築いています。', 'profile.p2': 'HPLC、製剤、品質保証に関心があり、継続的な学習とより大きな責任に必要なリーダーシップを育んでいます。', 'profile.journey': '学習の歩み', 'profile.step1title': '学術的基盤', 'profile.step1': '製薬科学 修士課程', 'profile.step2title': '専門的実務', 'profile.step2': 'GreenHill Pharmaceuticals エグゼクティブ', 'profile.step3title': '将来の方向性', 'profile.step3': '医療分野でのマネジメント',
    'activities.eyebrow': '仕事と学習', 'activities.title': '活動とプロジェクト', 'activities.experience': '職務経験', 'activities.role': 'エグゼクティブ', 'activities.org': 'GreenHill Pharmaceuticals · ダッカ、バングラデシュ', 'activities.description': '製薬業界で業務を行い、専門的な運営と品質重視の実務に触れています。', 'activities.note': '具体的な業務内容と期間は確認後に追加できます。', 'activities.project': 'プロジェクト', 'activities.projecttitle': 'プロジェクトポートフォリオ', 'activities.projecttext': '正式な研究やプロジェクトは、完了した成果が確認できるようになり次第掲載します。', 'activities.status': '準備中', 'activities.goal': 'キャリア目標', 'activities.goaltitle': 'マネジメントとリーダーシップ', 'activities.goaltext': '継続的な専門能力とリーダーシップの成長を通じ、バングラデシュ・ダッカのSquare Hospitalsでマネージャー職を目指しています。',
    'research.eyebrow': '専門的関心', 'research.title': '研究と関心分野', 'research.hplc': 'HPLC', 'research.hptext': '分析分離と実験室での実務に関心があります。', 'research.formulation': '製剤', 'research.formtext': '医薬品の剤形開発と製剤プロセスの理解に関心があります。', 'research.quality': '品質保証', 'research.qualitytext': '品質システム、一貫した実務、専門的責任に関心があります。', 'research.personal': '個人的な関心', 'research.movies': '映画鑑賞', 'research.comics': '漫画を読むこと', 'research.guitar': 'ギター演奏',
    'skills.eyebrow': '知識と準備', 'skills.title': 'スキルと学歴', 'skills.education': '学歴', 'skills.degree': '製薬科学 修士課程修了', 'skills.detail': '大学名と在学期間は確認後に追加します。', 'skills.skills': '技術スキル', 'skills.formulation': '製剤', 'skills.quality': '品質保証',
    'contact.eyebrow': 'プロフェッショナルリンク', 'contact.title': 'ご連絡ください', 'contact.text': '製薬科学、品質保証、医療マネジメントに関連する専門的なつながりや議論を歓迎します。', 'footer.top': 'ページ上部へ ↑'
  }
};

let currentLanguage = 'en';

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  languageActive.textContent = language === 'ja' ? 'JP' : 'EN';
  languageToggle.setAttribute('aria-label', language === 'ja' ? 'Switch to English' : 'Switch to Japanese');

  document.querySelectorAll('[data-i18n]').forEach(element => {
    if (language === 'en') {
      const original = element.dataset.original;
      if (original) element.textContent = original;
      return;
    }

    const key = element.dataset.i18n;
    if (translations.ja[key]) element.textContent = translations.ja[key];
  });

  languageToggle.querySelectorAll('span')[0].className = language === 'en' ? 'language-active' : '';
  languageToggle.querySelectorAll('span')[2].className = language === 'ja' ? 'language-active' : '';
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});

navItems.forEach(item => item.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'ja' : 'en'));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('[data-i18n]').forEach(element => {
  element.dataset.original = element.textContent.trim();
});

document.getElementById('year').textContent = new Date().getFullYear();
