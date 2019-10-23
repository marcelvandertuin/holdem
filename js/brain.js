let inputCardOne = 0;
let inputCardTwo = 0;
let inputHouseCardOne = 0;
let inputHouseCardTwo = 0;
let inputHouseCardThree = 0;
let inputHouseCardFour = 0;
let inputHouseCardFive = 0;
let inputPot = 0;
let inputOwnPot = 0;
let inputOpponentPot = 0;
let inputOpponentCardOne = 0;
let inputOpponentCardTwo = 0;
let inputOpponentAction = 0;
let inputOpponentBet = 0;
let inputPlayerAction = 0;
let inputPlayerBet = 0;
let actionDai = [];
let actionJohn = [];

function convertDaiAction (outputBrainAction) {  
	let roundedAction = outputBrainAction.playerAction.toString().substring(0, 5);
	let action = parseFloat(roundedAction);
	let amountBet = Math.round((outputBrainAction.playerBet * 100000) / 500);
	let highestBet = getTheHighestBet(player);
	amountBet = amountBet * 500;
	if(amountBet > players[0].amount){
		amountBet = players[0].amount;
	}
	if(amountBet < highestBet[0]){
		amountBet = highestBet[0];
	}
	outputDaiAction(action, amountBet);
}

function inputBrainAction (callback) {
    getDataPlayer(0);
	getDataNextPlayer(0);
	getDataHouse();
	let actions = '';
	if(playerActions.length != 0){
		for(let i = playerActions.length - 1; i >= 0; i--) {
			if(playerActions[i].players == 1){	
				if(playerActions[i].action == 0.875 || playerActions[i].action == 0.625){
					actions = [playerActions[i].action, playerActions[i].betSum];				
				}else{		
					actions = [playerActions[i].action, 0];
				}
				inputOpponentAction = actions[0];
				inputOpponentBet = actions[1];
			break;
			}			
		}		
	}	
	let data =  {input: { cardOne: inputCardOne, cardTwo: inputCardTwo, houseCardOne: inputHouseCardOne, houseCardTwo: inputHouseCardTwo, 
				houseCardThree: inputHouseCardThree, houseCardFour: inputHouseCardFour, houseCardFive: inputHouseCardFive,
				pot: inputPot, ownPot: inputOwnPot, opponentPot: inputOpponentPot, opponentCardOne: inputOpponentCardOne, opponentCardTwo: inputOpponentCardTwo,
				opponentAction: inputOpponentAction, opponentBet: inputOpponentBet }, output: { playerAction: inputPlayerAction, playerBet: inputPlayerBet}}
	let network = new brain.NeuralNetwork();
	network.train(arguments[1]);
	let outputBrainAction = network.run(data);
	callback(outputBrainAction);
}

const outputDaiAction = (action, amountBet) => {
	if(action < 0.500){
		if(action < 0.250){			
			goFold(0);
		}else if(action > 0.250){
			goCall(0);
		}		
	}else{
		if(action < 0.750){
			goAllIn(0);				
		}else if(action > 0.750){		
			if(players[0].amount != 0){
				amountBet = amountBet / 500;
				let counter = 0;
				if (amountBet == 0) {
					amountBet = 1;
				}
				for(let i = 0; i < amountBet; i++){
					counter++;
					betUp(0);
					if(counter == amountBet){
						goBet(0);				
					}		
				}
			}else{				
				goAllIn();
			}
		}
	}
	document.querySelector('section#potInfo').innerHTML = '';
	clearDataSetVariables();
}

const getPlayerDataForDataSet = () => {	
	for(let i = 0; i < players.length; i++){
		getDataPlayer(players[i].player);
		getDataNextPlayer(players[i].player);
		getDataHouse();
		getDataPlayerAction(players[i].player);
		appendPlayerDataToTheirArray(players[i].player);	
	}
}

const getDataPlayer = (player) => {
	inputOwnPot = players[player].amount / 100000;	
	inputCards = convertCardsToNumbers([players[player].card1, players[player].card2]);
	inputCardOne = inputCards[0];
	inputCardTwo = inputCards[1];	
}

