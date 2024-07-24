import React, { useEffect } from "react";
import axios from "axios";
import TabSwitcher from "../components/TabSwitcher";
import UsersTable from "./components/UsersTable";

const tabs = [
  { label: "Users", content: <UsersTable /> },
  { label: "Roles", content: <div>Roles</div> },
];

function UserRole() {
 
  return (
    <div className="w-full">
      <h6 className="text-[#98A2B3] text-sm">
        Settings / Users & Roles Settings
      </h6>

      <h3 className="text-2xl text-[#000] font-bold mt-10">Users & Roles</h3>
      <p className="text-sm text-[#98A2B3] mt-3">
        Manage all users in your business
      </p>

      <div className="mt-10 w-full">
        <TabSwitcher tabs={tabs} />
      </div>
    </div>
  );
}

export default UserRole;
