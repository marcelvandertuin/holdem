const outputPlayerControlsMobile = () => {
	player = 1;
	let table 		= document.querySelector('section#void_1');
	let controls	= makeNode('section', [['class', 'controlsMobile']]);	
	let ul			= makeNode('ul', []);
	let liFold		= makeNode('li', []);
	let liAllIn		= makeNode('li', []);
	let liCheck		= makeNode('li', []);
	let liUp 		= makeNode('li', []);
	let liDown		= makeNode('li', []);
	let liBet		= makeNode('li', []);
	let fold		= makeNode('a', [['onclick', `goFold(${player});`]], 'F');
	let allIn		= makeNode('a', [['onclick', `goAllIn(${player});`]],'A');
	let checkCall	= makeNode('a', [['onclick', `goCall(${player});`]],'C');
	let betDown		= makeNode('a', [['onclick', `betDown(${player});`]],'-');
	let betUp		= makeNode('a', [['onclick', `betUp(${player});`]],'+');
	let bet 		= makeNode('a', [['onclick', `goBet(${player});`]],'B');
	table.appendChild(controls);
	controls.appendChild(ul);
	liFold.appendChild(fold);
	liAllIn.appendChild(allIn);
	liCheck.appendChild(checkCall);
	liUp.appendChild(betUp);
	liDown.appendChild(betDown);
	liBet.appendChild(bet);		
	ul.appendChild(liUp);
	ul.appendChild(liDown);
	ul.appendChild(liBet);	
	ul.appendChild(liCheck);
	ul.appendChild(liAllIn);
	ul.appendChild(liFold);	
}

const outputPlayerControlsDesktop = () => {
	player = 1;
	let table 		= document.querySelector('section#controls');
	let controls	= makeNode('section', [['class', 'controlsDesktop']]);	
	let ul			= makeNode('ul', []);
	let liFold		= makeNode('li', []);
	let liAllIn		= makeNode('li', []);
	let liCheck		= makeNode('li', []);
	let liUp 		= makeNode('li', []);
	let liDown		= makeNode('li', []);
	let liBet		= makeNode('li', []);
	let fold		= makeNode('a', [['onclick', `goFold(${player});`]], 'F');
	let allIn		= makeNode('a', [['onclick', `goAllIn(${player});`]],'A');
	let checkCall	= makeNode('a', [['onclick', `goCall(${player});`]],'C');
	let betDown		= makeNode('a', [['onclick', `betDown(${player});`]],'-');
	let betUp		= makeNode('a', [['onclick', `betUp(${player});`]],'+');
	let bet 		= makeNode('a', [['onclick', `goBet(${player});`]],'B');
	table.appendChild(controls);
	controls.appendChild(ul);
	liFold.appendChild(fold);
	liAllIn.appendChild(allIn);
	liCheck.appendChild(checkCall);
	liUp.appendChild(betUp);
	liDown.appendChild(betDown);
	liBet.appendChild(bet);		
	ul.appendChild(liUp);
	ul.appendChild(liDown);
	ul.appendChild(liBet);	
	ul.appendChild(liCheck);
	ul.appendChild(liAllIn);
	ul.appendChild(liFold);	
}

const setBlinds = () => {
	let pot = 0;
	for(let i = 0; i < players.length; i++){
		if(players[i].blind === 'SB'){
			players[i].amount -= 500;
			pot += 500;
		}else if(players[i].blind === 'BB'){
			if(players[i].amount < 1000){
				players[i].amount -= 500;
				pot += 500;
			}else{
				players[i].amount -= 1000;	
				pot += 1000;				
			}		
		}
		document.querySelector(`section#amount_${players[i].player}`).innerHTML = players[i].amount;
	}
	document.querySelector('section#pot').innerHTML = pot;
}

const outputBlinds = () => {
	let blindDai = '';
	let blindJohn = '';
	let btn = '';
	for (let i = 0; i < players.length; i++){	
		if(players[i].blind === 'SB' && players[i].player == 0){
			blindDai = makeNode('section',[['class', 'blinds blindTop']], 'SB');
			btn = document.querySelector(`section#button_${players[i].player}`);
			btn.innerHTML = '';
			btn.appendChild(blindDai);
		}else if(players[i].blind === 'SB' && players[i].player == 1){
			blindJohn = makeNode('section',[['class', 'blinds blindBottom']], 'SB');
			btn = document.querySelector(`section#button_${players[i].player}`);
			btn.innerHTML = '';		
			btn.appendChild(blindJohn);
		}else if(players[i].blind === 'BB' && players[i].player == 0){
			blindDai = makeNode('section',[['class', 'blinds blindTop']], 'BB');
			btn = document.querySelector(`section#button_${players[i].player}`);
			btn.innerHTML = '';
			btn.appendChild(blindDai);
		}else if(players[i].blind === 'BB' && players[i].player == 1){
			blindJohn = makeNode('section',[['class', 'blinds blindBottom']], 'BB');
			btn = document.querySelector(`section#button_${players[i].player}`);
			btn.innerHTML = '';		
			btn.appendChild(blindJohn);	
		}
	}
}

