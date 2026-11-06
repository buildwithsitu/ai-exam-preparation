/**
 * ExamMate AI — Student Dashboard View Router & Interactive Controller
 * Pure Vanilla JavaScript (Zero External Dependencies)
 * Handles: Instant View Switching for all 9 Pages, Hash Routing, and Filter Controls
 */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. ROUTER: SWITCH BETWEEN DASHBOARD VIEWS VIA SIDEBAR & HASH
    // --------------------------------------------------------------------------
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    const viewPanels = document.querySelectorAll('.dash-view-panel');

    const viewMap = {
        'dashboard': 'view-dashboard',
        'career': 'view-career',
        'learn': 'view-learn',
        'practice': 'view-practice',
        'projects': 'view-projects',
        'interviews': 'view-interviews',
        'resume': 'view-resume',
        'jobs': 'view-jobs',
        'progress': 'view-progress',
        'settings': 'view-settings'
    };

    function switchView(viewKey) {
        const targetViewId = viewMap[viewKey] || 'view-dashboard';
        const targetPanel = document.getElementById(targetViewId);

        if (!targetPanel) return;

        // 1. Hide all view panels and show the target
        viewPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        targetPanel.classList.add('active');

        // 2. Update active state on sidebar links
        sidebarLinks.forEach(link => {
            const linkView = link.getAttribute('data-view');
            if (linkView === targetViewId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        // 3. Scroll to top of viewport
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Handle clicks on sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const key = href.substring(1);
                if (viewMap[key]) {
                    e.preventDefault();
                    history.pushState(null, '', href);
                    switchView(key);
                }
            }
        });
    });

    // Handle back/forward navigation or initial hash
    function handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        if (viewMap[hash]) {
            switchView(hash);
        } else {
            switchView('dashboard');
        }
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // --------------------------------------------------------------------------
    // 2. INTERACTIVE FILTER PILLS (Learning Hub, Practice, Projects, Jobs)
    // --------------------------------------------------------------------------
    function setupFilterPills(containerSelector, itemSelector, dataAttr) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const pills = container.querySelectorAll('.filter-pill');
            const parentView = container.closest('.dash-view-panel');
            if (!parentView) return;

            const items = parentView.querySelectorAll(itemSelector);

            pills.forEach(pill => {
                pill.addEventListener('click', () => {
                    pills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');

                    const filterVal = pill.getAttribute(dataAttr) || pill.textContent.trim().toLowerCase();

                    items.forEach(item => {
                        const itemVal = (item.getAttribute(dataAttr) || '').toLowerCase();
                        if (filterVal === 'all' || filterVal === 'all jobs' || itemVal.includes(filterVal)) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        });
    }

    setupFilterPills('#view-learn .filter-pills-bar', '.course-row-item', 'data-cat');
    setupFilterPills('#view-practice .filter-pills-bar', '.topic-stat-card', 'data-cat');
    setupFilterPills('#view-projects .filter-pills-bar', '.project-row-item', 'data-cat');
    setupFilterPills('#view-jobs .filter-pills-bar', '.job-listing-item', 'data-cat');

    // --------------------------------------------------------------------------
    // 3. TASK CHECKLIST INTERACTIONS (View 1 & View 7)
    // --------------------------------------------------------------------------
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const label = cb.closest('li') || cb.parentElement;
            if (label) {
                if (cb.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.opacity = '0.6';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.opacity = '1';
                }
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. GLOBAL SEARCH INPUT (Real-time Filter)
    // --------------------------------------------------------------------------
    const searchInput = document.getElementById('dash-global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const activePanel = document.querySelector('.dash-view-panel.active');
            if (!activePanel) return;

            const searchableItems = activePanel.querySelectorAll('.course-row-item, .project-row-item, .job-listing-item, .career-path-box, .stat-kpi-card');
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

});
