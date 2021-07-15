interface CalciteModalProps {
  /** the modal's title */
  title?: string;
  /** the text for the OK button */
  okText?: string;
  /** modifiers for the ok button */
  okBtnModifiers?: ButtonModifier[]
  /** the cancel button text */
  cancelText?: string;
  /** modifiers for the cancel button */
  cancelBtnModifiers?: string[];
  /** option to show cancel button */
  showCancelButton?: boolean;
  /** property to handle showing the modal */
  visible?: boolean;
}