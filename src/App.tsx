import { useState } from "react";
import { TimeFeeCalculator, DepositHistory } from "src/components";
import "./index.css";

enum MenuOption {
  Home,
  TimeFeeCalculator,
  DepositHistory,
}

function Nav({ children, action, isSelected }: any) {
  return (
    <nav
      onClick={action}
      aria-selected={isSelected}
      className="py-2 px-4 rounded bg-slate-300 cursor-pointer font-medium hover:bg-slate-400 active:bg-slate-200 aria-selected:bg-sky-300"
    >
      {children}
    </nav>
  );
}

export function App() {
  const [selectedItem, setSelectedItem] = useState<MenuOption>(MenuOption.Home);

  const renderItem = (() => {
    switch (selectedItem) {
      case MenuOption.Home:
        return (
          <div>
            <h1>Hello Wolrd!</h1>
          </div>
        );

      case MenuOption.TimeFeeCalculator:
        return <TimeFeeCalculator />;

      case MenuOption.DepositHistory:
        return <DepositHistory />;

      default:
        break;
    }
  })();

  return (
    <div className="flex bg-slate-200 h-screen gap-4 p-4">
      <menu className="flex flex-col p-4 rounded-lg shadow-md bg-white gap-4">
        <Nav
          action={() => setSelectedItem(MenuOption.Home)}
          isSelected={MenuOption.Home === selectedItem}
        >
          Home
        </Nav>

        <Nav
          action={() => setSelectedItem(MenuOption.TimeFeeCalculator)}
          isSelected={MenuOption.TimeFeeCalculator === selectedItem}
        >
          Fee Calculator
        </Nav>

        <Nav
          action={() => setSelectedItem(MenuOption.DepositHistory)}
          isSelected={MenuOption.DepositHistory === selectedItem}
        >
          Deposit History
        </Nav>
      </menu>

      <section className="flex h-fit shadow-lg p-5 rounded-xl bg-white">
        {renderItem}
      </section>
    </div>
  );
}
