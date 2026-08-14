const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    });
  });
}

document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const escapeHtml = (value = '') =>
  value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]);

const scholarUrl = (title) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`;

const featuredContainer = document.querySelector('[data-featured-publications]');

if (featuredContainer) {
  fetch('data/publications.json')
    .then((response) => {
      if (!response.ok) throw new Error('Publication data could not be loaded.');
      return response.json();
    })
    .then(({ publications }) => {
      const featured = publications.filter((publication) => publication.featured).slice(0, 6);
      featuredContainer.innerHTML = featured.map((publication) => {
        const destination = publication.doi
          ? `https://doi.org/${publication.doi}`
          : scholarUrl(publication.title);
        const label = publication.doi ? 'DOI' : 'Scholar';
        return `
          <article class="featured-publication">
            <div class="publication-meta">
              <span>${publication.year}</span>
              <span>${escapeHtml(publication.journal)}</span>
            </div>
            <h3>${escapeHtml(publication.title)}</h3>
            <p>${escapeHtml(publication.authors)}</p>
            <a href="${destination}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(publication.title)}">
              ${label} <span aria-hidden="true">↗</span>
            </a>
          </article>`;
      }).join('');
    })
    .catch(() => {
      featuredContainer.innerHTML = '<p>Selected publications are temporarily unavailable. Please use the full publications page.</p>';
    });
}
