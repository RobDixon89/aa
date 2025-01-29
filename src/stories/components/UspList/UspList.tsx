import React from "react";
import type { IconType } from "../../../utils/icon";
import Icon from "../../../utils/icon";
import s from "./UspList.module.scss";

export type UspModel = {
  icon: IconType;
  text: string;
};

type UspListTheme = "default" | "light" | "dark";

export type UspListProps = {
  id: string;
  items: UspModel[];
  theme?: UspListTheme;
};

const UspList: React.FC<UspListProps> = (props) => {
  if (!props.items || props.items.length === 0) {
    return null;
  }

  return (
    <div className={s.uspList} data-theme={props.theme}>
      {props.items.map((item, i) => (
        <div key={`${props.id}-usp-${i}`} className={s.usp}>
          <Icon icon={item.icon} />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default UspList;
