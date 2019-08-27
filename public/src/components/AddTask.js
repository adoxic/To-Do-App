import Component from '../Component.js';
import { addTask } from '../services/list-api.js';

class AddTask extends Component {
    onRender(dom) {
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=new-task]');
    
        form.addEventListener('submit', event => {
            event.preventDefault();
            
            const task = {
                task: input.value,
                completed: false            
            };

            addTask(task);
                // .catch(err => {
                //    // console.log('task not saved :(', err);
                // });
        });
    }
    renderHTML() {
        return /*html*/`
        <section>
        <form class="add">
            <input type="text" name="new-task">
            <button>Add New Task</button>
        </form>
        </section>
        `;
    }
}

export default AddTask;