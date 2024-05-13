export class Header {
    element: HTMLElement;
    containerEl: HTMLElement;


    constructor(headerElId: string) {
        this.containerEl = document.getElementById(headerElId) ! as HTMLDivElement ;
        this.element = document.getElementById(headerElId) ! as HTMLDivElement ;
        this.render();
    }

    render() {
        this.containerEl = this.element;
    }

}