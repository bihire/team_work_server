export default (model, valueId) => {
    return model.filter(obj => obj.articleId == valueId)
}