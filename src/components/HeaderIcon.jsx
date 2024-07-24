import React from "react";

function HeaderIcon({ icon, text }) {
  return (
    <button type="button" className="flex flex-col items-center gap-2">
      {icon}
      <p className="text-xs text-[#647995]">{text}</p>
    </button>
  );
}

export default HeaderIcon;
