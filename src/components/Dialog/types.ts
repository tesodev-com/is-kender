/**
 * Represents an action button in a dialog
 * @interface DialogAction
 */
export interface DialogAction {
  /** Text label for the action button */
  label: string;
  /** Unique identifier for the action */
  key: string;
  /** Click handler function for the action */
  onClick: () => void;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
}

/**
 * Props for the Dialog component
 * @interface DialogProps
 */
export interface DialogProps {
  /** Title text displayed at the top of the dialog */
  title?: string;
  /** Main message content of the dialog */
  message?: string;
  /** If true, dialog won't close when clicking outside or pressing ESC */
  persistent?: boolean;
  /** Array of action buttons to display in the dialog */
  actions?: DialogAction[];
  /** Custom width for the dialog (e.g. '500px', '50%') */
  width?: string;
}