const outputDealer = (player, blind) => {
	let btn = '';
	let dealer = '';	
	if(blind === 'SB' && player == 0){
			dealer = makeNode('section',[['class', 'dealer dealerTop']], 'D');
			btn = document.querySelector(`section#button_${player}`);
			btn.appendChild(dealer);
		}else if(blind === 'SB' && player == 1){
			dealer = makeNode('section',[['class', 'dealer dealerBottom']], 'D');
			btn = document.querySelector(`section#button_${player}`);
			btn.appendChild(dealer);
		}
}

const convertCards = (card) => {
	let rank = '';
	if(card == 11){
		rank = 'J';
	}else if(card == 12){
		rank = 'Q';		
	}else if(card == 13){
		rank = 'K';		
	}else if(card == 14){
		rank = 'A';		
	}else{
		rank = card;
	}
	return rank;
}

const convertCardToObject = (cards) => {
	let obj = [];
	for(let i = 0; i < cards.length; i++){
		let result = cards[i].split(' ');
		let convertedCard = {'rank': result[0], 'suit': result[1]}
		obj.push(convertedCard);
	}
	return obj;
}

const displayCard = (player, hand) => {
	for(let i = 0; i < hand.length; i++){
		let result = hand[i].split(' ');
		let card = makeNode('section', [['class', 'card']]);	
		let cardRank = makeNode('section', [['class', `cardRank cardColor_${result[1].substring(1, 2)}`]], convertCards(result[0]));
		let cardSuit = makeNode('section', [['class', `cardSuit cardColor_${result[1].substring(1, 2)}`]], result[1].substring(0, 1));
		card.appendChild(cardRank);
		card.appendChild(cardSuit);	
		document.querySelector(`section#hand_${player}`).appendChild(card);
	}
	hideCardsDai();
}

const hideCardsDai = () => {
	let hand = document.querySelector('#hand_0');
	hand.getElementsByClassName("cardRank")[0].style.visibility = "hidden";
	hand.getElementsByClassName("cardRank")[1].style.visibility = "hidden";
	hand.getElementsByClassName("cardSuit")[0].style.visibility = "hidden";
	hand.getElementsByClassName("cardSuit")[1].style.visibility = "hidden";
}

const showCardsDai = () => {
	let hand = document.querySelector('#hand_0');
	hand.getElementsByClassName("cardRank")[0].style.visibility = "visible";
	hand.getElementsByClassName("cardRank")[1].style.visibility = "visible";
	hand.getElementsByClassName("cardSuit")[0].style.visibility = "visible";
	hand.getElementsByClassName("cardSuit")[1].style.visibility = "visible";
}

const setLoader = () => {
	let table = document.querySelector('section#potInfo');
	let loader = makeNode('section', [['id', 'loader']]);
	let dotOne = makeNode('span', [['class', 'dots'], ['id', 'dotOne']]);
	let dotTwo = makeNode('span', [['class', 'dots'], ['id', 'dotTwo']]);
	let dotThree = makeNode('span', [['class', 'dots'], ['id', 'dotThree']]);
	loader.appendChild(dotOne);
	loader.appendChild(dotTwo);
	loader.appendChild(dotThree);
	table.appendChild(loader);
}

const clearTable = () => {
	document.querySelector('section#board').innerHTML = '';
	document.querySelector('section#potInfo').innerHTML = '';
	document.querySelector('section#controls').innerHTML = '';
	document.querySelector('section#void_1').innerHTML = '';
	for(let i = 0; i < players.length; i++){
		document.querySelector(`section#info_${players[i].player}`).innerHTML = '';		
		document.querySelector(`section#hand_${players[i].player}`).innerHTML = '';
	}	
}

const clearInfo = () => {
	for(let i = 0; i < players.length; i++){
		document.querySelector(`section#info_${players[i].player}`).innerHTML = '';
	}	
}

const makeNode = (type, attr=[], text='') => {
	let node = document.createElement(type);
	for(let i = 0; i < attr.length; i++){
		node.setAttribute(attr[i][0], attr[i][1]);
	}
	node.innerText = text;
	return node;
}