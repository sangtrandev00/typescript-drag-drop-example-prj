namespace App {
    
// Project State management 
type Listener<T> = (items: T[]) => void;

// Class State
class State<T> {
    protected listeners: Listener<T>[] = []; // For what ?

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }

}


export class ProjectState extends State<Project> {

    // Like redux ????

    private projects : Project[] = [];
    private static instance : ProjectState;
    private constructor() {
        super();
    }

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Listener<Project>) {
        console.log("add listener");
        console.log(listenerFn);
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {

        // const newProject = {
        //     id: Math.random().toString(),
        //     title: title,
        //     description: description,
        //     people: numOfPeople
        // }

        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);

        this.projects.push(newProject);

        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {

        const project = this.projects.find((p) => p.id === projectId);
        
        if(project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); //Save callback before call here (wait until event clicked)

        }
    }

}

export const projectState = ProjectState.getInstance();


}