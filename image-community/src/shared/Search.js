import React, { useCallback, useState } from "react";
import _ from "lodash";

const Search = () => {
    const [text, SetText] = useState("");

    const debounce = _.debounce((e) => {
        console.log("debounce :::", e.target.value);
    }, 1000)

    const throttle = _.throttle((e) => { 
        console.log("throttle :::", e.target.value);
    }, 1000)


    const KeyPress = useCallback(throttle, []);

    const onChange = (e) => {
        SetText(e.target.value);
        KeyPress(e);
    }

    return (
        <div>
            <input type="text" onChange={onChange} value={text}/>
        </div>
    )
}

export default Search;
