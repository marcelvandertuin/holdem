let state = 'preFlop';
let playerActions = [];

const goFold = (player) => {
	players.betSum = 0;
	players.check = false;
	playerActions.push({players:player, action:0.125});	
	evaluateByFold(player);	
}

const evaluateByFold = (player) => {	
	let pot = document.querySelector('section#pot');
	let parsedPot = parseInt(pot.innerHTML);
	let winner = goToNextPlayer(player);
	players[winner].amount += parsedPot;	
	document.querySelector(`section#info_${player}`).innerHTML = 'FOLD';	
	document.querySelector(`section#amount_${winner}`).innerHTML = players[winner].amount;	
	pot.innerHTML = `<section>${players[winner].name} wins ${parsedPot}</section><br>`;
	displayEndGame();
}

const goCall = (player) => {
	let allIn = false;
	let higestBet = getTheHighestBet(player);
	players[player].check = true;
	if(higestBet[0] != 0){
		let remainder = players[player].amount - higestBet[0];	
		if(remainder == 0 || remainder < 0){
			allIn = true;				
		}else if(remainder > 0){
			players[player].amount = remainder;
			players[player].betSum = higestBet[0];
		}	
	}
	evaluateByCall(player, allIn);	
}

const evaluateByCall = (player, allIn) => {
	let pot = document.querySelector('section#pot');
	let parsedPot = parseInt(pot.innerHTML);
	let nextPlayer = goToNextPlayer(player);
	if(allIn){
		document.querySelector(`section#amount_${player}`).innerHTML = 0;
		document.querySelector(`section#info_${player}`).innerHTML = `ALL IN ${players[player].amount}`;
		players[player].betSum = players[player].amount;
		pot.innerHTML = parsedPot + players[player].amount;	
		players[player].amount = 0;
	}else{
		pot.innerHTML = parsedPot + players[player].betSum;	
		document.querySelector(`section#amount_${player}`).innerHTML = players[player].amount;		
	}	
	playerActions.push({players:player, action:0.375});	
	evaluateAction(player, nextPlayer);	
}

const goAllIn = (player) => {		
	let amount = players[player].amount;
	players[player].amount = 0;		
	players[player].check = true;
	evaluateByAllIn(player, amount);
}

const evaluateByAllIn = (player, amount) => {
	let pot = document.querySelector('section#pot');
	let parsedPot = parseInt(pot.innerHTML);
	pot.innerHTML = parsedPot + amount;	
	players[player].betSum = amount;
	document.querySelector(`section#amount_${player}`).innerHTML = 0;
	document.querySelector(`section#info_${player}`).innerHTML = `ALL IN ${amount}`;
	let nextPlayer = goToNextPlayer(player);		
	playerActions.push({players:player, action:0.625, betSum:amount / 100000});	
	evaluateAction(player, nextPlayer);	
}

const goBet = (player) => {
	evaluateByBet(player);
}

const evaluateByBet = (player) => {
	let betAmount = document.querySelector(`section#status_${player}`);
	let addBet = parseInt(betAmount.innerHTML);
	if(addBet != 0){	
		if(players[player].amount == addBet){
			document.querySelector(`section#info_${player}`).innerHTML = `ALL IN ${addBet}`;			
		}else{
			document.querySelector(`section#info_${player}`).innerHTML = `BET ${addBet}`;
		}		
		let pot = document.querySelector('section#pot');
		let parsedPot = parseInt(pot.innerHTML);
		pot.innerHTML = parsedPot + addBet;
		betAmount.innerHTML = 0;
		betAmount.style.visibility = 'hidden';	
		players[player].amount -= addBet;
		players[player].betSum += addBet;
		players[player].check = true;		
		playerActions.push({players:player, action:0.875, betSum:addBet / 10000});	
		checkBet(player);				
	}else{
		goAllIn();
	}
}

const checkBet = (player) => {
	if(checkAllIn(player)){
		let nextPlayer = goToNextPlayer(player);	
		evaluateAction(player, nextPlayer);	
	}else{	
		if(checkIfBetIsSufficient(player)){
			let nextPlayer = goToNextPlayer(player);	
			evaluateAction(player, nextPlayer);	
		}
	}	
}

