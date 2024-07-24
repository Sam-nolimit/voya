import React, { useState } from "react";

function TabSwitcher({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="">
      <div
        className={`flex gap-8 whitespace-nowrap overflow-scroll hide-scrollbar`}
      >
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            className={`${
              activeTab === index
                ? "text-[#0D6EFD] border-b-[3px] border-[#0D6EFD]"
                : "text-[#98A2B3] border-transparent"
            } focus:outline-none border-b-2 text-sm `}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
}

export default TabSwitcher;
