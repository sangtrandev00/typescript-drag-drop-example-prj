export class Footer {
    element: HTMLElement;
    containerEl: HTMLElement;


    constructor(footerElId: string) {
        this.containerEl = document.getElementById(footerElId) ! as HTMLDivElement ;
        this.element = document.getElementById(footerElId) ! as HTMLDivElement ;
        this.render();
    }

    render() {
        this.containerEl = this.element;
    }

}