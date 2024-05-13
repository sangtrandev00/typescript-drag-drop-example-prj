namespace App {
    // ProjectList Class

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{

    assignedProjects: Project[];


    constructor(private type: 'active' | 'finished' ) {

        super('project-list', 'app', false, `${type}-projects`)

        this.assignedProjects = [];

        // Whenever something change (state change --> App rerender --> Like reactjs)
        // Doesn't run immediately!!! --> Tại sao lại có addListener ở đây (nó hoạt động như thế nào ?)

        projectState.addListener((projects: Project[]) => {

            console.log("inner add listener function");

            const relevantProjects = projects.filter(prj => {
                if(this.type === "active") {
                    return prj.status === ProjectStatus.Active
                }else {
                    return prj.status === ProjectStatus.Finished
                }
            });
            this.assignedProjects = relevantProjects;
            this.configure();
            this.renderProjects();
        })

        this.renderContent();
    }

    // Re render projects list (after add any item there!!!)
    private renderProjects() {

        const listEl = document.getElementById(`${this.type}-projects-list`) ! as HTMLUListElement;
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(`${this.type}-projects-list`, prjItem);
        }

    }

    configure() {
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('dragover', this.dragOverHandler);
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        // this.element.innerHTML = "";
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";

    }   

    // private attach() {
    //     this.hostElement.insertAdjacentElement('beforeend', this.element);
    // }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        event.preventDefault(); // Why ?
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }


    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        event.preventDefault();
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
}
}