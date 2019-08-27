import Component from '../Component.js';
import TaskList from './TaskList.js';
import AddTask from './AddTask.js';
import { getList } from '../services/list-api.js';

class App extends Component {
    onRender(dom) {
        const main = dom.querySelector('main');
        const list = new TaskList({ tasks: [] });
        main.appendChild(list.renderDOM());
        
        const add = dom.querySelector('.add');

        const newTask = new AddTask();
        add.appendChild(newTask.renderDOM());

        getList()
            .then(tasks => {
                list.update({ tasks });
            });
    }
    renderHTML() {
        return /*html*/`
            <div>
                <header class="task-manage">
                    <h1>ADD</h1>
                    <form class="add">
                    </form>
                </header>
                <main>
                </main>
            </div>
        `;
    }
}

export default App;