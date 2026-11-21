const tickets = [
    { title: 'Проектор не включается', room: '203', category: 'Оборудование', done: false },
    { title: 'Не закрывается окно', room: '105', category: 'Аудитория', done: false },
    { title: 'В коридоре не горит свет', room: 'Коридор, 2-й этаж', category: 'Другое', done: true }
];

const root = document.querySelector('.body');

const problemDiv = root.querySelector('.problem');
const whereDiv = root.querySelector('.where');

problemDiv.querySelector('input').id = 'title';
problemDiv.querySelector('button').remove();

whereDiv.querySelector('input').id = 'room';
whereDiv.querySelector('button').remove();

const categoryDiv = document.createElement('div');
categoryDiv.className = 'category';
categoryDiv.innerHTML =
    '<label for="category">Категория</label>' +
    '<select id="category">' +
        '<option value="">Выберите категорию</option>' +
        '<option value="Оборудование">Оборудование</option>' +
        '<option value="Аудитория">Аудитория</option>' +
        '<option value="Другое">Другое</option>' +
    '</select>';
root.insertBefore(categoryDiv, whereDiv.nextSibling);

const addBtn = document.createElement('button');
addBtn.id = 'addBtn';
addBtn.textContent = 'Добавить заявку';
categoryDiv.after(addBtn);

const messageEl = document.createElement('p');
messageEl.id = 'message';
messageEl.className = 'message';
addBtn.after(messageEl);

const filtersDiv = document.createElement('div');
filtersDiv.className = 'filters';
filtersDiv.innerHTML =
    '<label><input type="checkbox" id="onlyOpen"> Только открытые</label>' +
    '<select id="categoryFilter">' +
        '<option value="">Все категории</option>' +
        '<option value="Оборудование">Оборудование</option>' +
        '<option value="Аудитория">Аудитория</option>' +
        '<option value="Другое">Другое</option>' +
    '</select>';
messageEl.after(filtersDiv);

const listEl = document.createElement('ul');
listEl.id = 'ticketsList';
listEl.className = 'tickets';
filtersDiv.after(listEl);

const titleInput = document.getElementById('title');
const roomInput = document.getElementById('room');
const categorySelect = document.getElementById('category');
const onlyOpenCheckbox = document.getElementById('onlyOpen');
const categoryFilter = document.getElementById('categoryFilter');

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
        if (categoryFilter.value && ticket.category !== categoryFilter.value) continue;

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
        li.textContent = (onlyOpenCheckbox.checked || categoryFilter.value)
            ? 'Нет заявок по выбранным фильтрам'
            : 'Открытых заявок нет';
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
categoryFilter.addEventListener('change', renderTickets);

renderTickets();