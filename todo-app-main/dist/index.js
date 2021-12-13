const themeIcon = document.querySelector(".them-icon")
const newTodoForm = document.getElementById("new-todo-from")
const todoListContainer = document.querySelector('.todos-list')
const dragText = document.querySelector(".drag-text")
const activeTodoAmountEl = document.getElementById("active-amount")
const filters = document.querySelectorAll('.filters li')
const clearBtn = document.querySelector(".clear-completed")

let todoArray = []
class Todo {
    constructor(text, status) {
        this.text = text
        this.status = status
    }
}

themeIcon.addEventListener('click', (e) => document.body.querySelector('main').classList.toggle("dark"))
newTodoForm.addEventListener('submit', createNewTodo.bind(event))
todoListContainer.addEventListener('click', triggerRemoveTodo.bind(event))
todoListContainer.addEventListener('click', triggerCompleteTodo.bind(event))
filters.forEach(filter => filter.addEventListener("click", filterTodo.bind(event)))
clearBtn.addEventListener('click', (e) => document.querySelectorAll(".todo.completed").forEach(todo => todo.remove()))

function createNewTodo(event) {
    event.preventDefault()
    const todoText = newTodoForm.querySelector("input").value

    if (todoText.trim() === '')
        return

    const newTodo = new Todo(todoText, 'active')
    addNewTodo(newTodo)
}

function addNewTodo(newTodo) {
    let notInList = true

    if (todoArray.length > 0) {
        todoArray.forEach(todo => {
            if (todo.text === newTodo.text)
                notInList = false
        })
    }
    if (todoArray.length === 0 || notInList) {
        todoArray.push(newTodo)
        addToListUI(newTodo)
    }
}

function addToListUI(newTodo) {
    const todoEl = document.createElement('div')
    todoEl.classList.add('todo')
    todoEl.classList.add('show')
    todoEl.classList.add(newTodo.status)
    todoEl.innerHTML =
        `
                    <div class="circle-wrapper"><div class="circle"></div></div>
                    <p class='todo-text'>${newTodo.text}</p>
                    <img src="./img/icon-cross.svg" alt="" class="remove-icon" />
                `
    todoListContainer.appendChild(todoEl)
    updateActiveTodoAmount()
}

function triggerRemoveTodo(event) {
    const target = event.target

    if (target.classList.contains("remove-icon")) {
        const todoEl = target.closest(".todo")
        const text = todoEl.querySelector("p.todo-text").textContent
        todoArray = todoArray.filter(function (todo, index, arr) {
            return todo.text !== text
        })
        todoListContainer.removeChild(todoEl)
        updateActiveTodoAmount()
    }
}

function triggerCompleteTodo(event) {
    const target = event.target
    if (target.classList.contains("circle-wrapper") || target.classList.contains('circle')) {
        const todoEl = target.closest(".todo")
        const text = todoEl.querySelector("p.todo-text").textContent
        todoEl.classList.add("completed")
        todoEl.classList.remove("active")
        target.closest(".circle-wrapper").classList.add('completed')

        todoArray.forEach(todo => {
            if (todo.text === text)
                todo.status = 'completed'
        })

        updateActiveTodoAmount()
        const selectedFilter = document.querySelector(".filters li.selected").id
        filterTodoListUI(selectedFilter)
    }
}

function updateActiveTodoAmount() {
    let activeAmount = 0
    todoArray.forEach(todo => {
        if (todo.status === 'active')
            activeAmount++
    })
    activeTodoAmountEl.textContent = activeAmount
}

function filterTodo(event) {
    const target = event.target
    if (target.classList.contains("selected"))
        return

    const filter = target.id
    document.querySelector(".filters li.selected").classList.remove("selected")
    target.classList.add("selected")

    filterTodoListUI(filter)
}

function filterTodoListUI(filter) {
    if (filter === 'all')
        document.querySelectorAll(".todo").forEach(todo => todo.classList.add("show"))
    else if (filter === 'completed') {
        document.querySelectorAll(".todo.active").forEach(todo => todo.classList.remove("show"))
        document.querySelectorAll(".todo.completed").forEach(todo => todo.classList.add("show"))
    }
    else if (filter === 'active') {
        document.querySelectorAll(".todo.completed").forEach(todo => todo.classList.remove("show"))
        document.querySelectorAll(".todo.active").forEach(todo => todo.classList.add("show"))
    }
}

new Sortable(todoListContainer, {
    animation: 150
});

