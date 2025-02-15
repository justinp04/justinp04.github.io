import { useEffect, useState } from "react";
import { title } from "@/components/primitives";

export default function Typewriter(
    texts: String[],
    multiple: boolean,
    loop: boolean
) {
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [index, setIndex] = useState(0);
    const [backspace, setBackspace] = useState(false);

    useEffect(() => {
        if (charIndex < texts[index].length) {
            setDisplayedText(texts[index].charAt(charIndex));
            setCharIndex(charIndex + 1);
        }
    });

    return (
        <div>
            <span className={title()}>{displayedText}</span>
        </div>
    );
}
