import LinkedList from "./structure/link"

const linkList = new LinkedList()
linkList.push(0) 
linkList.push(1)
linkList.push(2)
linkList.push(3)
console.log(linkList.toString())
linkList.removeAt(1)
console.log(linkList.toString())