(function () {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Sticky header + scroll progress ---- */
  var header = document.getElementById('site-header');
  var progress = document.getElementById('top-progress');
  var gototop = document.querySelector('.gototop');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', y > 20);
    gototop.classList.toggle('visible', y > 400);

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      navMenu.querySelectorAll('.menuItem').forEach(function (i) { i.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  /* ---- Tabs (Experience / Education) ---- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  /* ---- Timeline "Ver mais" (Experiência / Formação) ---- */
  document.querySelectorAll('.tab-panel').forEach(function (panel) {
    var extraItems = panel.querySelectorAll('.timeline-item[data-extra="1"]');
    var moreBtn = panel.querySelector('.timeline-more');
    if (!moreBtn) return;

    if (extraItems.length === 0) {
      moreBtn.parentElement.style.display = 'none';
      return;
    }

    extraItems.forEach(function (item) { item.classList.add('hidden-extra'); });

    var expanded = false;
    moreBtn.addEventListener('click', function () {
      expanded = !expanded;
      extraItems.forEach(function (item) {
        item.classList.toggle('hidden-extra', !expanded);
        if (expanded) item.classList.add('in-view');
      });
      moreBtn.innerHTML = expanded
        ? 'Ver menos <i class="fa fa-chevron-up"></i>'
        : 'Ver mais <i class="fa fa-chevron-down"></i>';
    });
  });

  /* ---- Skill bars animation on view ---- */
  var skillbars = document.querySelectorAll('.skillbar');
  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fill = entry.target.querySelector('.skillbar-fill');
        fill.style.width = entry.target.dataset.percent + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillbars.forEach(function (bar) { skillObserver.observe(bar); });

  /* ---- Scroll reveal for sections ---- */
  var revealTargets = document.querySelectorAll('.section .heading, .about-grid, .current-card, .contact-card, .timeline-item');
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(function (el) { revealObserver.observe(el); });

  /* ---- Portfolio filter ---- */
  var filterBtns = document.querySelectorAll('.portfolioFilter button');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('current'); });
      btn.classList.add('current');
      var filter = btn.dataset.filter;
      portfolioItems.forEach(function (item) {
        var cats = (item.dataset.cats || '').split(' ');
        var match = filter === '*' || cats.indexOf(filter) !== -1;
        item.classList.toggle('filtered-out', !match);
      });
    });
  });

  /* ---- Portfolio "Ver mais" ---- */
  var moreBtn = document.getElementById('portfolio-more');
  var extraItems = document.querySelectorAll('.portfolio-item[data-extra="1"]');
  var expanded = false;

  function collapse() {
    extraItems.forEach(function (item) { item.classList.add('hidden-extra'); });
  }
  collapse();

  if (extraItems.length === 0) {
    moreBtn.style.display = 'none';
  }

  moreBtn.addEventListener('click', function () {
    expanded = !expanded;
    extraItems.forEach(function (item) { item.classList.toggle('hidden-extra', !expanded); });
    moreBtn.innerHTML = expanded
      ? 'Ver menos <i class="fa fa-chevron-up"></i>'
      : 'Ver mais <i class="fa fa-chevron-down"></i>';
  });
})();
