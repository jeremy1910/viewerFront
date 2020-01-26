export function handelExtentionPH(variable) {
	const transformedExtension = []
	for (let i = 0 ; i < variable.extension.length; i++){
		const start = Number(variable.extension[i][0])
		const end = variable.extension[i+1] !== undefined ? Number(variable.extension[i+1][0]) : 10080
		const length = end - start
		const type = Number(variable.extension[i][1])
		transformedExtension.push({start: start, end: end, length: length,type: type})
	}
	return {id: variable.id, nom: variable.Nom, description: variable.description, extension: transformedExtension }

}