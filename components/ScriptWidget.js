import { useState } from "react";
import { supabase } from './../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const ScriptWidget = ({ sessionId, script, userPrompt }) => {
    const [rating, setRating] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);
    const lines = script.split('\n');

    const handleRatingChange = async (value) => {
      //console.log(`User rated ${value} out of 5`);
      //console.log(`Session ID: ${sessionId}`);
      //console.log(`User prompt: ${userPrompt}`);
      setRating(value);

      if (isUploaded) {
        //console.log("Already uploaded, not uploading again.")
        return
      }

      const uniqueId = uuidv4();

      const { data, error } = await supabase
      .from('ratings_v2')
      .insert([
        {id: uniqueId, session_id: sessionId, rating: value, user_prompt: userPrompt,
          created_at: new Date().toISOString(), script: script}])

      setIsUploaded(true);
      //console.log(data)
      //console.log(error)
    };

    return (
      <div>
          <h1 className="flex justify-center items-center gap-4">Rate the script</h1>
          <div className="flex justify-center items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
              <button
              key={value}
              className={`${
                  rating >= value ? "text-yellow-500" : "text-gray-400"
              } text-4xl`}
              onClick={() => handleRatingChange(value)}
              >
              ★
              </button>
          ))}
          </div>
          <div className="p-6 justify-center items-center gap-4">
              {lines.map((line, index) => {
                  // Match the character name using a regular expression
                  return (
                  <p key={index} className="text-gray-100 dark:text-gray-100">
                      {line}
                  </p>
                  );
              })}
          </div>
      </div>
    );
};


export default ScriptWidget;
