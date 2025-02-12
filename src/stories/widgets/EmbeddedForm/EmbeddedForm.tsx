import Button from '@/stories/Global/Button/Button';
import { EMAIL_RULE, PHONE_NUMBER_RULE, POSTCODE_RULE } from '@/utils';
import { IconType } from '@/utils/icon';
import { Turnstile } from '@marsidev/react-turnstile';
import { AnimatePresence, motion, useInView, Variants } from 'motion/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import g from '../../../lib/global.module.scss';
import Section, { Themes } from '../../Global/Section/Section';
import s from './EmbeddedForm.module.scss';

export type EmbeddedFormProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  confirmationMessage: string;
  formIntroduction: string | null;
  serviceOptions: string[];
  successMessage: string;
  target: string;
  title?: string | null;
  turnstileKey: string;
};

type FormState = {
  [key: string]: string;
};

const EmbeddedForm: React.FC<EmbeddedFormProps> = (props) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -35% 0px',
  });

  const [status, setStatus] = React.useState<
    'initial' | 'submitting' | 'error' | 'complete'
  >('initial');
  const [token, setToken] = React.useState<string>('');

  const formIds = {
    name: `${props.id}-full-name`,
    postcode: `${props.id}-postcode`,
    email: `${props.id}-email`,
    phone: `${props.id}-phone-number`,
    service: `${props.id}-service`,
    message: `${props.id}-message`,
  };

  const formVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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

  const onSubmit = async (data: FormState) => {
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 1000));

    const res = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const tokenData = await res.json();

    if (!tokenData.success) {
      setStatus('error');
    }

    const sent = true;

    // const sent = await sendEmail({
    //   to: props.target,
    //   from: data[formIds.email],
    //   subject: `Website contact request from ${data[formIds.name]}`,
    //   message: `<div style="font-family: sans-serif;
    //     <p><strong>Name:</strong> ${data[formIds.name]}</p>
    //     <p><strong>Postcode:</strong> ${data[formIds.postcode]}</p>
    //     <p><strong>Email:</strong> ${data[formIds.email]}</p>
    //     <p><strong>Phone Number:</strong> ${data[formIds.phone]}</p>
    //     <p><strong>Interested In:</strong> ${data[formIds.service]}</p>
    //     <p><strong>Message:</strong> ${data[formIds.message]}</p>
    //   `,
    // });

    if (!sent) {
      setStatus('error');
    } else {
      setStatus('complete');

      // await sendEmail({
      //   to: data[formIds.email],
      //   from: props.target,
      //   subject: `Thanks for getting in touch with Ashley Aerials`,
      //   message: `<div style="font-family: sans-serif; margin: 12px 0;">
      //     <p>${props.confirmationMessage.replaceAll('##name##', data[formIds.name].split(' ')[0])}</p>
      //   </div>`,
      // });
    }
  };

  return (
    <Section ref={ref} id={props.id} grid={true}>
      {props.title || props.children ? (
        <motion.div className={s.contentContainer}>
          {props.title !== null && <h2 className={s.title}>{props.title}</h2>}
          {props.children ? (
            <div className={`${g.richText}`}>{props.children}</div>
          ) : null}
        </motion.div>
      ) : null}

      <AnimatePresence>
        <motion.form
          className={s.form}
          onSubmit={handleSubmit(onSubmit)}
          data-theme={Themes.navy}
          variants={formVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            staggerChildren: 0.2,
            duration: 0.65,
            type: 'spring',
            bounce: 0.5,
          }}
        >
          {status === 'error' ? (
            <motion.p
              layoutId={`${formIds}-error-msg`}
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              data-error
            >
              Something went wrong, please try again.
            </motion.p>
          ) : null}

          {props.formIntroduction ? (
            <motion.p variants={formVariants}>
              {props.formIntroduction}
            </motion.p>
          ) : null}

          <motion.div className={s.field} variants={formVariants}>
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
              disabled={status === 'submitting' || status === 'complete'}
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
          </motion.div>

          <motion.div className={s.field} variants={formVariants}>
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
                pattern: POSTCODE_RULE,
              })}
              aria-invalid={!!errors[formIds.postcode]}
              disabled={status === 'submitting' || status === 'complete'}
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
          </motion.div>

          <motion.div className={s.field} variants={formVariants}>
            <label className={s.label} htmlFor={formIds.email}>
              Email Address*
            </label>
            <input
              className={s.input}
              id={formIds.email}
              type="text"
              placeholder="Email Address"
              {...register(formIds.email, {
                required: 'Please enter your email address',
                pattern: EMAIL_RULE,
              })}
              aria-invalid={!!errors[formIds.email]}
              disabled={status === 'submitting' || status === 'complete'}
            />
            {errors[formIds.email] ? (
              <motion.p
                layoutId={`${formIds.email}-id`}
                className={s.error}
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors[formIds.email]?.message}
              </motion.p>
            ) : null}
          </motion.div>

          <motion.div className={s.field} variants={formVariants}>
            <label className={s.label} htmlFor={formIds.phone}>
              Phone Number*
            </label>
            <input
              className={s.input}
              id={formIds.phone}
              type="text"
              placeholder="Phone Number"
              {...register(formIds.phone, {
                required: 'Please enter your phone number',
                pattern: PHONE_NUMBER_RULE,
              })}
              aria-invalid={!!errors[formIds.phone]}
              disabled={status === 'submitting' || status === 'complete'}
            />
            {errors[formIds.phone] ? (
              <motion.p
                layoutId={`${formIds.phone}-id`}
                className={s.error}
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors[formIds.phone]?.message}
              </motion.p>
            ) : null}
          </motion.div>

          {props.serviceOptions && props.serviceOptions.length > 0 ? (
            <motion.div className={s.field} variants={formVariants}>
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
                disabled={status === 'submitting' || status === 'complete'}
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
              {errors[formIds.service] ? (
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
            </motion.div>
          ) : null}

          <motion.div className={s.field} variants={formVariants}>
            <label className={s.label} htmlFor={formIds.message}>
              Your Enquiry*
            </label>
            <textarea
              className={`${s.input} ${s.textarea}`}
              id={formIds.message}
              placeholder="Your Enquiry"
              {...register(formIds.message, {
                required: 'Please enter your enquiry details',
              })}
              aria-invalid={!!errors[formIds.message]}
              disabled={status === 'submitting' || status === 'complete'}
            />
            {errors[formIds.message] ? (
              <motion.p
                layoutId={`${formIds.message}-id`}
                className={s.error}
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors[formIds.message]?.message}
              </motion.p>
            ) : null}
          </motion.div>

          <Turnstile
            className={s.turnstile}
            siteKey={props.turnstileKey}
            onSuccess={setToken}
            options={{
              theme: 'light',
              appearance: 'interaction-only',
            }}
            scriptOptions={{
              appendTo: 'body',
            }}
          />

          <Button
            type="submit"
            theme="default"
            label={status === 'submitting' ? 'Submitting' : 'Send Enquiry'}
            icon={status === 'submitting' ? IconType.none : IconType.arrow}
            disabled={status === 'submitting' || status === 'complete'}
          />

          {status === 'complete' ? (
            <motion.div
              layoutId={`${formIds.email}-success-msg`}
              className={s.success}
              variants={{
                hidden: { scale: 0, borderRadius: 5000, opacity: 0 },
                visible: { scale: 1, borderRadius: 0, opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65 }}
            >
              <p>Enquiry Submitted</p>
              <p>{props.successMessage}</p>
            </motion.div>
          ) : null}
        </motion.form>
      </AnimatePresence>
    </Section>
  );
};

export default EmbeddedForm;
