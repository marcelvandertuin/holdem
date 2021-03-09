let deck = [];
let house = [];
let newWinner = false;
let players = [	
	{'player': 0, 'amount': 10000, 'check':false, 'betSum':0, 'total': '', 'holdem': '', 'details': '', 'blind':'SB', 'card1': '', 'card2': '', 'name': 'Dai'},
	{'player': 1, 'amount': 10000, 'check':false, 'betSum':0, 'total': '', 'holdem': '', 'details': '', 'blind':'BB', 'card1': '', 'card2': '', 'name': 'John'}
	];

const preFlop = () => {
	newWinner = false;
	house = [];
	clearTable();
	initDeck();
	setBlinds();
	outputBlinds();	
	if(players[1].blind == 'BB'){
		outputPlayerControlsMobile();
		outputPlayerControlsDesktop();
	}else{
		setLoader();
		setTimeout(getDataForDaiStager, 1000);
	}	
}

const initDeck = () => {
	deck = [];
	let suits = ['♣b', '♦r', '♥r', '♠b'];
	let ranks = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	for (let suit in suits){
		for (let rank in ranks){
			deck.push(`${ranks[rank]} ${suits[suit]}`);
		}
	}
	shuffleDeck();
}

const shuffleDeck = () => {
	let randomNumber, temporaryIndex;
	let i = deck.length;
	while(i-- > 0){
		randomNumber = Math.floor(Math.random() * (i + 1));
		temporaryIndex = deck[randomNumber];
		deck[randomNumber] = deck[i];
		deck[i] = temporaryIndex;
	}
	dealCards();	
}

const dealCards = () => {
	for(let i = 0; i < players.length; i++){
		if(players[i].blind == 'SB'){			
			let cards = [];
			let hand = [];
			players[i].card1 = deck[0];
			players[i].card2 = deck[2];
			cards.push(deck[0], deck[2], deck[5], deck[6], deck[7], deck[9], deck[11]);
			let cardsObj = convertCardToObject(cards);
			cardsObj.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? 1 : -1)
			players[i].total = cardsObj;
			hand.push(deck[0], deck[2]);
			displayCard(players[i].player, hand);
		}else if(players[i].blind == 'BB'){
			let cards = [];
			let hand = [];
			players[i].card1 = deck[1];
			players[i].card2 = deck[3];
			cards.push(deck[1], deck[3], deck[5], deck[6], deck[7], deck[9], deck[11]);
			let cardsObj = convertCardToObject(cards);
			cardsObj.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? 1 : -1)
			players[i].total = cardsObj;
			hand.push(deck[1], deck[3]);
			displayCard(players[i].player, hand);
		}
	}
	house.push(deck[5], deck[6], deck[7], deck[9], deck[11]);
}

const flop = () => {
	first = [];
	clearInfo();
	first.push(house[0], house[1], house[2]);
	for(let i = 0; i < first.length; i++){		
		let result = first[i].split(' ');
		let card = makeNode('section', [['class', 'card']]);
		let cardRank = makeNode('section', [['class', `cardRank cardColor_${result[1].substring(1, 2)}`]], convertCards(result[0]));
		let cardSuit = makeNode('section', [['class', `cardSuit cardColor_${result[1].substring(1, 2)}`]]);		
		cardSuit.innerHTML = setSuit(result[1].substring(0, 1));		
		card.appendChild(cardRank);
		card.appendChild(cardSuit);
		document.querySelector('section#board').appendChild(card);		
	}
}

const turn = () => {
	clearInfo();
	let result = house[3].split(' ');
	let card = makeNode('section', [['class', 'card']]);
	let cardRank = makeNode('section', [['class', `cardRank cardColor_${result[1].substring(1, 2)}`]], convertCards(result[0]));
	let cardSuit = makeNode('section', [['class', `cardSuit cardColor_${result[1].substring(1, 2)}`]]);	
	cardSuit.innerHTML = setSuit(result[1].substring(0, 1));	
	card.appendChild(cardRank);
	card.appendChild(cardSuit);
	document.querySelector('section#board').appendChild(card);	
}

const river = () => {
	clearInfo();
	let result = house[4].split(' ');
	let card = makeNode('section', [['class', 'card']]);
	let cardRank = makeNode('section', [['class', `cardRank cardColor_${result[1].substring(1, 2)}`]], convertCards(result[0]));
	let cardSuit = makeNode('section', [['class', `cardSuit cardColor_${result[1].substring(1, 2)}`]]);	
	cardSuit.innerHTML = setSuit(result[1].substring(0, 1));	
	card.appendChild(cardRank);
	card.appendChild(cardSuit);
	document.querySelector('section#board').appendChild(card);
}