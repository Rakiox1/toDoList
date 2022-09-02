//info fecha (info date)
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Conteiner de Tareas (Task container)

const taskContainer = document.getElementById('taskContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'long' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText
    if (!value) return
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder')
    task.addEventListener('click', changeTaskState)
    task.textContent = value
    taskContainer.prepend(task)
    event.target.reset()
};
const changeTaskState = event => {
    event.target.classList.toggle('done')
};


setDate();

const order = () => {
    const done = []
    const toDo = []
    taskContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done]
};

// swicth night|day mode
const preferedColorScheme = window.matchMedia('(preferes-color-scheme: dark)').matches ? 'dark' : 'light';
const slider = document.getElementById('slider');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

slider.addEventListener('click', () => {
    let swicthTotheme = localStorage.getItem('theme') == 'dark' ? 'light' : 'dark';
    setTheme(swicthTotheme);
})

setTheme(localStorage.getItem('theme') || preferedColorScheme);

const renderOrderedTask = () => {
    order().forEach(el => taskContainer.appendChild(el))
};
