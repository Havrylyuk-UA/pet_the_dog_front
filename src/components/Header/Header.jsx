const Header = ({ count, card }) => {
  return (
    <>
      Total: {Math.round(count)} Card: {card}
    </>
  );
};

export default Header;
