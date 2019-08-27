import Component from '../Component.js';
import TaskItem from './TaskItem.js';

class TaskList extends Component {
    onRender(dom) {
        const tasks = this.props.tasks;

        tasks.forEach(task => {
            const props = { task: task };
            const taskItem = new TaskItem(props);
            const taskItemDOM = taskItem.renderDOM();
            dom.appendChild(taskItemDOM);
        });
    }

    renderHTML() {
        return /*html*/`
        <ul class="tasks"><ul>
        `;
    }
}

export default TaskList;