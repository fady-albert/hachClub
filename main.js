var backBtn = document.getElementById('customeBTN');
var btnText = document.getElementById('btnText');
var main = document.getElementById('main');
var input = document.getElementById('form');
var task = document.getElementById('taskInput');
var btn = document.getElementById('taskBtn');
var output = document.getElementById('output');
var msg = document.getElementById('message');

var sMode = localStorage.getItem('mode') || '';

let data = JSON.parse(localStorage.getItem('data')) || [];

let editId = null;

// mode button
function mode() {
    btnText.textContent = btnText.textContent === 'light_mode' ? 'dark_mode' : 'light_mode';
    main.classList.toggle('dark');
    backBtn.classList.toggle('darkT')

    setTimeout(() => {
        btnText.classList.toggle('rotate')
    }, 1000);

    if (btnText.textContent === 'dark_mode') {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }

}

backBtn.addEventListener('click', () => {
    mode()

    sMode = localStorage.getItem('mode') || '';    
})

// if user set the mode into dark apply dark mode
if (sMode === 'dark') {
    mode()
}

// cancell reload on submit the form
input.addEventListener('submit', (e) => {
    e.preventDefault();
})

// add data to html
function addData() {
    output.innerHTML = '' // to avoid repitation of any task

    data.forEach((ta, index) => {
        output.innerHTML += `
            <div class="task ${ta.do === true ? 'done' : ''}">
                <div class="text"><p>${ta.name}</p></div>
                <div class="btns">
                    <button onClick="done(${index})"><span class="material-symbols-outlined">check_circle</span></button>
                    <button onClick="edit(${index})"><span class="material-symbols-outlined">edit</span></button>
                    <button onClick="remove(${index})"><span class="material-symbols-outlined">delete</span></button>
                </div>
            </div>
        `
    });

}

// to add class done
function done(i) {
    data[i].do = !data[i].do
    localStorage.setItem('data', JSON.stringify(data))
    addData()
}

function edit(i) {
    editId = i
    task.value = data[i].name
    btn.textContent = 'update'
}

function remove(i) {
    data.splice(i, 1)
    localStorage.setItem('data', JSON.stringify(data));
    addData()
    msg.textContent = 'the task deleted successfuly'
}

// add data to output section when page is reloaded
addData()

// add tasks to output section
btn.addEventListener('click', () => {

    var tasks = {
        name: task.value,
        do: false
    }

    var test = data.some(ta => ta.name === tasks.name)

    // validation
    if (tasks.name === '') {
        msg.textContent = 'please enter your task'
        task.value = '' // empty the task input and get it ready for a new task
        return;
    } // avoid repitation
    else if (test === true) {
        msg.textContent = 'this task was added before'
        task.value = '' // empty the task input and get it ready for a new task
        return;
    }

    task.value = '' // empty the task input and get it ready for a new task 

    // the default
    if (editId === null) {
        data.push(tasks)
        msg.textContent = 'the task added successfuly'
    } else {
        // edit mode
        data[editId].name = tasks.name
        editId = null
        btn.textContent = 'add task'
        msg.textContent = 'the task updated successfuly'
    }

    // the all changes
    localStorage.setItem('data', JSON.stringify(data));

    // show data after change
    addData()
})