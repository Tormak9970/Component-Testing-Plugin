import {
  ButtonItem,
  definePlugin,
  gamepadDialogClasses,
  PanelSection,
  PanelSectionRow,
  quickAccessControlsClasses,
  Router,
  ServerAPI,
  SidebarNavigation,
  staticClasses,
} from "decky-frontend-lib";
import { Fragment, VFC } from "react";
import { ImStack } from "react-icons/im";

import { PyInterop } from "./PyInterop";
import { ReorderableListTester } from "./testing-window/ReorderableListTest";

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {

  return (
    <Fragment>
      <style>{`
        .scope {
          width: inherit;
          height: inherit;

          flex: 1 1 1px;
          scroll-padding: 48px 0px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-content: stretch;
        }
        .scope .${quickAccessControlsClasses.PanelSection} {
          padding: 0px;
        }

        .scope .${gamepadDialogClasses.FieldChildren} {
          margin: 0px 16px;
        }
        
        .scope .${gamepadDialogClasses.FieldLabel} {
          margin-left: 16px;
        }
      `}</style>
      <div className="scope">
        <PanelSection>
          <PanelSectionRow>
            <ButtonItem layout="below" onClick={() => { Router.CloseSideMenus(); Router.Navigate("/component-tester"); }} >
              Open Tester
            </ButtonItem>
          </PanelSectionRow>
        </PanelSection>
      </div>
    </Fragment>
  );
};

const TestingWindowRouter: VFC = () => {
  return (
    <SidebarNavigation
      title="Component Tester"
      showTitle
      pages={[
        {
          title: "Reorderable List",
          content: <ReorderableListTester />,
          route: "/component-tester/reorderable-list-tester",
        }
      ]}
    />
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  PyInterop.setServer(serverApi);
  serverApi.routerHook.addRoute("/component-tester", () => (
    <TestingWindowRouter />
  ));

  return {
    title: <div className={staticClasses.Title}>Component Tester</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <ImStack />,
    onDismount() {
      serverApi.routerHook.removeRoute("/component-tester");
    },
  };
});
