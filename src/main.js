document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const form = document.getElementById('todos');
    const input = document.getElementById('todo');
    
    function addNote(note) {
        const element = document.createElement('div');
        element.innerHTML = note;
        element.className = 'note';
        content.appendChild(element);
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var note = input.value;
        input.value = '';
        addNote(note);
    });
    
});