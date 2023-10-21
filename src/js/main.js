import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import NewsList from "./NewsList.mjs";

loadHeaderFooter()

const test = new ExternalServices()
const element = document.getElementById("news-highlights")
const news = new NewsList(test, element)

news.initHighlights()