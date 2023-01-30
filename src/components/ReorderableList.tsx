import { DialogButton, Focusable, GamepadButton } from "decky-frontend-lib"
import { useState } from "react"
import { FaEllipsisH } from "react-icons/fa"

export interface ReorderableEntry<T> {
  id: string,
  label: string,
  data?:T,
  position:number
}

type ListProps<T> = {
  entries: ReorderableEntry<T>[]
}

export function ReorderableList<T>(props: ListProps<T>) {
  // Given an array of plugins {plugin_key: plugin_label} {[key:string]: string}[]
  // Array order determines plugin position
  // TODO change order to be dependent on the 'position' attribute since JS arrays arn't reliable;
  
  const [entryList, setEntryList] = useState<ReorderableEntry<T>[]>(props.entries);
  const [reorderEnabled, setReorderEnabled] = useState<boolean>(false);

  function toggleReorderEnabled(): void {
    let rE = !reorderEnabled;
    setReorderEnabled(rE);

    if (!rE){ 
      console.log("Save configuration here") // #FIXME#
    }
  }

  return (
    <Focusable
      onSecondaryButton={toggleReorderEnabled}
      onSecondaryActionDescription={reorderEnabled ? "Save Order" : "Reorder"}
      onClick={toggleReorderEnabled}>
      {
        entryList.map((entry: ReorderableEntry<T>) => (
          <PluginItem listData={entryList} entryData={entry} reorderEntryFunc={setEntryList} reorderEnabled={reorderEnabled}/>
        ))
      }
    </Focusable>
  );
}

type ListEntryProps<T> = {
  listData: ReorderableEntry<T>[],
  entryData: ReorderableEntry<T>,
  reorderEntryFunc: CallableFunction,
  reorderEnabled: boolean
}

function PluginItem<T>(props: ListEntryProps<T>) {
  let listEntries = props.listData;

  function onClick(entryReference: ReorderableEntry<T>): void {
    console.log(`Do normal menu function for ${entryReference.label}. Ex: Reload, Disable, Uninstall, etc.`) // #FIXME#
  }

  function onReorder(e: Event): void {
    console.log(props.reorderEnabled);
    if (!props.reorderEnabled) return; // Return if not reordering enabled

    let event = e as CustomEvent;
    let currentIdx = listEntries.findIndex(pluginData => props.entryData === pluginData)
    if (currentIdx < 0) return; // Return if for some odd reason the pluginData isn't in the pluginList

    let targetIdx: number = -1;
    if (event.detail.button == GamepadButton.DIR_DOWN) {
      targetIdx = currentIdx+1;
    } else if (event.detail.button == GamepadButton.DIR_UP) {
      targetIdx = currentIdx-1;
    } 

    // #FIXME# If you want to add more conditionals here
    if (targetIdx >= listEntries.length || targetIdx < 0) return; // Return if invalid position

    let currentIdxValue = listEntries[currentIdx];
    listEntries[currentIdx] = listEntries[targetIdx];
    listEntries[targetIdx] = currentIdxValue;

    props.reorderEntryFunc([...listEntries]);
  }

  const baseCssProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
  
  return(
    // @ts-ignore
    <Focusable style={ props.reorderEnabled ? {...baseCssProps, background: "#678BA670"} : {...baseCssProps} } onButtonDown={onReorder}>
      <div>{props.entryData.label}</div>

      <DialogButton style={{maxWidth: "50px"}} onClick={() => onClick(props.entryData)}>
        <FaEllipsisH />
      </DialogButton>
    </Focusable>
  );
}