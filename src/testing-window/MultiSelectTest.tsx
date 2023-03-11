import { DropdownOption } from "decky-frontend-lib";
import { MultiSelect } from "../components/MultiSelect";



/**
 * Creates a MultiSelect testing window.
 * @returns The MultiSelect testing window.
 */
export function MultiSelectTester() {
  let selected: DropdownOption[] = [];
  let options = [
    { label: "Log In", data: "Log In" },
    { label: "Log Out", data: "Log Out" },
    { label: "Game Start", data: "Game Start" },
    { label: "Game End", data: "Game End" },
    { label: "Game Install", data: "Game Install" },
    { label: "Game Uninstall", data: "Game Uninstall" },
    { label: "Game Achievement Unlocked", data: "Game Achievement Unlocked" },
    { label: "Screenshot Taken", data: "Screenshot Taken" },
    { label: "Message Recieved", data: "Message Recieved" },
    { label: "SteamOS Update Available", data: "SteamOS Update Available" },
    { label: "Deck Shutdown", data: "Deck Shutdown" },
    { label: "Deck Sleep", data: "Deck Sleep" }
  ];

  return (
    <MultiSelect options={options} label="Select a hook" selected={selected} />
  );
}