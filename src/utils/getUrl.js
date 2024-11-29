function getUrl(name){
    return new URL(`../assets/books/${name}`, import.meta.url)
}

export { getUrl };