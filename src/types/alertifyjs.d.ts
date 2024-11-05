declare module 'alertifyjs' {
  interface AlertifyNotifier {
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    notify(message: string): void;
    delay(time: number): AlertifyNotifier;
    position(position: string): AlertifyNotifier;
  }

  interface Alertify {
    notify: AlertifyNotifier;
    set(key: string, value: any): void;
    alert(message: string, callback?: () => void): void;
    confirm(message: string, callback?: () => void): void;
    prompt(message: string, callback?: (evt: any, value: string) => void): void;
    success(message: string): void;
    error(message: string): void;
    warning(message: string): void;
  }

  const alertify: Alertify;
  export default alertify;
}