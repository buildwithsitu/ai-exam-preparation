/**
 * ExamMate AI — Student Dashboard Interactive Controller
 * Lightweight Vanilla JavaScript (Zero External Dependencies)
 * Handles: Course Tab Filtering, Daily Study Checklist, and Calendar Controls
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. CONTINUE LEARNING: TAB FILTERING (All, In Progress, Completed)
    // --------------------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.filter-tab-btn');
    const courseCards = document.querySelectorAll('.course-card-item');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterType = btn.textContent.trim().toLowerCase(); // 'all', 'in progress', 'completed'

            courseCards.forEach(card => {
                const status = (card.getAttribute('data-status') || '').toLowerCase();
                if (filterType === 'all' || status === filterType) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 2. TODAY'S PLAN: INTERACTIVE TASK CHECKLIST
    // --------------------------------------------------------------------------
    const checklistItems = document.querySelectorAll('.plan-check-item');

    checklistItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    item.classList.add('done');
                } else {
                    item.classList.remove('done');
                }
            });
        }
    });

    // Add Plan Quick Prompt
    const addPlanBtn = document.querySelector('.add-plan-icon-btn');
    if (addPlanBtn) {
        addPlanBtn.addEventListener('click', () => {
            const taskText = prompt('Enter new CUET study goal or chapter to revise:');
            if (taskText && taskText.trim() !== '') {
                const checklistContainer = document.querySelector('.plan-checklist');
                if (checklistContainer) {
                    const newLabel = document.createElement('label');
                    newLabel.className = 'plan-check-item';
                    newLabel.innerHTML = `
                        <input type="checkbox">
                        <span class="plan-item-label">
                            <strong>${escapeHtml(taskText.trim())}</strong>
                            <span>Self-Paced Practice</span>
                        </span>
                    `;
                    const newCheckbox = newLabel.querySelector('input[type="checkbox"]');
                    newCheckbox.addEventListener('change', () => {
                        newLabel.classList.toggle('done', newCheckbox.checked);
                    });
                    checklistContainer.appendChild(newLabel);
                }
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3. MINI CALENDAR MONTH NAVIGATION
    // --------------------------------------------------------------------------
    const monthHeader = document.querySelector('.calendar-month-header h4');
    const calendarBtns = document.querySelectorAll('.calendar-arrow-btn');
    const months = [
        'January 2026', 'February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026',
        'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'
    ];
    let currentMonthIdx = 10; // November 2026 (0-indexed 10)

    if (monthHeader && calendarBtns.length === 2) {
        // Prev Month
        calendarBtns[0].addEventListener('click', () => {
            if (currentMonthIdx > 0) {
                currentMonthIdx--;
                monthHeader.textContent = months[currentMonthIdx];
            }
        });
        // Next Month
        calendarBtns[1].addEventListener('click', () => {
            if (currentMonthIdx < months.length - 1) {
                currentMonthIdx++;
                monthHeader.textContent = months[currentMonthIdx];
            }
        });
    }

    // --------------------------------------------------------------------------
    // 4. LEARNING ACTIVITY: TIMEFRAME SELECTOR
    // --------------------------------------------------------------------------
    const timeframeSelect = document.querySelector('.dash-dropdown-select');
    const statHours = document.querySelector('.stat-headline strong');
    const trendBadge = document.querySelector('.trend-badge-green');

    if (timeframeSelect && statHours && trendBadge) {
        timeframeSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'This Week') {
                statHours.textContent = '18.6';
                trendBadge.textContent = '↗ 12% more than last week';
            } else if (val === 'Last Week') {
                statHours.textContent = '16.4';
                trendBadge.textContent = '↗ 8% more than target';
            } else if (val === 'This Month') {
                statHours.textContent = '74.2';
                trendBadge.textContent = '↗ 18% monthly study surge';
            }
        });
    }

    // Helper: Escape HTML string to prevent XSS
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
