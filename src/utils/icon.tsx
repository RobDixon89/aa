import React from "react";

export enum IconType {
  arrow = "arrow",
  brain = "brain",
  chevron = "chevron",
  clipboard = "clipboard",
  filledTick = "filled-tick",
  none = "none",
  phone = "phone",
  ratingTick = "rating-tick",
  thumbsUp = "thumbs-up",
}

type IconProps = React.HTMLAttributes<SVGElement> & {
  icon: string;
};

export type CtaIconModel = CtaModel & {
  icon?: IconType;
};

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  switch (icon) {
    case "arrow":
      return (
        <svg
          viewBox="0 0 14.2 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M13 6C13.2761 6 13.5 5.77614 13.5 5.5C13.5 5.22386 13.2761 5 13 5V6ZM0 6H13V5H0V6Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.18188 0.85353L12.8284 5.50008L8.18209 10.1464L8.8892 10.8535L13.8892 5.85353L13.8855 5.84988L14.2354 5.49997L13.8854 5.14997L13.889 5.14642L8.88899 0.146423L8.18188 0.85353Z"
            fill="currentColor"
          />
        </svg>
      );

    case "brain":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 14C5.34315 14 4 15.3431 4 17C4 18.6569 5.34315 20 7 20C7.35064 20 7.68722 19.9398 8 19.8293"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.26388 15.6044C2.92426 14.958 2 13.5868 2 11.9998C2 10.7881 2.53873 9.70228 3.38974 8.96875"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.42053 8.8882C3.1549 8.49109 3 8.01363 3 7.5C3 6.11929 4.11929 5 5.5 5C6.06291 5 6.58237 5.18604 7.00024 5.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.23769 5.56533C7.08524 5.24215 7 4.88103 7 4.5C7 3.11929 8.11929 2 9.5 2C10.8807 2 12 3.11929 12 4.5V20"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 20C8 21.1046 8.89543 22 10 22C11.1046 22 12 21.1046 12 20"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 7C12 8.65685 13.3431 10 15 10"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C16.6494 20 16.3128 19.9398 16 19.8293"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.7363 15.6044C21.0759 14.958 22.0002 13.5868 22.0002 11.9998C22.0002 10.7881 21.4614 9.70228 20.6104 8.96875"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5797 8.8882C20.8453 8.49109 21.0002 8.01363 21.0002 7.5C21.0002 6.11929 19.8809 5 18.5002 5C17.9373 5 17.4178 5.18604 17 5.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 4.5C12 3.11929 13.1193 2 14.5 2C15.8807 2 17 3.11929 17 4.5C17 4.88103 16.9148 5.24215 16.7623 5.56533"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 20C16 21.1046 15.1046 22 14 22C12.8954 22 12 21.1046 12 20"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "clipboard":
      return (
        <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.25 14H16.25"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.25 10H10.25"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.25 18H12.25"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.25 3H6.25C5.14543 3 4.25 3.89543 4.25 5V20C4.25 21.1046 5.14543 22 6.25 22H18.25C19.3546 22 20.25 21.1046 20.25 20V5C20.25 3.89543 19.3546 3 18.25 3H14.75M10.25 3V1M10.25 3V5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "chevron":
      return (
        <svg viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.946289 1.35359L5.59284 6.00014L0.946495 10.6465L1.6536 11.3536L6.6536 6.35359L6.64995 6.34994L6.99985 6.00003L6.64985 5.65003L6.6534 5.64648L1.6534 0.646484L0.946289 1.35359Z"
            fill="currentColor"
          />
        </svg>
      );

    case "filled-tick":
      return (
        <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 2.0625C7.57868 2.0625 1.5625 8.07868 1.5625 15.5C1.5625 22.9214 7.57868 28.9375 15 28.9375C22.4214 28.9375 28.4375 22.9214 28.4375 15.5C28.4375 8.07868 22.4214 2.0625 15 2.0625ZM9.41305 15.4621C9.04694 15.096 8.45335 15.096 8.08722 15.4621C7.72111 15.8282 7.72111 16.4218 8.08722 16.7879L11.8372 20.5379C12.2034 20.904 12.797 20.904 13.163 20.5379L21.913 11.7879C22.2791 11.4218 22.2791 10.8282 21.913 10.4621C21.5469 10.096 20.9534 10.096 20.5873 10.4621L12.5001 18.5491L9.41305 15.4621Z"
            fill="currentColor"
          />
        </svg>
      );

    case "phone":
      return (
        <svg viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.21221 0.0539551H5.3813C5.64521 0.0539551 5.88149 0.218678 5.9744 0.467433L7.20407 3.75992C7.24481 3.86891 7.25512 3.98702 7.23391 4.10149L6.61774 7.42977C7.37509 9.22324 8.62603 10.4285 10.7007 11.5096L13.9662 10.8724C14.0821 10.8498 14.202 10.8603 14.3123 10.9026L17.592 12.1611C17.8377 12.2554 18 12.4926 18 12.7574V15.8069C18 17.1898 16.79 18.3121 15.3746 18.002C12.7947 17.4367 8.01492 15.9998 4.6675 12.629C1.46105 9.40012 0.386747 4.93967 0.0251037 2.52866C-0.181242 1.15295 0.914402 0.0539551 2.21221 0.0539551Z"
            fill="currentColor"
          />
        </svg>
      );

    case "rating-tick":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5217 2.62356C11.3151 1.75243 12.6857 1.75243 13.4791 2.62356L14.4993 3.74379C14.9002 4.18406 15.4765 4.42276 16.0714 4.39496L17.5849 4.32423C18.7618 4.26922 19.7311 5.23845 19.6761 6.41542L19.6053 7.92893C19.5775 8.52376 19.8162 9.10004 20.2565 9.50099L21.3767 10.5212C22.2479 11.3146 22.2479 12.6852 21.3767 13.4786L20.2565 14.4988C19.8162 14.8997 19.5775 15.476 19.6053 16.0709L19.6761 17.5844C19.7311 18.7613 18.7618 19.7306 17.5849 19.6756L16.0714 19.6048C15.4765 19.577 14.9002 19.8157 14.4993 20.256L13.4791 21.3762C12.6857 22.2474 11.3151 22.2474 10.5217 21.3762L9.50148 20.256C9.10053 19.8157 8.52425 19.577 7.92942 19.6048L6.4159 19.6756C5.23894 19.7306 4.26971 18.7613 4.32472 17.5844L4.39545 16.0709C4.42325 15.476 4.18455 14.8997 3.74428 14.4988L2.62405 13.4786C1.75292 12.6852 1.75292 11.3146 2.62405 10.5212L3.74428 9.50099C4.18455 9.10004 4.42325 8.52376 4.39545 7.92893L4.32472 6.41541C4.26971 5.23845 5.23894 4.26922 6.41591 4.32423L7.92942 4.39496C8.52425 4.42276 9.10053 4.18406 9.50148 3.74379L10.5217 2.62356Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "thumbs-up":
      return (
        <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.2224 20.0001H4.85C4.51863 20.0001 4.25 19.7315 4.25 19.4001V9.60011C4.25 9.26874 4.51863 9.00011 4.85 9.00011H7.61762C8.32015 9.00011 8.97116 8.63151 9.3326 8.0291L12.043 3.51172C12.6279 2.53699 14.0054 2.44433 14.7155 3.33197C15.0502 3.75036 15.1581 4.30646 15.0041 4.81967L13.9817 8.2277C13.8662 8.61267 14.1545 9.00011 14.5564 9.00011H19.1315C20.4502 9.00011 21.408 10.2541 21.061 11.5263L19.1519 18.5263C18.9146 19.3965 18.1243 20.0001 17.2224 20.0001Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M7.75 20V9"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
};

export default Icon;
