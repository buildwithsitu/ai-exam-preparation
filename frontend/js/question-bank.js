/**
 * ExamMate AI — Question Bank Interactive Controller
 * Pure Vanilla JavaScript (Zero External Dependencies)
 * Handles: CUET UG / PG Stream Switching, Live Search, Subject Filtering, & Drill Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const streamPills = document.querySelectorAll('.qb-toggle-pill');
    const searchInput = document.getElementById('qb-search-input');
    const searchBtn = document.getElementById('qb-search-btn');
    const subjectCards = document.querySelectorAll('.qb-subject-card');
    const sectionTitle = document.querySelector('.qb-section-intro h2');
    const sectionDesc = document.querySelector('.qb-section-intro p');
    const categoryCheckboxes = document.querySelectorAll('input[name="subject"]');

    let activeStream = 'ug'; // Default stream

    // --------------------------------------------------------------------------
    // 1. STREAM SWITCHER (CUET UG vs CUET PG)
    // --------------------------------------------------------------------------
    streamPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const targetStream = pill.getAttribute('data-stream');
            if (!targetStream || targetStream === activeStream) return;

            activeStream = targetStream;

            // Toggle active pill UI
            streamPills.forEach(p => {
                p.classList.remove('active');
                p.classList.add('inactive');
                p.setAttribute('aria-selected', 'false');
            });
            pill.classList.remove('inactive');
            pill.classList.add('active');
            pill.setAttribute('aria-selected', 'true');

            // Update Section Header
            if (activeStream === 'ug') {
                if (sectionTitle) sectionTitle.textContent = 'Explore CUET Question Bank (UG)';
                if (sectionDesc) sectionDesc.textContent = 'Practice from subject-wise collections, chapter-wise sets, and official NTA syllabus blueprints.';
            } else {
                if (sectionTitle) sectionTitle.textContent = 'Explore CUET (PG & MCA) Question Bank';
                if (sectionDesc) sectionDesc.textContent = 'Specialized question sets tailored for SCQP09 (MCA & Computer Science) and Master of Science entrance.';
            }

            // Apply filter
            filterCards();
        });
    });

    // --------------------------------------------------------------------------
    // 2. LIVE SEARCH & FILTER FUNCTION
    // --------------------------------------------------------------------------
    function filterCards() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        
        // Active categories
        const checkedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const allowAllCategories = checkedCategories.includes('all') || checkedCategories.length === 0;

        let visibleCount = 0;

        subjectCards.forEach(card => {
            const cardStream = card.getAttribute('data-stream');
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = (card.querySelector('h3')?.textContent || '').toLowerCase();
            const cardTopics = (card.querySelector('.qb-card-topics-summary')?.textContent || '').toLowerCase();

            // Match stream
            const matchesStream = (cardStream === activeStream);

            // Match category
            const matchesCategory = allowAllCategories || checkedCategories.includes(cardCategory);

            // Match query
            const matchesQuery = query === '' || cardTitle.includes(query) || cardTopics.includes(query);

            if (matchesStream && matchesCategory && matchesQuery) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Handle empty state message
        let emptyState = document.getElementById('qb-empty-state');
        if (visibleCount === 0) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.id = 'qb-empty-state';
                emptyState.className = 'card';
                emptyState.style.padding = 'var(--space-8)';
                emptyState.style.textAlign = 'center';
                emptyState.style.gridColumn = '1 / -1';
                emptyState.innerHTML = `
                    <p style="font-size: 1.5rem; margin-bottom: var(--space-2);" aria-hidden="true">🔍</p>
                    <h3 style="margin-bottom: var(--space-2);">No matching subjects found</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">
                        Try adjusting your search query or reset the filters to explore all available CUET chapters.
                    </p>
                    <button type="button" id="qb-reset-filters-btn" class="btn btn-pill-outline btn-sm">Reset Search &amp; Filters</button>
                `;
                const grid = document.querySelector('.qb-cards-grid');
                if (grid) grid.appendChild(emptyState);

                document.getElementById('qb-reset-filters-btn')?.addEventListener('click', () => {
                    if (searchInput) searchInput.value = '';
                    categoryCheckboxes.forEach(cb => cb.checked = (cb.value === 'all'));
                    filterCards();
                });
            }
            emptyState.style.display = 'block';
        } else if (emptyState) {
            emptyState.style.display = 'none';
        }
    }

    // Bind Search Input
    if (searchInput) {
        searchInput.addEventListener('input', filterCards);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', filterCards);
    }

    // Bind Category Checkboxes
    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.value === 'all' && cb.checked) {
                categoryCheckboxes.forEach(other => {
                    if (other.value !== 'all') other.checked = false;
                });
            } else if (cb.checked) {
                const allCb = Array.from(categoryCheckboxes).find(c => c.value === 'all');
                if (allCb) allCb.checked = false;
            }
            filterCards();
        });
    });

    // --------------------------------------------------------------------------
    // 3. INTERACTIVE CONCEPTUAL PRACTICE DRILL
    // --------------------------------------------------------------------------
    const drillForm = document.getElementById('featured-drill-form');
    const drillFeedback = document.getElementById('drill-feedback-box');
    const drillDetails = document.getElementById('drill-details');

    if (drillForm) {
        const radios = drillForm.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (!drillFeedback) return;
                drillFeedback.style.display = 'block';

                if (radio.value === 'B') {
                    drillFeedback.className = 'drill-feedback correct';
                    drillFeedback.innerHTML = `
                        <strong>✅ Correct Answer! Option B (1/4) is the right solution.</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">Great job! Using the standard Gamma function identity, &Gamma;(2) / 2<sup>2</sup> = 1/4.</p>
                    `;
                    if (drillDetails) drillDetails.open = true;
                } else {
                    drillFeedback.className = 'drill-feedback incorrect';
                    drillFeedback.innerHTML = `
                        <strong>❌ Incorrect Option (${radio.value}).</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">Expand the derivation box below to see step-by-step Gamma function integration.</p>
                    `;
                    if (drillDetails) drillDetails.open = true;
                }
            });
        });
    }

    // Run initial filter on load
    filterCards();
});
