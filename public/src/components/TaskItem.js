import Component from '../Component.js';

class TaskItem extends Component {
    renderHTML() {
        const task = this.props.task;
        const done = ifDone(task);
        const completed = ifCompleted(task);
        return /*html*/`
        <li class="task ${completed}">
        <p>${task.task}</p>
        <button>${done}</button>
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