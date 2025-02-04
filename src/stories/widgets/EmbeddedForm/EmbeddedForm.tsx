import Button from '@/stories/Global/Button/Button';
import { AnimatePresence, motion, Variants } from 'motion/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import g from '../../../lib/global.module.scss';
import Section, { Themes } from '../../Global/Section/Section';
import s from './EmbeddedForm.module.scss';

export type EmbeddedFormProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: string | null;
  serviceOptions: string[];
};

type FormState = {
  [key: string]: string;
};

const EmbeddedForm: React.FC<EmbeddedFormProps> = (props) => {
  const formIds = {
    name: `${props.id}-full-name`,
    postcode: `${props.id}-postcode`,
    email: `${props.id}-email`,
    phone: `${props.id}-phone-number`,
    service: `${props.id}-service`,
    message: `${props.id}-message`,
  };
  const errorVariants: Variants = {
    hidden: { height: 0, marginTop: 0, opacity: 0 },
    visible: { height: 'auto', marginTop: 4, opacity: 1 },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit = async (data: FormState) => console.log(data);

  return (
    <Section id={props.id} grid={true}>
      {props.title || props.children ? (
        <div className={s.contentContainer}>
          {props.title !== null && <h2 className={s.title}>{props.title}</h2>}
          {props.children ? (
            <div className={`${g.richText}`}>{props.children}</div>
          ) : null}
        </div>
      ) : null}

      <AnimatePresence>
        <form
          className={s.form}
          onSubmit={handleSubmit(onSubmit)}
          data-theme={Themes.navy}
        >
          <p>Get in touch with us today</p>

          <div className={s.field}>
            <label className={s.label} htmlFor={formIds.name}>
              Full Name*
            </label>
            <input
              className={s.input}
              id={formIds.name}
              type="text"
              placeholder="Full Name"
              {...register(formIds.name, {
                required: 'Please enter your full name',
              })}
              aria-invalid={!!errors[formIds.name]}
            />
            {errors[formIds.name] ? (
              <motion.p
                layoutId={`${formIds.name}-id`}
                className={s.error}
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors[formIds.name]?.message}
              </motion.p>
            ) : null}
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor={formIds.postcode}>
              Postcode*
            </label>
            <input
              className={s.input}
              id={formIds.postcode}
              type="text"
              placeholder="Postcode"
              {...register(formIds.postcode, {
                required: 'Please enter your postcode',
              })}
              aria-invalid={!!errors[formIds.postcode]}
            />
            {errors[formIds.postcode] ? (
              <motion.p
                layoutId={`${formIds.postcode}-id`}
                className={s.error}
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors[formIds.postcode]?.message}
              </motion.p>
            ) : null}
          </div>

          {props.serviceOptions && props.serviceOptions.length > 0 ? (
            <div className={s.field}>
              <label className={s.label} htmlFor={formIds.service}>
                Select a Service*
              </label>
              <select
                className={`${s.input} ${s.select}`}
                id={formIds.service}
                {...register(formIds.service, {
                  required: `Please select the service you're interested in`,
                })}
                aria-invalid={!!errors[formIds.service]}
              >
                <option value=""></option>
                {props.serviceOptions.map((so) => (
                  <option
                    key={`${formIds.service}-${so.toLowerCase().replaceAll(/\W+/g, '-')}`}
                    value={so}
                  >
                    {so}
                  </option>
                ))}
              </select>
              {errors[formIds.postcode] ? (
                <motion.p
                  layoutId={`${formIds.service}-id`}
                  className={s.error}
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {errors[formIds.service]?.message}
                </motion.p>
              ) : null}
            </div>
          ) : null}

          <Button type="submit" theme="default" label="Send Enquiry" />
        </form>
      </AnimatePresence>
    </Section>
  );
};

export default EmbeddedForm;
