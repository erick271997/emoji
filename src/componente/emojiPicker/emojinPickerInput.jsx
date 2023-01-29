import React, { useRef } from "react";
import EmojiPicker from "./emojiPicker";

const EmojinPickerInput=()=>{
    const refInput =useRef(null);
    
 return(
<div>
    <input ref={refInput}/>
    <EmojiPicker ref={refInput}/>
</div>
 )   
}

export default EmojinPickerInput;