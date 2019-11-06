let evaluationCount = 0;

const displayShowdown = (num, details, player) => {	
	players[player].holdem = num;
	players[player].details = details;	
	if(evaluationCount == (players.length - 1)){
		evaluateHands();
	}else{
		evaluationCount += 1;
	}
	document.querySelector(`section#info_${player}`).innerHTML = holdemHand(num);
}

const evaluateHands = () => {	
	if(players[0].holdem > players[1].holdem){
		displayEvaluateHand(0);		
	}else if(players[0].holdem < players[1].holdem){
		displayEvaluateHand(1);		
	}else if(players[0].holdem == players[1].holdem){
		let holdem = players[0].holdem;
		evaluateCardByRank(holdem);			
	}
}

const evaluateCardByRank = (holdem) => {
	switch(holdem){
		case 0:
			evaluateSingleRankCard();
			break;
		case 1:
			evaluateSingleRankCard();
			break;
		case 2:
			evaluateDoubleRankCard();
			break;
		case 3:
			evaluateSingleRankCard();
			break;
		case 4:
			evaluateSingleRankCard();
			break;
		case 5:
			evaluateWinnerByKicker(true);
			break;
		case 6:
			evaluateDoubleRankCard();
			break;
		case 7:
			evaluateSingleRankCard();
			break;
		case 8:
			evaluateSingleRankCard();
			break;
		case 9:
			evaluateSingleRankCard();
			break;   
	}	
}

const evaluateSingleRankCard = () => {	
	let cardOneDai = parseInt(players[0].details[1]);
	let cardOneJohn = parseInt(players[1].details[1]);
	if(cardOneDai > cardOneJohn){
		displayEvaluateHand(0);		
	}else if(cardOneDai < cardOneJohn){
		displayEvaluateHand(1);		
	}else if(cardOneDai == cardOneJohn){
		evaluateWinnerByKicker(false);
	}
}

const evaluateDoubleRankCard = () => {
	let cardOneDai = parseInt(players[0].details[1][0]);
	let cardOneJohn = parseInt(players[1].details[1][0]);
	let cardTwoDai = parseInt(players[0].details[1][1]);
	let cardTwoJohn = parseInt(players[1].details[1][1]);
	if(cardOneDai > cardOneJohn){	
		displayEvaluateHand(0);
	}else if(cardOneDai < cardOneJohn){
		displayEvaluateHand(1);			
	}else if(cardTwoDai > cardTwoJohn){
		displayEvaluateHand(0);
	}else if(cardTwoDai < cardTwoJohn){	
		displayEvaluateHand(1);			
	}else if(cardTwoDai == cardTwoJohn){	
		evaluateWinnerByKicker(false);		
	}
}

const evaluateWinnerByKicker = (data) => {
	let tie = true;
	let showdownDai = players[0].total;
	let showdownJohn = players[1].total;
	if(data){
		showdownDai = players[0].details;
		showdownJohn = players[1].details;		
	}
	for(let j = 0; j < showdownDai.length; j++){		
		if(showdownDai[j].rank > showdownJohn[j].rank){	
			displayEvaluateHand(0);			
			tie = false;
			break;
		}else if(showdownDai[j].rank < showdownJohn[j].rank){
			displayEvaluateHand(1);			
			tie = false;
			break;				
		}
	}
	if(tie){
		displayEvaluateHand(2);
	}
}

const displayEvaluateHand = (player) => {
	newWinner = true;
	let pot = document.querySelector('section#pot');
	let parsedPot = parseInt(pot.innerHTML);
	if(player == 0){	
		pot.innerHTML = `<section>Dai wins ${parsedPot}</section><br>`;	
		addWinnerToTheDataSet(0);		
	}else if(player == 1){
		addWinnerToTheDataSet(1);
		pot.innerHTML = `<section>John wins ${parsedPot}</section><br>`;			
	}else{
		pot.innerHTML = `<section>Tie split ${parsedPot}</section><br>`;
		addWinnerToTheDataSet(2);
	}	
	displayAmount(player, parsedPot);
}

const displayAmount = (player, parsedPot) => {	
	if(player != 2){
		players[player].amount += parsedPot;
		document.querySelector(`section#amount_${player}`).innerHTML = players[player].amount;
	}else{
		for(let i = 0; i < players.length; i++){
			players[i].amount += (parsedPot / 2);
			document.querySelector(`section#amount_${players[i].player}`).innerHTML = players[i].amount;
		}		
	}
	displayEndGame();	
}

const displayEndGame = () => {
	if(players[0].amount == 0 || players[1].amount == 0){
		displayStatusOfTheGame(0);		
	}else{
		displayStatusOfTheGame(1);		
	}	
}

const displayStatusOfTheGame = (status) => {
	newWinner = true;
	showOrHidePlayerControls(1);
	let pot = document.querySelector('section#pot');
	let actionBtn = '';
	if(status == 1){
		actionBtn = makeNode('a', [['class', 'actionBtns'],['onclick', 'preFlop();']], 'continue');
		clearAllByContinueGame();		
	}else if(status == 0){	
		actionBtn = makeNode('a', [['class', 'actionBtns'],['onclick', 'preFlop();']], 'new game');
		clearAllByNewGame();		
	}
	pot.appendChild(actionBtn);
}

const clearAllByContinueGame = () => {
	evaluationCount = 0;
	for(let i = 0; i < players.length; i++){
		players[i].details = '';
		players[i].holdem = '';
		players[i].total = '';	
		players[i].card1 = '';	
		players[i].card2 = '';			
	}
	switchBlinds();
}

const clearAllByNewGame = () => {
	evaluationCount = 0;
	players = [];
	players = [	
		{'player': 0, 'amount': 10000, 'check':false, 'betSum':0, 'total': '', 'holdem': '', 'details': '', 'blind':'SB', 'card1': '', 'card2': '', 'name': 'Dai'},
		{'player': 1, 'amount': 10000, 'check':false, 'betSum':0, 'total': '', 'holdem': '', 'details': '', 'blind':'BB', 'card1': '', 'card2': '', 'name': 'John'}
	];	
}

const holdemHand = (num) => {	
	switch(num) {
		case 0:
			return 'high card';
			break;
		case 1:
			return 'one pair';
			break;
		case 2:
			return 'two pair';
			break;
		case 3:
			return 'three of a kind';
			break;
		case 4:
			return 'straight';
			break;
		case 5:
			return 'flush';
			break;
		case 6:
			return 'full house';
			break;
		case 7:
			return 'four of a kind';
			break;
		case 8:
			return 'straight flush';
			break;
		case 9:
			return 'royal flush';
			break;   
	}
}