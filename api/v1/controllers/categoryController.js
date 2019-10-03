import arraySort from 'array-sort'
import articles from "../models/article"
import categories from "../models/category"

export default class CategoryController {
    /**
     * @description This helps a new Employee to fetch articles by category
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async fetch_by_category(req, res) {
        const { categoryName } = req.params
        const g = categories.filter(obj => obj.category === categoryName)
        const data = []
        g.forEach(obj => {
            const found = articles.find(x => x.id == obj.articleId)
            data.push({ ...found })
        })
        res.status(200).json({
            status: 200,
            message: 'successfully found',
            data: arraySort(data, 'updatedOn').reverse()
        })
    }
}
