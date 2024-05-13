/// <reference path="models/drag-drop-interface.ts"/>
/// <reference path="models/project.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind.ts"/>
/// <reference path="components/base-component.ts"/>
/// <reference path="components/project-item.ts"/>
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-input.ts"/>

namespace App {
    // Only initilize some function need to be defined here!!!
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}

