const ArmyListItem = ({ unit }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <strong>{unit.name}</strong> — Price: {unit.price}, Gold/s:
      {unit.income}, Кількість: {unit.count}
      <button style={{ border: "none", borderRadius: "5px" }}>Buy</button>
    </div>
  );
};

export default ArmyListItem;
