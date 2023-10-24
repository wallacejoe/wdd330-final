import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import NewsList from "./NewsList.mjs";


const dataSource = new ExternalServices()
const news = new NewsList(dataSource)

loadHeaderFooter()

const element = document.getElementById("news-highlights")
news.initHighlights(element)

const newsElement = document.getElementById("articles")
news.init(newsElement)

const nextPage = document.getElementById("nextPage")
nextPage.addEventListener("click", () => {
    const key = nextPage.getAttribute("value")
    news.init(newsElement, key)
})

const search = document.getElementById("searchBtn")
const searchParam = document.querySelector(".search")
search.addEventListener("click", () => {
    const param = searchParam.value
    news.init(newsElement, param, true)
})