import { Confirm, Loading, Notify } from "notiflix";

enum DialogType {
  info,
  warning,
  succuss,
  error,
}
class DialogUtil {
  public alert(content: string, type = DialogType.info): void {
    switch (type) {
      case DialogType.error:
        Notify.failure(content);
        break;
      case DialogType.warning:
        Notify.warning(content);
        break;
      case DialogType.succuss:
        Notify.success(content);
        break;
      default:
        Notify.info(content);
        break;
    }
  }

  public confirm(
    title: string,
    content: string,
    okText: string,
    cancelText: string,
    okCallback: () => void,
    cancelCallback = () => {}
  ): void {
    Confirm.show(
      title,
      content,
      okText,
      cancelText,
      okCallback,
      cancelCallback
    );
  }
  public prompt(
    title: string,
    content: string,
    okText: string,
    cancelText: string,
    okCallback: (input: string) => void,
    cancelCallback: (input: string) => void
  ): void {
    Confirm.prompt(
      title,
      content,
      "",
      okText,
      cancelText,
      okCallback,
      cancelCallback
    );
  }

  public showProgressBar(): void {
    Loading.circle();
  }

  public dismissProgressBar(): void {
    Loading.remove();
  }
}

const dialogUtil = new DialogUtil();

export { dialogUtil as DialogUtil, DialogType };
