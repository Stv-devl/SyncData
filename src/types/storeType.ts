export interface BurgerState {
  isOpen: boolean;
  toggleBurger: () => void;
}

export interface PopupState {
  isOpen: boolean;
  content: string | null;
  type: string | null;
  x: number;
  y: number;
  openPopup: (content: string, x: number, y: number, type: string) => void;
  closePopup: () => void;
  handleMouseEnter: (
    event: React.MouseEvent,
    label: string,
    type: string
  ) => void;
  handleMouseLeave: () => void;
}
