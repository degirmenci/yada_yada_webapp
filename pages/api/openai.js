export default async function handler(req, res) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const apiBody = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(apiBody)
    });

    const data = await response.json();
    res.status(response.status).json(data);

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
  