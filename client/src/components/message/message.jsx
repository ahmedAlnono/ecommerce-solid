const Message = (props) => {
  const { msg, handleClick } = props;
  return (
    <div class={`flex flex-row
    justify-between items-center bg-yellow-400 h-fit
    fixed bottom-20 left-[50%] translate-x-[-50%] transition-all`}>
      <h1 class="p-1 mr-3 text-sky-950">{msg}</h1>
      <button class="p-2" onClick={handleClick}>
        x
      </button>
    </div>
  );
};

export default Message;
