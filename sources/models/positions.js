import {persons} from "models/persons";

export function getPositions(){
	return positions;
}

export function getPositionsData(){
	let data = [];
	return persons.waitData.then(() => {
		positions.map(pos => {
			if (pos.id !== "$empty"){
				let who = persons.find(pers => pers.position === pos.id);
				data.push({ position:pos.value, number:who.length, color:pos.color });
			}
		});
		return data;
	});
}

const positions = [
	{ id:"$empty", value:"-- Not selected --", $empty:true },
	{ id:"1", value:"Goalkeeper", color:"#8664C6" },
	{ id:"2", value:"Winger", color:"#1CA1C1" },
	{ id:"3", value:"Midfielder", color:"#F8643F" },
	{ id:"4", value:"Striker", color:"#8664C6" },
	{ id:"5", value:"Center Back", color:"#1CA1C1" }
];
