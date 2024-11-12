import React from "react";

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  id,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <label className="check" htmlFor={id}>
        <svg viewBox="0 0 18 18" height="40px" width="40px">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>

      <style jsx>{`
        .check {
          cursor: pointer;
          position: relative;
          margin: auto;
          width: 18px;
          height: 18px;
          -webkit-tap-highlight-color: transparent;
          transform: translate3d(0, 0, 0);
        }

        .check:before {
          content: "";
          position: absolute;
          top: -15px;
          left: -15px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgb(33 33 33 / 0%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .check svg {
          position: relative;
          z-index: 1;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke: #119933;
          stroke-width: 1;
          transform: translate3d(0, 0, 0);
          transition: all 0.2s ease;
        }

        .check svg path {
          stroke-dasharray: 60;
          stroke-dashoffset: 0;
        }

        .check svg polyline {
          stroke-dasharray: 22;
          stroke-dashoffset: 66;
        }

        .check:hover:before {
          opacity: 1;
        }

        .check:hover svg {
          stroke: #119933;
        }

        #${id}:checked + .check svg {
          stroke: #119933;
          stroke-width: 2;
        }

        #${id}:checked + .check svg path {
          stroke-dashoffset: 60;
          transition: all 0.3s linear;
        }

        #${id}:checked + .check svg polyline {
          stroke-dashoffset: 42;
          transition: all 0.2s linear;
          transition-delay: 0.15s;
          stroke: #119933;
        }
      `}</style>
    </div>
  );
};

export default CustomCheckbox;
