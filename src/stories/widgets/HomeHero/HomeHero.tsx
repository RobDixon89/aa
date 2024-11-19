import React from "react";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import s from "./HomeHero.module.scss";

export type HomeHeroProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: "homeHero";
  title: string;
  content?: string;
};

type Props = Omit<HomeHeroProps, "_type">;

const HomeHero: React.FC<Props> = (props) => {
  return (
    <Section className={s.homeHero}>
      <h1>{props.title}</h1>

      <Button theme="default" label="Default Button" />
      <Button theme="outline" label="Outline Button" />
      <Button theme="text" label="Text Button" />
    </Section>
  );
};

export default HomeHero;
