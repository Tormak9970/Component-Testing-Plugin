import { DialogButton, Field, Focusable, GamepadButton, gamepadDialogClasses, quickAccessControlsClasses } from "decky-frontend-lib"
import { Fragment, useState } from "react"
import { FaEllipsisH } from "react-icons/fa"

interface NotificationBadgeProps {
  show?: boolean;
}

function NotificationBadge(props:NotificationBadgeProps) {
  return props.show ? (
    <div
      style={{
        position: 'absolute',
        top: 'calc(50% - 5px)',
        right: '90px',
        height: '10px',
        width: '10px',
        background: 'orange',
        borderRadius: '50%'
      }}
    />
  ) : null;
}

export type ReorderableEntry<T> = {
  label: string,
  data?:T,
  position:number,
  alert?:boolean
}

type ListProps<T> = {
  entries: ReorderableEntry<T>[],
  onAction: (entryReference: ReorderableEntry<T>) => void,
  onSave: (entries: ReorderableEntry<T>[]) => void
}

/**
 * A component for creating reorderable lists.
 * 
 * Implementation example can be found {@link https://github.com/Tormak9970/Component-Testing-Plugin/blob/main/src/testing-window/ReorderableListTest.tsx here}
 */
export function ReorderableList<T>(props: ListProps<T>) {
  const [entryList, setEntryList] = useState<ReorderableEntry<T>[]>(props.entries.sort((a:ReorderableEntry<T>, b:ReorderableEntry<T>) => a.position - b.position));
  const [reorderEnabled, setReorderEnabled] = useState<boolean>(false);

  function toggleReorderEnabled(): void {
    let newReorderValue = !reorderEnabled;
    setReorderEnabled(newReorderValue);

    if (!newReorderValue){
      props.onSave(entryList);
    }
  }

  return (
    <Fragment>
      <style>{`
        .reorderable-cope {
          width: inherit;
          height: inherit;

          flex: 1 1 1px;
          scroll-padding: 48px 0px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-content: stretch;
        }
        .reorderable-cope .${quickAccessControlsClasses.PanelSection} {
          padding: 0px;
        }

        .reorderable-cope .${gamepadDialogClasses.FieldChildren} {
          margin: 0px 16px;
        }
        
        .reorderable-cope .${gamepadDialogClasses.FieldLabel} {
          margin-left: 16px;
        }

        .reorderable-cope .custom-buttons {
          width: inherit;
          height: inherit;
          display: inherit;
        }

        .reorderable-cope .custom-buttons .${gamepadDialogClasses.FieldChildren} {
          margin: 0px 16px;
        }
      `}</style>
      <div className="reorderable-cope">
        <Focusable
          onSecondaryButton={toggleReorderEnabled}
          onSecondaryActionDescription={reorderEnabled ? "Save Order" : "Reorder"}
          onClick={toggleReorderEnabled}>
          {
            entryList.map((entry: ReorderableEntry<T>) => (
              <ReorderableItem
                listData={entryList}
                entryData={entry}
                reorderEntryFunc={setEntryList}
                reorderEnabled={reorderEnabled}
                onAction={props.onAction} />
            ))
          }
        </Focusable>
      </div>
    </Fragment>
  );
}

type ListEntryProps<T> = {
  listData: ReorderableEntry<T>[],
  entryData: ReorderableEntry<T>,
  reorderEntryFunc: CallableFunction,
  reorderEnabled: boolean,
  onAction: (entryReference: ReorderableEntry<T>) => void
}

function ReorderableItem<T>(props: ListEntryProps<T>) {
  let listEntries = props.listData;

  function onReorder(e: Event): void {
    if (!props.reorderEnabled) return;

    let event = e as CustomEvent;
    let currentIdx = listEntries.findIndex((entryData: ReorderableEntry<T>) => entryData === props.entryData);
    let currentIdxValue = listEntries[currentIdx];
    if (currentIdx < 0) return;

    let targetPosition: number = -1;
    if (event.detail.button == GamepadButton.DIR_DOWN) {
      targetPosition = currentIdxValue.position+1;
    } else if (event.detail.button == GamepadButton.DIR_UP) {
      targetPosition = currentIdxValue.position-1;
    } 

    // #FIXME# If you want to add more conditionals here
    if (targetPosition >= listEntries.length || targetPosition < 0) return; // Return if invalid position

    let otherToUpdate = listEntries.find((entryData: ReorderableEntry<T>) => entryData.position === targetPosition);
    if (!otherToUpdate) return; // couldn't find next

    let currentPosition = currentIdxValue.position;

    currentIdxValue.position = otherToUpdate.position;
    otherToUpdate.position = currentPosition;

    props.reorderEntryFunc([...listEntries].sort((a:ReorderableEntry<T>, b:ReorderableEntry<T>) => a.position - b.position));
  }

  const baseCssProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  };

  return(
    // @ts-ignore
    <Field label={props.entryData.label} style={props.reorderEnabled ? {...baseCssProps, background: "#678BA670"} : {...baseCssProps}}>
      <Focusable style={{ display: "flex", width: "100%", position: "relative" }} onButtonDown={onReorder}>
        <NotificationBadge show={!!props.entryData.alert} />
        <DialogButton style={{ minWidth: "30px", maxWidth: "60px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => props.onAction(props.entryData)} onOKButton={() => props.onAction(props.entryData)}>
          <FaEllipsisH />
        </DialogButton>
      </Focusable>
    </Field>
  );
}