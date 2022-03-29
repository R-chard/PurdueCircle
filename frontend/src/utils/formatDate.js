const formatDate = (databaseDate) => {
    const date = (new Date(databaseDate)).toString()
    const formattedDate = (date.split(" ").slice(0,5)).join(" ")
    return formattedDate
}

export default formatDate