import Component from '../Component.js';
import { putTask } from '../services/list-api.js';

class TaskItem extends Component {
    onRender(dom) {
        const button = dom.querySelector('button');
        button.addEventListener('click', () => {
            const taskText = button.value;
            console.log(taskText)
            const selectedObject = {
                task: taskText,
                completed: false
            };
            putTask(selectedObject);
        });
    }
    renderHTML() {
        const task = this.props.task;
        const done = ifDone(task);
        const completed = ifCompleted(task);
        return /*html*/`
        <li class="task ${completed}">
        <p>${task.task}</p>
        <button value="${task.task}">${done}</button>
    </li>
        `;
    }
}

function ifDone(task) {

    if(task.completed) {
        return 'Done !';
    } else {
        return 'Click when Finished';
    }
}

function ifCompleted(task) {
    if(task.completed) {
        return 'finished';
    } else {
        return '';
    }
}

export default TaskItem;