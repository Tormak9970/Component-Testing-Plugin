import { DialogButton } from "decky-frontend-lib";
import { ReorderableEntry, ReorderableList } from "../components/ReorderableList";
import { FaDownload } from "react-icons/fa";
import { Fragment } from "react";

interface StorePluginVersion {
  name: string;
  hash: string;
  artifact: string | undefined | null;
}

type PluginData = {
  update?: StorePluginVersion
}

type UpdateButtonProps<T> = {
  entry: ReorderableEntry<T>
}

function requestPluginInstall(name?:string, update?:StorePluginVersion) {

}

function UpdateButton(props:UpdateButtonProps<PluginData>) {
  const data = props.entry.data;

  return (
    <Fragment>
      {(data?.update != undefined) && (
        <DialogButton
          style={{ height: '40px', minWidth: '60px', marginRight: '10px' }}
          onClick={() => requestPluginInstall(props.entry.label, data?.update)}
          onOKButton={() => requestPluginInstall(props.entry.label, data?.update)}
          onOKActionDescription="Update Plugin"
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            Update to {data?.update?.name}
            <FaDownload style={{ paddingLeft: '2rem' }} />
          </div>
        </DialogButton>
      )}
    </Fragment>
  );
}

/**
 * Creates a ReorderableList testing window.
 * @returns The ReorderableList testing window.
 */
export function ReorderableListTester() {
  let entries: ReorderableEntry<PluginData>[] = [
    {
      label: "Bash Shortcuts",
      data: {
        update: {
          name: "1.3.0",
          hash: "",
          artifact: ""
        }
      },
      position: 0
    },
    {
      label: "CSS Loader",
      position: 1
    },
    {
      label: "Power Tools",
      data: {
        update: undefined
      },
      position: 2
    }
  ];

  function onAction(entryReference: ReorderableEntry<PluginData>): void {
    console.log(`Do normal menu function for ${entryReference.label}. Ex: Reload, Disable, Uninstall, etc.`) // #FIXME#
  }

  function onSave(entries: ReorderableEntry<PluginData>[]): void {
    console.log("Saving reorderable list...", entries);
  }

  return (
    <ReorderableList<PluginData> entries={entries} onAction={onAction} onSave={onSave} secondButton={UpdateButton}/>
  );
}