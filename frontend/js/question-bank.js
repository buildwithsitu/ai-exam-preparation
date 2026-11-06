/**
 * ExamMate AI — Question Bank Interactive Controller
 * Pure Vanilla JavaScript (Zero External Dependencies)
 * Handles: Practice Stream Switching (DSA, Web, Aptitude, Core CS), Live Search, & Drill Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const streamPills = document.querySelectorAll('.qb-toggle-pill');
    const searchInput = document.getElementById('qb-search-input');
    const searchBtn = document.getElementById('qb-search-btn');
    const subjectCards = document.querySelectorAll('.qb-subject-card');
    const sectionTitle = document.getElementById('qb-section-title') || document.querySelector('.qb-section-intro h2');
    const sectionDesc = document.getElementById('qb-section-desc') || document.querySelector('.qb-section-intro p');

    let activeStream = 'dsa'; // Default stream: DSA & Algorithms

    // --------------------------------------------------------------------------
    // 1. STREAM SWITCHER (DSA, Web, Aptitude, Core CS)
    // --------------------------------------------------------------------------
    const streamInfo = {
        'dsa': {
            title: 'Explore Data Structures & Algorithms Question Sets',
            desc: 'Practice pattern-based questions, time complexity derivations, and coding challenge drills.'
        },
        'web': {
            title: 'Explore Web Architecture & Backend Systems Question Sets',
            desc: 'API specifications, database queries, authentication flows, and scalable architecture patterns.'
        },
        'aptitude': {
            title: 'Explore Campus Placement Aptitude & Logic Sets',
            desc: 'Speed math drills, quantitative shortcuts, logical puzzles, and reasoning practice sets.'
        },
        'core': {
            title: 'Explore Core Computer Science Fundamentals Sets',
            desc: 'Operating systems, DBMS transactions, networking protocols, and object-oriented principles.'
        }
    };

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
            if (streamInfo[activeStream]) {
                if (sectionTitle) sectionTitle.textContent = streamInfo[activeStream].title;
                if (sectionDesc) sectionDesc.textContent = streamInfo[activeStream].desc;
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
        let visibleCount = 0;

        subjectCards.forEach(card => {
            const cardStream = card.getAttribute('data-stream');
            const cardTitle = (card.querySelector('h3')?.textContent || '').toLowerCase();
            const cardTopics = (card.querySelector('.qb-card-topics-summary')?.textContent || '').toLowerCase();

            // Match stream
            const matchesStream = (cardStream === activeStream);

            // Match query
            const matchesQuery = query === '' || cardTitle.includes(query) || cardTopics.includes(query);

            if (matchesStream && matchesQuery) {
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
                    <h3 style="margin-bottom: var(--space-2);">No matching technical topics found</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">
                        Try adjusting your search query or switch practice streams to explore all available modules.
                    </p>
                    <button type="button" id="qb-reset-filters-btn" class="btn btn-pill-outline btn-sm">Reset Search</button>
                `;
                const grid = document.querySelector('.qb-cards-grid');
                if (grid) grid.appendChild(emptyState);

                document.getElementById('qb-reset-filters-btn')?.addEventListener('click', () => {
                    if (searchInput) searchInput.value = '';
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

    // --------------------------------------------------------------------------
    // 3. INTERACTIVE TECHNICAL PRACTICE DRILL
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
                        <strong>✅ Correct Answer! Option B: O(n) time, O(n) space using a Hash Set is optimal.</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">Great job! Checking sequence starts with <code>set.contains(num - 1)</code> guarantees each element is processed in linear time.</p>
                    `;
                    if (drillDetails) drillDetails.open = true;
                } else {
                    drillFeedback.className = 'drill-feedback incorrect';
                    drillFeedback.innerHTML = `
                        <strong>❌ Incorrect Option (${radio.value}).</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem;">Expand the derivation box below to see how HashSet boundary lookups avoid sorting and achieve linear O(n) time.</p>
                    `;
                    if (drillDetails) drillDetails.open = true;
                }
            });
        });
    }

    // Run initial filter on load
    filterCards();
});
