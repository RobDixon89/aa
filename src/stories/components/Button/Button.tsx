import React from "react";
import Icon, { IconType } from "../../../utils/icon";
import s from "./Button.module.scss";

type ButtonType = "default" | "outline" | "text";
type ButtonCommonProps = {
  theme: ButtonType;
  label: string;
  icon?: IconType;
};

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  ButtonCommonProps;

const Button: React.FC<ButtonProps> = ({
  theme,
  icon,
  className: classes,
  label,
  ...attributes
}) => {
  return (
    <button
      className={`${s.button}${classes ? " " + classes : ""}`}
      data-theme={theme ?? "default"}
      data-icon={icon ?? IconType.arrow}
      {...attributes}
    >
      <span className={s.text}>{label}</span>
      <Icon icon={icon ?? IconType.arrow} />
    </button>
  );
};

export type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonCommonProps;

export const LinkButton: React.FC<LinkButtonProps> = ({
  theme,
  icon,
  className: classes,
  label,
  ...attributes
}) => {
  return (
    <a
      className={`${s.button}${classes ? " " + classes : ""}`}
      data-theme={theme ?? "default"}
      data-icon={icon ?? IconType.arrow}
      {...attributes}
    >
      <span className={s.text}>{label}</span>
      <Icon icon={icon ?? IconType.arrow} />
    </a>
  );
};

export default Button;
