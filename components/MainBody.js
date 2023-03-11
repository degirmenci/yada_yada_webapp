import { useState, useEffect } from "react";
import ScriptWidget from "./ScriptWidget";
import { v4 as uuidv4 } from 'uuid';

function MainBody() {
    const [isGenerated, setIsGenerated] = useState(false);
    const [inputText, setInputText] = useState("");
    const [lastInputText, setLastInputText] = useState("");
    const [generatedScript, setGeneratedScript] = useState("");
    const [userDefinedPrompt, setUserDefinedPrompt] = useState("");
    const [generationInProgress, setGenerationInProgress] = useState(false);

    const sessionId = uuidv4();

    useEffect(() => {
        if (generatedScript !== "") {
            setGenerationInProgress(false);
            setIsGenerated(true);
        }

        if (inputText !== "") {
            setUserDefinedPrompt('Title: ' + inputText);
        }
    }, [generatedScript, inputText])

    const handleEnterKey = (e) => {
        if (e.key === 'Enter' && inputText) {
            handleUserInput();
        }
    }

    const handleUserInput = () => {
        if (inputText === lastInputText) {
            //console.log("Input text is the same as last input text, not generating script again.")
            return
        }
        setGeneratedScript("");
        setGenerationInProgress(true);
        //console.log(inputText)
        generateScript(inputText);
    }

    const generateScript = (inputText) => {
        getCompletion().then((data) => {
            //console.log(data);
            setGeneratedScript(data.choices[0].message.content)
        });
    }

    async function getCompletion() {
        const apiBody = {
            promptText: userDefinedPrompt,
        }

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiBody)
        });
        const data = await response.json();
        return data;
      }      
    

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold text-gray-100 dark:text-gray-200">The Yada Yada Generator</h1>
                <p className="p-2">You provide a title, yada yada, we generate an episode of your favorite TV show about nothing.</p>
            </div>

            {/*<div className="p-6 flex md:flexitems-center md:justify-center md:items-center"> */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-4">
                <input value={inputText} onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleEnterKey}
                type="text" placeholder="The Parking Lot"
                className="rounded-full text-center	w-11/12 md:w-7/12 max-w-lg px-48 py-2 border-gray-200 bg-gray-200 text-gray-900"
                />
                <button
                    className="bg-[#fbd71f] hover:bg-[#E1C11B] text-[#e50b26] font-bold py-2 px-8 mx-6 rounded-full h-10 w-50"
                    onClick={() => handleUserInput()}>
                    {generationInProgress && (
                        <div className="spinner"/>
                    )}
                    {!generationInProgress && 'Generate'}
                </button>
            </div>

            <div className="mt-4">
                {isGenerated && <ScriptWidget sessionId={sessionId} script={generatedScript} userPrompt={userDefinedPrompt} />}
            </div>

        </div>
    )
}

export default MainBody;