let delBtns = document.querySelectorAll('.delBtn')
let queueBtns = document.querySelectorAll('.queueBtn')
let unqueueBtns = document.querySelectorAll('.unqueueBtn')

let container = document.querySelector('.container')
delBtns.forEach(btn => btn.addEventListener('click', deleteVault))
queueBtns.forEach(btn => btn.addEventListener('click', queueVault))
unqueueBtns.forEach(btn => btn.addEventListener('click', unqueueVault))

async function unqueueVault() {
    const [name, id] = this.id.split('-')
    console.log(name)
    console.log(id)
    try {
        const response = await fetch(`/queue/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        const toast = showToast(data.message)
        container.insertAdjacentHTML('afterbegin', toast)
        $('.toast').toast('show')
        const queueBtn  = document.createElement('button')
        queueBtn.classList.add("button", "btn", "btn-success", "queueBtn")
        queueBtn.name = id
        queueBtn.id=`queue-${id}`
        queueBtn.textContent = "Queue"
        this.parentNode.appendChild(queueBtn)
        queueBtn.addEventListener('click', queueVault)
        this.parentNode.removeChild(this)
    }
    catch (err) {
        console.log(err)
    }
}

async function queueVault() {
    const id = this.id.split('-')[1]
    try {
        const response = await fetch(`/queue/${id}`, {
            method: 'POST'
        })
        const data = await response.json()
        const toast = showToast(data.message)
        container.insertAdjacentHTML('afterbegin', toast)
        $('.toast').toast('show')
        const unqueueBtn = document.createElement('button')
        unqueueBtn.classList.add("button", "btn", "btn-warning", "unqueueBtn")
        unqueueBtn.name = id
        unqueueBtn.id = `unqueue-${id}`
        unqueueBtn.textContent = "Unqueue"
        this.parentNode.appendChild(unqueueBtn)
        unqueueBtn.addEventListener('click', unqueueVault)
        this.parentNode.removeChild(this)
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteVault() {
    const id = this.id.split('-')[1]
    try {
        const response = await fetch(`/file/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        const toast = showToast(data.message)
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
        container.insertAdjacentHTML('afterbegin', toast)
        $('.toast').toast('show')
        // setTimeout(() => )
        
    }
    catch(err) {
        console.log(err)
    }
}


function showToast(message) {
    const toast = `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
        <div class="toast-header">
            <img src="images/shield.png" class="rounded mr-2" alt="..." width="50px" height="50px">
            <strong class="mr-auto">Shield</strong>
            <small>11 mins ago</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    </div>`
    return toast
}