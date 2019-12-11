import { Component, Inject } from '@angular/core';

import { MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';

@Component({
    templateUrl: 'dialog-alert.html'
})

export class DialogAlertComponent {
    public title; yesBtn; noBtn;
    constructor(
        public dialogRef: MdcDialogRef<DialogAlertComponent>,
        @Inject(MDC_DIALOG_DATA) data: any) {
        this.title = data.title;
        this.yesBtn = data.yesBtn;
        this.noBtn = data.noBtn;
    }
}
