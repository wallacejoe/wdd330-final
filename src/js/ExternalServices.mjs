const apiKey = import.meta.env.VITE_NEWSDATA_KEY

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  //constructor () {}
  async getData(param = "", search = false){
    try {
      let response
      if (param && !search) {
        response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us&page=${param}`)
      }
      else if (search) {
        response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us&qInTitle=${param}`)
      }
      else {
        response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us`)
      }
      const result = await convertToJson(response)
      return result
    } catch (error) {
      console.error(error)
    }
  }
  findArticleById(id, list){
    let article;
    list.forEach(element => {
      if (element.article_id == id) {
        article = element
      }
    });
    return article
    // scrapped due to api issues
    /*try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&page=${id}`)
      const result = await convertToJson(response)
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
    }*/
  }
}
