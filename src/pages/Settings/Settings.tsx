import React, { FC } from "react";
import { Outlet } from "react-router";
import SettingSidebar from "../../components/SettingSidebar/SettingSidebar";

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  return (
    <>
      <SettingSidebar />
      <Outlet />
    </>
  );
};

export default Settings;
