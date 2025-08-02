import React from "react";
import PropTypes from "prop-types";

export default function SkillBadge({
  label,
  color = "#D6FB30",
  as: Comp = "span",
  className = "",
  ...rest
}) {
  return (
    <Comp
      {...rest}
      className={`inline-flex w-fit flex-shrink-0 rounded-[10px] px-3 leading-none py-2 font-headlines text-black uppercase text-5xl ${className}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </Comp>
  );
}

SkillBadge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  as: PropTypes.elementType,
  className: PropTypes.string,
};
