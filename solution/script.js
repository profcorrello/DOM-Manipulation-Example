/**
 * ============================================================
 *  INSTRUCTOR REFERENCE SOLUTION — Interactive Study Task List
 *  (Keep this out of the student handout folder!)
 *
 *  This solves every TODO in the student starter script.js,
 *  plus both bonus tasks. Step numbers match Assignment.md.
 *
 *  To demo: open solution/index.html in a browser.
 *  To grade: compare against the student's script.js part by part.
 * ============================================================
 */

// =============================================
// THE ELEMENTS (same as the starter)
// =============================================
const message = document.getElementById('message');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const btnMotivate = document.getElementById('btn-motivate');
const btnDoneAll = document.getElementById('btn-done-all');

const QUOTES = [
    'You got this! One task at a time.',
    'Small progress is still progress.',
    'Future you will say thanks.',
    'Focus up — the finish line is closer than it looks.',
    'Done is better than perfect.'
];

// =============================================
// STEP 1 — WIRE UP THE BUTTONS  (10 pts)
// btnAdd was already done in the starter.
// =============================================
function setupEventListeners() {
    btnAdd.addEventListener('click', addTask);

    btnRemove.addEventListener('click', removeLastTask);
    btnMotivate.addEventListener('click', changeMessage);
    btnDoneAll.addEventListener('click', markAllDone);
}

// =============================================
// STEP 2 — KEEP THE COUNTER UPDATED  (10 pts)
// =============================================
function updateCount() {
    const total = taskList.querySelectorAll('.task-item').length;
    taskCount.textContent = `Total Tasks: ${total}`;
}

// =============================================
// STEP 3 — ADD A TASK  (25 pts)
// =============================================
function addTask() {
    // 3a: read the input (trim removes leading/trailing spaces)
    const text = taskInput.value.trim();

    // 3b: guard — never allow an empty task
    if (text === '') {
        message.textContent = 'Please type a task first!';
        return;
    }

    // 3c: create the element (className matters — CSS styles .task-item)
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = text;          // textContent, never innerHTML

    // 3d: insert it
    taskList.appendChild(li);

    // 3e: finishing touches
    taskInput.value = '';
    updateCount();
    message.textContent = `Added: ${text}`;
}

// =============================================
// STEP 4 — REMOVE THE LAST TASK  (15 pts)
// =============================================
function removeLastTask() {
    const items = taskList.querySelectorAll('.task-item');

    // guard — an empty list must not crash the page
    if (items.length === 0) {
        message.textContent = 'No tasks left to remove!';
        return;
    }

    const lastItem = items[items.length - 1];
    const removedText = lastItem.textContent;   // capture text BEFORE removing

    // either style works:
    taskList.removeChild(lastItem);
    // lastItem.remove();                      // modern alternative

    updateCount();
    message.textContent = `Removed: ${removedText}`;
}

// =============================================
// STEP 5 — MOTIVATE ME!  (15 pts)
// =============================================
function changeMessage() {
    const index = Math.floor(Math.random() * QUOTES.length);
    message.textContent = QUOTES[index];
}

// =============================================
// STEP 6 — TOGGLE ALL TASKS  (15 pts)
// =============================================
function markAllDone() {
    const items = document.querySelectorAll('.task-item');
    items.forEach(function (item) {
        item.classList.toggle('done');   // add → removes if already present
    });
}

// =============================================
// BONUS 1 (+10) — CLICK A SINGLE TASK TOGGLE DONE
// Full-credit approach: event delegation on the list (works for the
// 3 starter tasks AND any task added later — one listener total).
// =============================================
taskList.addEventListener('click', function (event) {
    const item = event.target.closest('.task-item');
    if (item) {
        item.classList.toggle('done');
    }
});

// =============================================
// BONUS 2 (+10) — PRESS ENTER TO ADD A TASK
// =============================================
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

// =============================================
// STARTUP (same as the starter)
// =============================================
function init() {
    setupEventListeners();
    updateCount();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
