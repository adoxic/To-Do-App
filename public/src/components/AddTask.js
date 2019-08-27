import Component from '../Component.js';
import { addTask } from '../services/list-api.js';

class AddTask extends Component {
    onRender(form) {

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const task = {
                task: formData.get('#new-task'),
                completed: false            
            };

            addTask(task)
                .catch(err => {
                    return ('cat not saved :(', err);
                });
        });
    }
    renderHTML() {
        return /*html*/`
        <form class="add">
            <input type="text" id="new-task">
            <button>Add New Task</button>
        </form>
        `;
    }
}

export default AddTask;