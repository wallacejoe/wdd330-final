import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import NewsList from "./NewsList.mjs";

loadHeaderFooter()

const dataSource = new ExternalServices()
const element = document.getElementById("news-highlights")
const newsHighlights = new NewsList(dataSource, element)
newsHighlights.initHighlights()

const newsElement = document.getElementById("articles")
const news = new NewsList(dataSource, newsElement)
news.init()

const nextPage = document.getElementById("nextPage")
nextPage.addEventListener("click", () => {
    const key = nextPage.getAttribute("value")
    let data = new ExternalServices(key)
    const articles = new NewsList(data, newsElement)
    articles.init()
})