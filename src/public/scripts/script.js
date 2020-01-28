let delBtns = document.querySelectorAll('.delBtn')
let queueBtns = document.querySelectorAll('.queueBtn')
let container = document.querySelector('.container')
delBtns.forEach(btn => btn.addEventListener('click', deleteVault))

// queueBtns.forEach(btn => btn.addEventListener('click', queueVault))

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
        
    }
    catch(err) {
        console.log(err)
    }
}


function showToast(message) {
    const toast = `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
        <div class="toast-header">
            <img src="..." class="rounded mr-2" alt="...">
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