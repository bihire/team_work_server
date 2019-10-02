import arraySort from 'array-sort'
import articles from "../models/article"
import categories from "../models/category"

class categoryClass {
    async fetch_by_category(req, res) {
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

export default new categoryClass