import { ReorderableEntry, ReorderableList } from "../components/ReorderableList";

/**
 * Creates a ReorderableList testing window.
 * @returns The ReorderableList testing window.
 */
export function ReorderableListTester() {
  let entries: ReorderableEntry<string>[] = [
    {
      id: "decky-autoflatpaks",
      label: "Bash Shortcuts",
      data: "data",
      position: 0
    },
    {
      id: "decky-autosuspend",
      label: "CSS Loader",
      data: "data",
      position: 1
    },
    {
      id: "sdh-cssloader",
      label: "Power Tools",
      data: "data",
      position: 2
    }
  ];

  function onAction(entryReference: ReorderableEntry<string>): void {
    console.log(`Do normal menu function for ${entryReference.label}. Ex: Reload, Disable, Uninstall, etc.`) // #FIXME#
  }

  function onSave(entries: ReorderableEntry<string>[]): void {
    console.log("Saving reorderable list...");
  }

  return (
    <ReorderableList<string> entries={entries} onAction={onAction} onSave={onSave}/>
  );
}