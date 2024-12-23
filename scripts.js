const monthNames = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

let currentMonth = 9;
let currentYear = 1403;

function generateCalendar(month, year) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    document.getElementById('month-year').innerText = `${monthNames[month]} ${year}`;

    const firstDayOfMonth = jalaali.toGregorian(year, month + 1, 1);
    const firstDay = new Date(firstDayOfMonth.gy, firstDayOfMonth.gm - 1, firstDayOfMonth.gd).getDay();
    const daysInMonth = jalaali.jalaaliMonthLength(year, month + 1);

    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) {
            tbody.appendChild(row);
            row = document.createElement('tr');
        }
        let cell = document.createElement('td');
        cell.innerText = day;
        cell.addEventListener('click', () => openModal(day, month, year));
        row.appendChild(cell);
    }

    while (row.children.length < 7) {
        row.appendChild(document.createElement('td'));
    }

    tbody.appendChild(row);
}

document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('prev-year').addEventListener('click', () => {
    currentYear--;
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-year').addEventListener('click', () => {
    currentYear++;
    generateCalendar(currentMonth, currentYear);
});

generateCalendar(currentMonth, currentYear);

const modal = document.getElementById('note-modal');
const closeModal = document.getElementsByClassName('close')[0];
const saveNoteBtn = document.getElementById('save-note');
let selectedDate;

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function openModal(day, month, year) {
    selectedDate = `${day} ${monthNames[month]} ${year}`;
    document.getElementById('selected-date').innerText = selectedDate;
    document.getElementById('note-text').value = localStorage.getItem(selectedDate) || '';
    modal.style.display = 'block';
}

saveNoteBtn.onclick = function() {
    const noteText = document.getElementById('note-text').value;
    localStorage.setItem(selectedDate, noteText);
    modal.style.display = 'none';
}