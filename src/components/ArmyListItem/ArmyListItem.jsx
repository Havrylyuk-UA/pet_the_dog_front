const ArmyListItem = ({ unit, buyItem }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <strong>{unit.name}</strong> — Price: {Math.floor(unit.price)}, Gold/s:
      {unit.income}, Кількість: {unit.count}
      <button
        style={{ border: "none", borderRadius: "5px" }}
        onClick={() => buyItem()}
      >
        Buy
      </button>
    </div>
  );
};

export default ArmyListItem;
