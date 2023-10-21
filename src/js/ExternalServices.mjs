const apiKey = import.meta.env.VITE_NEWSDATA_KEY

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor (pageKey) {
    this.pageKey = pageKey
  }
  async getData(){
    let nextPage = ""
    if (this.pageKey) {
      nextPage = `&page=${this.pageKey}`
    }
    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us${nextPage}`)
      const result = await convertToJson(response)
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
    }
  }
}
