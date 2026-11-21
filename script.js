const tickets = [];

const titleInput = document.getElementById('title');
const roomInput = document.getElementById('room');
const categorySelect = document.getElementById('category');
const addBtn = document.getElementById('addBtn');
const messageEl = document.getElementById('message');
const listEl = document.getElementById('ticketsList');
const onlyOpenCheckbox = document.getElementById('onlyOpen');

function renderTickets() {
    listEl.innerHTML = '';

    if (tickets.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Заявок пока нет';
        listEl.append(li);
        return;
    }

    let shown = 0;

    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];

        if (onlyOpenCheckbox.checked && ticket.done) continue;

        shown++;

        const li = document.createElement('li');
        li.className = 'ticket ' + (ticket.done ? 'done' : 'open');

        const h2 = document.createElement('h2');
        h2.textContent = ticket.title;

        const p = document.createElement('p');
        p.textContent = 'Место: ' + ticket.room + ' | Категория: ' + ticket.category;

        const status = document.createElement('span');
        status.className = 'status';
        status.textContent = ticket.done ? 'Выполнена' : 'Открыта';

        li.append(h2, p, status);

        if (!ticket.done) {
            const doneBtn = document.createElement('button');
            doneBtn.textContent = 'Выполнить';
            doneBtn.addEventListener('click', function () {
                tickets[i].done = true;
                renderTickets();
            });
            li.append(doneBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', function () {
            tickets.splice(i, 1);
            renderTickets();
        });
        li.append(deleteBtn);

        listEl.append(li);
    }

    if (shown === 0) {
        const li = document.createElement('li');
        li.textContent = 'Открытых заявок нет';
        listEl.append(li);
    }
}

addBtn.addEventListener('click', function () {
    const title = titleInput.value.trim();
    const room = roomInput.value.trim();
    const category = categorySelect.value;

    if (!title || !room || !category) {
        messageEl.textContent = 'Заполните все поля и выберите категорию.';
        return;
    }

    messageEl.textContent = '';
    tickets.push({ title: title, room: room, category: category, done: false });
    renderTickets();

    titleInput.value = '';
    roomInput.value = '';
    categorySelect.value = '';
});

onlyOpenCheckbox.addEventListener('change', renderTickets);

renderTickets();