let input = document.querySelector('input');

input.addEventListener('change', () => {
    let files = input.files;
 
    if(files.length == 0) return;
 
    const file = files[0];
 
    let reader = new FileReader();
 
    reader.onload = (e) => {
        const file = e.target.result;
		processCSV(file);
    };
 
    reader.onerror = (e) => alert(e.target.error.name);
 
    reader.readAsText(file); 
    
});
function processCSV(file){
	let lines = file.split(/\r\n|\n/);
	let [ elements, relations ] = linesToData(lines)
	let root;
	for(let i in elements){
		let element = elements[i]
		if(element.type === 'Objeto'){
			root = element;
			break;
		}
	}
	console.log(traverse(root,relations,[]))
}

function linesToData(lines){
	let i;
	let elements = {};
	let relations = {};
	for (i = 2; i < lines.length; i++) {
		line = lines[i].split(",");
		if(line[1] !== "Línea"){
			node =createNode(line);
			elements[i] = node;
			relations[i] = []
		}else{
			break;
		}
	} 
	for(i = i; i < lines.length;i++){
		line = lines[i].split(",");
		let a = line[6]
		let b = line[7]
		relations[a].push(elements[b])
	}
	return [elements, relations]
}

function createNode(line){
	node = {number:line[0],type:line[1],content:line[10]};
	return node;
}

function traverse(node, relations, array){
	let index = node.number;
	if(relations[index].length == 0){
		return node.content;
	}
	let sonsContent = null
	for(let indexSon in relations[index]){
		let son = (relations[index])[indexSon]
		let nombre = node.content;
		if(son.type === "Datos (E/S)"){
			let grandSon = (relations[son.number])[0]
			array.push(nombre + " es "+traverse(grandSon, relations,[]));
		}else if(son.type === "Terminador"){
			sonsContent = []
			for(let indexGrandSon in relations[son.number]){
				let grandSon = (relations[son.number])[indexGrandSon]
				sonsContent.push(traverse(grandSon,relations,[]))
			}
		}
	}
	if(sonsContent != null){
		array.push(sonsContent)
	}
	return array
}