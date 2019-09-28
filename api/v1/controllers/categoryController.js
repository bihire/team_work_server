import arraySort from 'array-sort'
import articles from "../models/article"
import categories from "../models/category"

export default {
    async category(req, res) {
        const { bro } = req.params
        const g = categories.filter(obj => obj.category === bro)
        const data = []
        g.forEach(obj => {
            const found = articles.find(x => x.id == obj.articleId)
            data.push({ ...found })
        })
        res.status(200).json({
            status: 200,
            message: 'found the following articles successfully',
            data: arraySort(data, 'updatedOn').reverse()
        })
    },
}