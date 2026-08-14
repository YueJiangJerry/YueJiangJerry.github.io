const list = document.querySelector('[data-publication-list]');

if (list) {
  const search = document.querySelector('[data-publication-search]');
  const yearFilter = document.querySelector('[data-year-filter]');
  const roleFilter = document.querySelector('[data-role-filter]');
  const resultsCount = document.querySelector('[data-results-count]');
  const clearButton = document.querySelector('[data-clear-filters]');
  let publications = [];

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

  const render = () => {
    const term = search.value.trim().toLowerCase();
    const selectedYear = yearFilter.value;
    const selectedRole = roleFilter.value;
    const filtered = publications.filter((publication) => {
      const haystack = [publication.title, publication.authors, publication.journal, publication.year]
        .join(' ')
        .toLowerCase();
      const matchesSearch = !term || haystack.includes(term);
      const matchesYear = selectedYear === 'all' || String(publication.year) === selectedYear;
      const matchesRole = selectedRole === 'all'
        || publication.firstAuthor
        || publication.correspondingAuthor;
      return matchesSearch && matchesYear && matchesRole;
    });

    resultsCount.textContent = filtered.length;
    if (!filtered.length) {
      list.innerHTML = `
        <div class="empty-state">
          <h2>No publications match these filters.</h2>
          <p>Try another keyword or clear the filters.</p>
        </div>`;
      return;
    }

    list.innerHTML = filtered.map((publication) => {
      const link = publication.doi
        ? `https://doi.org/${publication.doi}`
        : scholarUrl(publication.title);
      const linkLabel = publication.doi ? 'Open DOI' : 'Find on Scholar';
      const role = publication.firstAuthor || publication.correspondingAuthor
        ? '<span class="role-chip">Lead authorship</span>'
        : '';
      const impact = publication.impactFactor === null
        ? ''
        : `<span>IF ${publication.impactFactor.toFixed(1)}</span>`;
      const citations = publication.citations === null
        ? ''
        : `<span>${publication.citations} citation${publication.citations === 1 ? '' : 's'}</span>`;
      return `
        <article class="publication-item">
          <div class="publication-year">${publication.year}</div>
          <div class="publication-body">
            <div class="publication-labels">${role}<span>${escapeHtml(publication.journal)}</span></div>
            <h2>${escapeHtml(publication.title)}</h2>
            <p class="publication-authors">${escapeHtml(publication.authors)}</p>
            <div class="publication-footer">
              <div class="metric-list">${impact}${citations}</div>
              <a href="${link}" target="_blank" rel="noreferrer">${linkLabel} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </article>`;
    }).join('');
  };

  fetch('data/publications.json')
    .then((response) => {
      if (!response.ok) throw new Error('Publication data could not be loaded.');
      return response.json();
    })
    .then((data) => {
      publications = data.publications.sort((a, b) => b.year - a.year || a.number - b.number);
      const years = [...new Set(publications.map((publication) => publication.year))].sort((a, b) => b - a);
      yearFilter.insertAdjacentHTML(
        'beforeend',
        years.map((year) => `<option value="${year}">${year}</option>`).join(''),
      );
      render();
    })
    .catch(() => {
      list.innerHTML = '<p>Publication data could not be loaded. Please try again later.</p>';
    });

  [search, yearFilter, roleFilter].forEach((control) => control.addEventListener('input', render));
  clearButton.addEventListener('click', () => {
    search.value = '';
    yearFilter.value = 'all';
    roleFilter.value = 'all';
    render();
    search.focus();
  });
}