const getDataNextPlayer = (player) => {
	let nextPlayer = goToNextPlayer(player);
	inputOpponentPot = players[nextPlayer].amount / 100000;
	inputOpponentCards = convertCardsToNumbers([players[nextPlayer].card1, players[nextPlayer].card2]);
	inputOpponentCardOne = inputOpponentCards[0];
	inputOpponentCardTwo = inputOpponentCards[1];
}

const getDataHouse = () => {
	let pot = document.querySelector('section#pot');
	inputPot = parseInt(pot.innerHTML) / 100000;	
	if(house.length != 0){
		if(house.length >= 3){
			inputHouseCardOne = convertCardsToNumbers([house[0]])[0];
			inputHouseCardTwo = convertCardsToNumbers([house[1]])[0];
			inputHouseCardThree = convertCardsToNumbers([house[2]])[0];
			if(house.length >= 4){
				inputHouseCardFour = convertCardsToNumbers([house[3]])[0];			
			}
			if(house.length == 5){
				inputHouseCardFour = convertCardsToNumbers([house[4]])[0];			
			}
		}
	}	
}

const getDataPlayerAction = (player) => {
	let actions = '';
	let nextPlayer = goToNextPlayer(player);
	for(let i = 0; i < playerActions.length; i++){
		if(playerActions[i].action == 0.875 || playerActions[i].action == 0.625){
			actions = [playerActions[i].action, playerActions[i].betSum];				
		}else{		
			actions = [playerActions[i].action, 0];
		}				
		if(playerActions[i].players == player){			
			inputPlayerAction = actions[0];
			inputPlayerBet = actions[1];			
		}else if(playerActions[i].players == nextPlayer){			
			inputOpponentAction = actions[0];
			inputOpponentBet = actions[1];
		}		
	}
}

const appendPlayerDataToTheirArray = (player) => {
	let data =  {input: { cardOne: inputCardOne, cardTwo: inputCardTwo, houseCardOne: inputHouseCardOne, houseCardTwo: inputHouseCardTwo, 
				houseCardThree: inputHouseCardThree, houseCardFour: inputHouseCardFour, houseCardFive: inputHouseCardFive,
				pot: inputPot, ownPot: inputOwnPot, opponentPot: inputOpponentPot, opponentCardOne: inputOpponentCardOne, opponentCardTwo: inputOpponentCardTwo,
				opponentAction: inputOpponentAction, opponentBet: inputOpponentBet }, output: { playerAction: inputPlayerAction, playerBet: inputPlayerBet}}
	if(player == 0){
		actionDai.push(data);		
	}else{
		actionJohn.push(data);
	}
	clearDataSetVariables();
}

const addWinnerToTheDataSet = (winner) => {
	let action = '';	
	if(winner == 0){
		action = actionDai;
	}else if(winner == 1){
		action = actionJohn;
	}		
	for(let i = 0; i < action.length; i++){
		dataSet.push(action[i]);						
	}
	actionDai = [];
	actionJohn = [];
	playerActions = [];	
}

const convertCardsToNumbers = (cards) => {
	let convertedCards = [];	
	for(let i = 0; i < cards.length; i++){
		let result = cards[i].split(' ');
		if(result[1] == '♥r'){
			result[1] = 3;
		}else if(result[1] == '♦r'){
			result[1] = 4;		
		}else if(result[1] == '♣b'){
			result[1] = 5;		
		}else if(result[1] == '♠b'){
			result[1] = 6;		
		}
		let nums = ((result[0] + result[1]).toString());
		nums = parseInt(nums) / 1000;
		convertedCards.push(nums);
	}
	return convertedCards;
}

const clearDataSetVariables = () => {
	inputCardOne = 0;
	inputCardTwo = 0;
	inputHouseCardOne = 0;
	inputHouseCardTwo = 0;
	inputHouseCardThree = 0;
	inputHouseCardFour = 0;
	inputHouseCardFive = 0;
	inputPot = 0;
	inputOwnPot = 0;
	inputOpponentPot = 0;
	inputOpponentCardOne = 0;
	inputOpponentCardTwo = 0;
	inputOpponentAction = 0;
	inputOpponentBet = 0;
	inputPlayerAction = 0;
	inputPlayerBet = 0;	
}