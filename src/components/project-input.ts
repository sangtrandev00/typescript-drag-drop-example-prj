namespace App {
    // Project Input Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    
    // Khởi tạo một file html element như thế này (Liên tưởng qua dự án B2B của mình thì sẽ như thế nào ?)
    constructor() {

        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    private gatherUserInput(): [string, string, number] | undefined {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // Validation here (using third party library!!!)

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        // if(validate({}))
        if(!validate(titleValidatable) || !validate(peopleValidatable) || !validate(descriptionValidatable)) {
            
            alert("Invalid input, please try again!");

            return;
        }else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }

    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    // Add decorator here to solve the problem!! (bind this)
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // console.log("submitted form!");
        // console.log(this);
        // console.log(this.titleInputElement);
        // console.log((document.querySelector('#title') as HTMLInputElement )?.value);
        console.log(this.titleInputElement.value);
       const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;

            console.log(title, desc, people);

            projectState.addProject(title, desc, people);

            this.clearInputs();
        }

    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);


    }

    renderContent() {

    }

}
}