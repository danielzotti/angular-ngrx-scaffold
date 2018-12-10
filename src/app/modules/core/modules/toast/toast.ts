export class Toast {
  id: number;
  config: any = {
    dismiss: 'auto',
    enableHTML: false,
    titleClass: '',
    messageClass: '',
    toastLife: 3000,
    showCloseButton: false
  };
  timeoutId: any;

  constructor(
    public type: string,
    public message: string,
    public title?: string,
    public data?: Object
  ) {}
}
