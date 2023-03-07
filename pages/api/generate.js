export default async function handler(req, res) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
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

    const receivedBody = req.body;

    //console.log("received body")
    //console.log(receivedBody)

    const apiBody = {
      model: 'gpt-3.5-turbo',
      messages: [
          {role: 'system', content: promptTextSystem},
          {role: 'user', content: receivedBody['promptText']}],
    };

    //console.log("sending this")
    console.log("sending")

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(apiBody)
    });

    //console.log(response)

    console.log('here')

    if (response.ok) {
      try {
        const data = await response.json();
        res.status(response.status).json(data);
      }
      catch (error) {
        console.log("Error parsing response")
        console.log(error)
        res.status(200).json({'choices': [{'index': 0, 'message': {'content': 'Error'}}]})
      }
    } else {
      const error = new Error(`HTTP Error ${response.status} - ${response.statusText}`);
      console.log("Response not ok")
      console.log(error)
      // data.choices[0].message.content
      res.status(200).json({'choices': [{'index': 0, 'message': {'content': 'Error'}}]})
    }

    console.log("finished")

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // await sleep(1000);
    // const data = {'choices': [
    //     {'index': 0,
    //     'message': {
    //         'content': 'Title: The Parking Garage\n[Ext: Parking Garage]\nThe episode starts with Jerry, George, Elaine, and Kramer walking through a multi-level parking garage, trying to find their car. They cannot seem to locate it, and as they walk around, they realize that they are lost.\nJerry: We lost the car. This is a nightmare."\nElaine: "Typical. Every time we come to this mall, we have to go through this."\n[End Credits]'
    //     }}]}
    // res.status(200).json(data);
  }
  