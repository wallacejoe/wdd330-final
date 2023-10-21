const apiKey = import.meta.env.VITE_NEWSDATA_KEY

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  //constructor (category) {}
  async getData(){
    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us`)
      const result = await convertToJson(response)
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
    }
  }
  /*async getData() {
    const url = "https://google-news13.p.rapidapi.com/latest?lr=en-US";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${apiKey}`,
        "X-RapidAPI-Host": `${apiLink}`
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await convertToJson(response);
      console.log(result);
      return result
    } catch (error) {
      console.error(error);
    }*/
}
