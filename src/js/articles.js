import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import NewsDetails from "./NewsDetails.mjs";

loadHeaderFooter()

const dataSource = new ExternalServices()
const articleId = getParam("id")
const newsDetail = new NewsDetails(articleId, dataSource)
newsDetail.init()
