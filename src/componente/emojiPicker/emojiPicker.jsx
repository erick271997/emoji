import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";
import EmojinSearch from "./emojinSearch";

export function EmojiPicker(props, inputRef) {
  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState(...emojiList);

  const containerRef= useRef(null)

  useEffect(()=>{
    window.addEventListener('click',(e) =>{
        if (!containerRef.current.contains(e.target)) {
            setIsOpen(false);
            setEmojis(emojiList);
        }
    })
  }, []);
  

//   2:06:54 / 4:21:29

//   •
//   04. Selector de emojis con useRef


  function handleClickOpen() {
    setIsOpen(!isOpen);
  }

  function handleSearch(e) {
    const q = e.target.value.toLocaleLowerCase();
    if (!!q) {
      const search = emojiList.filter((emojis) => {
        return (
          emojis.name.toLocaleLowerCase().includes(q) ||
          emojis.keywords.toLocaleLowerCase().includes(q)
        );
      });

      setEmojis(search);
    }else{
        setEmojis(emojiList);
    }
  }

 

//   function EmojiPickerContainer() {
//     return (
//     //   <div>
//     //     <EmojinSearch onSearch={handleSearch} />
//     //     <div>
//     //       {emojiList.map((emoji) => (
//     //         <div key={emoji.symbol}>{emoji.symbol}</div>
//     //       ))}
//     //     </div>
// //     //   </div>
// //     );
//   }

function handleOnclickEmoji(emoji){
    const cursorPos= inputRef.current.selectionStart;
    const text= inputRef.current.value;
    const prev= text.slice(0, cursorPos);
    const next = text.slice(cursorPos);

    inputRef.current.value= prev+emoji.symbol+next;
    inputRef.current.selectionStart=cursorPos+emoji.symbol.length;
    inputRef.current.selectioEnd= cursorPos+emoji.symbol.length;
    inputRef.current.focus();

}
  return (
    <div ref={containerRef}>
      <button onClick={handleClickOpen}>🤣</button>
      {isOpen ? (
      <div >
        <EmojinSearch onSearch={handleSearch} />
        <emojiList>
          {emojis.map((emoji) => (
            <EmojiButton 
            key={emoji.symbol}
            emoji = {emoji}
             onClick={handleOnclickEmoji}
             />
          ))}
        </emojiList>
      </div> 
       ):(   ""
      )}
    </div>
  );
}

export default forwardRef(EmojiPicker);
