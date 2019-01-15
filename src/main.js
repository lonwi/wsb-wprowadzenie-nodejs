document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const form = document.getElementById('todos');
    const input = document.getElementById('todo');
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    function addNote(note) {
        const element = document.createElement('div');
        element.innerHTML = note;
        element.className = 'note';
        element.addEventListener('click', () => {
            const info = document.createElement('span');
            info.className = 'info';
            info.innerHTML = 'deleting';
            element.appendChild(info);
            fetch('/notes', {
                method: 'delete',
                headers: headers,
                body: JSON.stringify({note: note})
            })
            .then((res) => {
                res.json().then((data) => {
                    if(data.deleted === note) {
                        content.removeChild(element);
                    }
                })
            });
        });
        content.appendChild(element);
    }
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const note = input.value;
        input.value = '';
        addNote(note);
        fetch('/notes', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({note: note})
        });
    });
    
    fetch('/notes')
    .then(res => res.text())          // convert to plain text
    .then(text => console.log(text));
    /*
    fetch('/notes').then((res) => {
        console.log('fetch', res.json());
        res.json().then((data) => {
            console.log('res.json');
            content.innerHTML = '';
            data.notes.forEach((note) => {
                addNote(note);
            });
        });
    });
    */
});