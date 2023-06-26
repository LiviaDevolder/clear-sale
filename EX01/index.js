const contaVogais = async (str, callback) => {
  const numVogais = str.match(/[aeiou]/gi)?.length || 0
  callback(numVogais)
}

contaVogais("Clear Sale", (count) => {
  console.log(`A entrada possui ${count} vogais.`)
})
