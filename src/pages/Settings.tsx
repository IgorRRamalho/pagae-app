import useIsMobile from "@hook/useIsMobile";
import SettingsDesktop from "./Settings/Settings.desktop";
import SettingsMobile from "./Settings/Settings.mobile";



const Settings = () => {
  const isMobile = useIsMobile();

  return isMobile ? <SettingsMobile /> : <SettingsDesktop />;
};

export default Settings;
