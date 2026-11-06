/**
 * ExamMate AI — Dark / Light Mode Theme Controller
 * Lightweight Vanilla JavaScript (Zero Dependencies)
 * Features: LocalStorage Persistence, System Preference Fallback, Multi-Button Sync
 */

(function () {
    const STORAGE_KEY = 'exammate_theme';

    // 1. Get Preferred Theme (Saved in localStorage OR System Preference)
    function getPreferredTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') {
            return saved;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // 2. Apply Theme to Document and Sync All Toggle Buttons
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const isDark = theme === 'dark';

        // Update all toggle buttons in DOM
        const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
        toggleButtons.forEach(btn => {
            btn.innerHTML = isDark ? '☀️' : '🌙';
            btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        });
    }

    // 3. Toggle Theme Function
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    // 4. Initialize on DOM Ready
    document.addEventListener('DOMContentLoaded', () => {
        const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        applyTheme(initialTheme);

        // Bind click events to any theme-toggle buttons
        const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
        });
    });

    // 5. Listen for System Preference Changes (if no user override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();
