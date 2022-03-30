const formatDate = (databaseDate) => {
    const date = (new Date(databaseDate))
    let formattedDate = date.toLocaleString('en-us', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    // formattedDate = (date.toString().split(" ").slice(0,5)).join(" ")
    // console.log("date2:", formattedDate)
    return formattedDate
}

export default formatDate