const evaluateAction = (player, nextPlayer) => {
	if(players[player].check == true && players[nextPlayer].check == false && players[player].betSum == 0 && players[nextPlayer].betSum == 0){
		document.querySelector(`section#info_${player}`).innerHTML = 'CHECK';
		showOrHidePlayerControls(player);
	}else if(players[player].check == true && players[nextPlayer].check == true && players[player].betSum == 0 && players[nextPlayer].betSum == 0){
		document.querySelector(`section#info_${player}`).innerHTML = 'CHECK';
		checkStateOfTheGame(false, player);							
	}else if(players[player].check == true && players[nextPlayer].amount == 0){
		checkStateOfTheGame(true, player);				
	}else if(players[player].check == true && players[nextPlayer].check == true && players[player].betSum == players[nextPlayer].betSum){
		checkStateOfTheGame(false, player);						
	}else{
		let highestBet = getTheHighestBet(player);		
		document.querySelector(`section#info_${nextPlayer}`).innerHTML = `CALL ${highestBet[0] - highestBet[1]}`;
		showOrHidePlayerControls(player);		
	}
}

const showOrHidePlayerControls = (player) => {
	let nextPlayer = goToNextPlayer(player);	
	if(!newWinner){
		if(nextPlayer == 1){
		outputPlayerControlsMobile();
		outputPlayerControlsDesktop();
		}else{
			document.querySelector('section#controls').innerHTML = '';
			document.querySelector('section#void_1').innerHTML = '';
			setLoader();
			setTimeout(getDataForDaiStager, 1000);	
		}		
	}	
}

const getDataForDaiStager = () => {	
	inputBrainAction(convertDaiAction, dataSet);
}

const checkStateOfTheGame = (allIn, player) => {
	for(let i = 0; i < players.length; i++){
		players[i].betSum = 0;
		players[i].check = 0;
	}
	getPlayerDataForDataSet();
	if(allIn){
		runAllIn();
	}else{
		if(state == 'preFlop'){
			state = 'flop';			
			flop();
			showOrHidePlayerControls(player);	
		}else if(state === 'flop'){
			state = 'turn';
			turn();
			showOrHidePlayerControls(player);	
		}else if(state === 'turn'){
			state = 'preFlop';
			river();
			evaluation();
			showCardsDai();		
		}
	}
}

const runAllIn = () => {
	if(state === 'preFlop'){
		flop();
		turn();
		river();
		evaluation();
		showCardsDai();
	}else if(state === 'flop'){	
		state = 'preFlop';	
		turn();
		river();
		evaluation();
		showCardsDai();
	}else if(state === 'turn'){
		state = 'preFlop';
		river();
		evaluation();
		showCardsDai();
	}
}

const getTheHighestBet = (player) => {
	let betSums = [];
	let amount = players[player].amount;
	for(let i = 0; i < players.length; i++){		
		betSums.push(players[i].betSum);		
	}
	betSums.sort(function(a, b){return b - a});
	return betSums;
}

const checkAllIn = (player) => {
	if(players[player].amount == 0){
		return true;
	}else{
		return false;
	}
}

const checkIfBetIsSufficient = (player) => {
	let highestBet = getTheHighestBet(player);
	if(players[player].betSum < highestBet[0]){
		document.querySelector(`section#info_${player}`).innerHTML = `CALL ${highestBet[0] - players[player].betSum}`;	
		return false;
	}else{
		return true;
	}	
}

const goToNextPlayer = (player) => {
	let turn = 0;
	(player !== (players.length - 1)) ? turn = player + 1 : turn;
	return turn;
 }

const betUp = (player) => {
	let amount = players[player].amount;
	let betAmount = document.querySelector(`section#status_${player}`);
	betAmount.style.visibility = 'visible';
	let displayedAmount = document.querySelector(`section#amount_${player}`);
	let addBet = parseInt(betAmount.innerHTML); 
	let updateDisplay = parseInt(displayedAmount.innerHTML);
	if(amount != addBet){
		displayedAmount.innerHTML = updateDisplay - 500;
		betAmount.innerHTML = addBet + 500;
	}
}

const betDown = (player) => {
	let betAmount = document.querySelector(`section#status_${player}`);
	let displayedAmount = document.querySelector(`section#amount_${player}`);
	let addBet = parseInt(betAmount.innerHTML); 
	let updateDisplay = parseInt(displayedAmount.innerHTML);
	if(addBet != 0){
		displayedAmount.innerHTML = updateDisplay + 500;
		betAmount.innerHTML = addBet - 500;
	}
}

const switchBlinds = () => {
	for(let i = 0; i < players.length; i++){
		if(players[i].blind == 'SB'){
			players[i].blind = 'BB';
		}else if(players[i].blind == 'BB'){
			players[i].blind = 'SB';
		}		
	}
}