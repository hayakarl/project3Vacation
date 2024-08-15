import { Notyf } from 'notyf';

class Notify {
  private notyf = new Notyf({
    duration: 8000,
    dismissible: true,
    position: { x: 'left', y: 'top' },
    ripple: true,
  });

  public success(message: string) {
    this.notyf.success(message);
  }

  public error(message: string) {
    this.notyf.error(message);
  }
}

export const notify = new Notify();
