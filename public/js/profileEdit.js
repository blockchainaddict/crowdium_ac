addEventListener('load', function(){
    // To make profile editable

    const edit_link = document.querySelector('#edit_button');
    const editables = document.querySelectorAll('#user_data_input');
    const submitEditForm = document.querySelector('#edit_user');

    const editable = () =>{
        edit_link.classList.toggle('hide_button');
        submitEditForm.classList.toggle('inactive');
        for(let i=0; i<editables.length; i++){
            editables[i].toggleAttribute('disabled');
        }
        console.log('All toggled');
        
    }

    edit_link.addEventListener('click', editable);
})