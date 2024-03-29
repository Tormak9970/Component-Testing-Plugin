import { DialogButton } from "decky-frontend-lib";
import { ReorderableEntry, ReorderableList } from "../components/ReorderableList";
import { FaCheckCircle, FaDownload, FaEllipsisH } from "react-icons/fa";
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
  console.log(`Updating ${name} to version ${update?.name}`);
}

function UpdateButton(props:UpdateButtonProps<PluginData>) {
  const data = props.entry.data;

  return (
    <Fragment>
      {(data?.update != undefined) ? (
        <DialogButton
          style={{
            height: '40px',
            minWidth: '60px',
            marginRight: '10px'
          }}
          onClick={() => requestPluginInstall(props.entry.label, data?.update)}
          onOKButton={() => requestPluginInstall(props.entry.label, data?.update)}
          onOKActionDescription="Update Plugin"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            Update to {data?.update?.name}
            <FaDownload style={{ paddingLeft: '2rem' }} />
          </div>
        </DialogButton>
      ) : (
        <DialogButton
          style={{
            height: '40px',
            minWidth: '60px',
            marginRight: '10px'
          }}
          // disabled={true}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            Up to date
            {/* Current Version */}
            <FaCheckCircle style={{ paddingLeft: '4.4rem' }} />
          </div>
        </DialogButton>
      )}
    </Fragment>
  );
}

type ActionButtonProps<T> = {
  entry: ReorderableEntry<T>
}

function ActionButtion(props:ActionButtonProps<PluginData>){
  function onAction(entryReference: ReorderableEntry<PluginData>): void {
    console.log(`Do normal menu function for ${entryReference.label}. Ex: Reload, Disable, Uninstall, etc.`) // #FIXME#
  }

  return (
    <DialogButton
      style={{
        height: "40px",
        minWidth: "40px",
        width: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
      }}
      onClick={() => onAction(props.entry)}
      onOKButton={() => onAction(props.entry)}
    >
      <FaEllipsisH />
    </DialogButton>
  );
}

type InteractablesProps<T> = {
  entry: ReorderableEntry<T>
}

function Interactables(props:InteractablesProps<PluginData>) {
  return (
    <Fragment>
      <UpdateButton entry={props.entry} />
      <ActionButtion entry={props.entry} />
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
    },
    {
      label: "Animation Changer",
      data: {
        update: undefined
      },
      position: 3
    },
    {
      label: "AutoFlatpaks",
      data: {
        update: {
          name: "1.6.4",
          hash: "",
          artifact: ""
        }
      },
      position: 4
    },
    {
      label: "Audio Loader",
      data: {
        update: undefined
      },
      position: 5
    },
    {
      label: "Bluetooth",
      data: {
        update: {
          name: "2.0.2",
          hash: "",
          artifact: ""
        }
      },
      position: 6
    },
    {
      label: "Controller Tools",
      data: {
        update: undefined
      },
      position: 7
    },
    {
      label: "Deck FAQs",
      data: {
        update: undefined
      },
      position: 8
    },
    {
      label: "Deck Roulette",
      data: {
        update: undefined
      },
      position: 9
    },
    {
      label: "Deck Settings",
      data: {
        update: {
          name: "1.2.0",
          hash: "",
          artifact: ""
        }
      },
      position: 10
    },
    {
      label: "Decky Cloud Save",
      data: {
        update: {
          name: "1.1.1",
          hash: "",
          artifact: ""
        }
      },
      position: 11
    },
    {
      label: "Decky Recorder",
      data: {
        update: undefined
      },
      position: 12
    }
  ];

  function onSave(entries: ReorderableEntry<PluginData>[]): void {
    console.log("Saving reorderable list...", entries);
  }

  return (
    <ReorderableList<PluginData> entries={entries} onSave={onSave} interactables={Interactables}/>
  );
}