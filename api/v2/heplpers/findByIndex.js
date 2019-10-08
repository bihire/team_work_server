export default (model, valueId) => {
    return model.findIndex(obj => obj.id === valueId)
}