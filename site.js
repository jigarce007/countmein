(function () {
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    document.querySelectorAll('.top-nav a').forEach(function (link) {
      link.addEventListener('click', function () { toggle.checked = false; });
    });
  }

  var params = new URLSearchParams(window.location.search);
  if (params.get('sent') === '1') {
    var note = document.getElementById('sentNote');
    if (note) {
      note.hidden = false;
      note.classList.add('show');
    }
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  nodes.forEach(function (n) { io.observe(n); });
})();
