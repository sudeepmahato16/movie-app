const Link = ({ mouseOverEvent, mouseOutEvent, src }: any) => {
  return <span onMouseOut={mouseOutEvent} onMouseOver={mouseOverEvent}></span>;
};

export default Link;
