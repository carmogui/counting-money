import { useState } from "react";
import { TimeFeeCalculator } from "./components/time-fee-calculator";
import "./index.css";

enum MenuOption {
  Home,
  TimeFeeCalculator,
}

function Nav({ children, action, isSelected }: any) {
  return (
    <nav
      onClick={action}
      aria-selected={isSelected}
      className="p-2 rounded bg-slate-300 cursor-pointer font-medium w-60 hover:bg-slate-400 active:bg-slate-200 aria-selected:bg-sky-300"
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

      default:
        break;
    }
  })();

  return (
    <div className="flex bg-slate-200 h-screen">
      <menu className="flex flex-col p-4 m-4 rounded-lg shadow-md bg-white gap-4">
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
      </menu>

      <section className="m-4">{renderItem}</section>
    </div>
  );
}
