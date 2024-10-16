"use client"
import useStore from "./useStore"; // Remplace GlobalContext par useStore

export default function Labels() {
  const { labels, setLabels } = useStore();

  function updateLabel(updatedLabel) {
    setLabels(
      labels.map((lbl) =>
        lbl.label === updatedLabel.label ? updatedLabel : lbl
      )
    );
  }

  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: account, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: account, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
      </>
  );
}
