import { loadHeaderFooter } from "./utils.mjs";
import FavoriteDetails from "./FavoriteDetails.mjs";


const element = document.querySelector("main")
const news = new FavoriteDetails(element)

loadHeaderFooter()

news.init()