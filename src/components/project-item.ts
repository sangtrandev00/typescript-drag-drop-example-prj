namespace App {
    
// Project Item Class

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    private project: Project;

    get persons() {
        if(this.project.people === 1) {
            return '1 person';
        }else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        console.log("host Id project item: ", hostId);
        super('single-project', hostId, false, project.id );
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);

    }

    renderContent() {
        console.log(this.element);
        this.element.setAttribute('draggable', "true");
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = ` ${this.persons} assigned`;
        this.element.querySelector("p")!.textContent = this.project.description;
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = "move";
        // console.log('Drag start', event.dataTransfer!.setData('text') )
    }

    @Autobind
    dragEndHandler(event: DragEvent): void {
        console.log('Drag end', event.target)
    }
}
}