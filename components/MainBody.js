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

    const promptTextSystem = `You are a sitcom script writer whose goal is to write scripts people love. Following the show and character descriptions and a title, write a script.
    Sitcom description:
    The show revolves around the everyday lives of four main characters, Jerry Seinfeld, George Costanza, Elaine Benes, and Cosmo Kramer, as they navigate their relationships, careers, and personal quirks in New York City.
    The show often takes mundane situations and turns them into comedic gold, such as waiting for a table at a restaurant, going to a baseball game, or getting lost in a parking garage. The humor is often dry, witty, and observational, and the characters frequently get themselves into awkward and hilarious situations.
    Each episode typically has multiple storylines that intersect in unexpected ways, and the show is known for its memorable catchphrases, recurring characters, and meta humor. Throughout the show's nine seasons, the characters experience a wide range of ups and downs, from breakups and job losses to failed business ventures and family drama.
    Characters:
    - Jerry Seinfeld: Jerry is a comedian who often uses his everyday experiences as material for his stand-up routines. He is depicted as witty, neurotic, and a bit self-centered.
    - George Costanza: He is Jerry's best friend. George is depicted as insecure, dishonest, and frequently unemployed. He is often involved in schemes and lies to get what he wants, but they usually backfire. He is usually cheap with money, has a love hate relationship with his parents Estelle and Frank Costanza.
    - Elaine Benes:  She is Jerry's ex-girlfriend. Elaine is depicted as intelligent, confident, and outspoken. She works as an editor and is known for her blunt, sarcastic sense of humor.
    - Cosmo Kramer: He is Jerry's eccentric neighbor. Kramer is known for his wild hair, explosive entrances, and bizarre ideas. He often helps Jerry and his friends with their problems but is also known for causing chaos and mischief. He is quite unpredictable and always has the craziest ideas for businesses.
    Guidelines for the script format:
    - Annotate locations, gestures of the characters with brackets (example: [Int: Jerry’s apartment] [Int: Monk’s coffee shop]
    `

    const sessionId = uuidv4();

    useEffect(() => {
        if (generatedScript !== "") {
            setGenerationInProgress(false);
            setIsGenerated(true);
        }

        if (inputText !== "") {
            setUserDefinedPrompt('Title: ' + inputText);
        }
    })

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
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: promptTextSystem},
                {role: 'user', content: userDefinedPrompt}],
        };

        const response = await fetch('/api/openai', {
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
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold text-gray-100 dark:text-gray-200">The Yada Yada Generator</h1>
                <p className="p-2">You provide a title, yada yada, we generate an episode of your favorite TV show about nothing.</p>
            </div>

            <div className="p-6 flex flex-col items-center md:flex-row md:justify-center md:items-center">
                <input value={inputText} onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleEnterKey}
                type="text" placeholder="The Parking Lot"
                className="rounded-full text-center	w-70 md:w-50 px-48 py-2 border-gray-300"
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

            <div>
                {isGenerated && <ScriptWidget sessionId={sessionId} script={generatedScript} userPrompt={userDefinedPrompt} />}
            </div>

        </div>
    )
}

export default MainBody;