const evaluation = () => {
	for(let i = 0; i < players.length; i++){
		let player = players[i].player;
		let showdown = players[i].total;
		countTotalRanks(showdown, player);		
	}		
}

const countTotalRanks = (showdown, player) => {		
	let totalRanks = {};
	for(let i = 0; i < showdown.length; i++){
		let p = showdown[i];
		totalRanks[p.rank] = (totalRanks[p.rank] || 0) + 1;		
	}
	checkTotalRanks(showdown, player, totalRanks)
}

const checkTotalRanks = (showdown, player, totalRanks) => {
	let totalFour = [0];
	let totalThree = [0];
	let totalTwo = [0];
	let threeKey = [];
	let twoKey = [];
	for(let key in totalRanks){
		if(totalRanks.hasOwnProperty(key)){
			if(totalRanks[key] == 4){
				totalFour[0] += + 1;
				totalFour.push([key]);
			}else if(totalRanks[key] == 3){
				totalThree[0] += + 1;
				threeKey.push(key);
			}else if(totalRanks[key] == 2){
				totalTwo[0] += + 1;	
				twoKey.push(key);		
			}
		}
	}
	sortTotalThree(threeKey, totalThree);
	sortTotalTwo(twoKey, totalTwo);
	sortTotalTwoAndTotalThree(totalThree, totalTwo);
	totalRanksData = [showdown, player, totalRanks, totalFour, totalThree, totalTwo];	
	compareTotalRanksPartOne(totalRanksData, threeKey, twoKey);
}

const checkConsecutiveCards = (totalRanksData, threeKey, twoKey) => {	
	let ranks  = convertObjectToArray(totalRanksData);
	let allRanks = removeDuplicatesFromArray(totalRanksData, ranks);
	let indexes = getIndexesFromArray(totalRanksData, allRanks);
	let sequence = getConsecutiveIndexesFromArray(totalRanksData, indexes, allRanks);	
	let sequencelength = checkConsecutiveIndexesFirstAndLastElementArray(totalRanksData, sequence, indexes, allRanks)
	if(!sequencelength[0]){
		return [false];
	}else if(sequencelength[0]){
		if(sequencelength[1]){
			let switchAce = indexes[indexes.length-1];
			switchAce += 1;
			indexes.push(switchAce);
		}		
		let whichStraight = checkStraight(totalRanksData, indexes, allRanks);
		return [whichStraight[0], whichStraight[1]];	
	}	
}

const compareTotalRanksPartOne = (totalRanksData, threeKey, twoKey) => {
	let straight = false;
	let consecutive = checkConsecutiveCards(totalRanksData, threeKey, twoKey);
	if(consecutive[0] == true && consecutive[1] == 'royal flush'){
		displayShowdown(9, [totalRanksData[0][0].rank], totalRanksData[1]);
	}else if(consecutive[0] == true && consecutive[1] == 'straight flush'){	
		let highestCard = checkFirstElementOfStraightHand(totalRanksData);
		displayShowdown(8, [highestCard], totalRanksData[1]);	
	}else{		
		if(consecutive[0] == true && consecutive[1] == 'straight'){
			straight = true;
		}
		compareTotalRanksPartTwo(totalRanksData, threeKey, twoKey, straight);
	}
}

const compareTotalRanksPartTwo = (totalRanksData, threeKey, twoKey, straight) => {
	if(!checkFourOfAKind(totalRanksData)){
		if(!checkFullHouse(totalRanksData)){
			let flush = countTotalSuits(totalRanksData[0]);	
			if(flush[0]){
				displayShowdown(5, flush[1], totalRanksData[1]);
			}else{
				if(!straight){					
					if(!checkThreeOfAKind(totalRanksData)){
						if(!checkTwoPair(totalRanksData)){
							if(!checkOnePair(totalRanksData)){
								checkHighCard(totalRanksData);
							}							
						}
					}
				}else{
					let highestCard = checkFirstElementOfStraightHand(totalRanksData);
					displayShowdown(4, [highestCard], totalRanksData[1]);
				}					
			}				
		}			
	}
}

const checkFirstElementOfStraightHand = (totalRanksData) => {
	let highestCard = '';
	if(totalRanksData[0][0].rank == 14 && totalRanksData[0][3].rank == 5){
		highestCard = totalRanksData[0][3].rank;		
		players[totalRanksData[1]].total.shift();	
	}else{
		highestCard = totalRanksData[0][0].rank;
	}				
	return highestCard;	
}

const convertObjectToArray = (totalRanksData) => {
	let ranks = [];
	for(let i = 0; i < totalRanksData[0].length; i++){
		ranks.push(totalRanksData[0][i].rank);
	}
	return ranks;
}

const removeDuplicatesFromArray = (totalRanksData, ranks) => {
	let duplicates = {};
    let allRanks = [];
    for(let i = 0; i < ranks.length; i++) {
        if(!(ranks[i] in duplicates)) {
            allRanks.push(ranks[i]);
            duplicates[ranks[i]] = true;
        }else{
			 duplicates[ranks[i]] = false;		
		}		
    }
	return allRanks;
}

const getIndexesFromArray = (totalRanksData, allRanks) => {
	let indexes = [];
	for(let i = 0; i < allRanks.length; i++){
		let diff = allRanks[i+1] - allRanks[i];
		if(Math.abs(diff) == 1){
			indexes.push(i);
		}
	}
	return indexes;	
}

const getConsecutiveIndexesFromArray = (totalRanksData, indexes, allRanks) => {
	let sequence = [];
	for(let i = 0; i < indexes.length; i++){
		let diff = indexes[i+1] - indexes[i];
		if(Math.abs(diff) == 1){
			sequence.push(i);
		}
	}	
	return sequence;
}

const checkConsecutiveIndexesFirstAndLastElementArray = (totalRanksData, sequence, indexes, allRanks) => {	
	if(totalRanksData[0][0].rank == 14 && totalRanksData[0][6].rank == 2 && totalRanksData[0][5].rank == 3 
		&& totalRanksData[0][4].rank == 4 && totalRanksData[0][3].rank == 5){
		return [true, true]
	}else if(sequence.length >= 4){
		return [true, false];
	}else{
		return [false];
	}	
}

const checkStraight = (totalRanksData, indexes, allRanks) => {
	let possibleConsecutiveFlush = convertConsecutiveIndexesToObject(totalRanksData[0], indexes);
	if(possibleConsecutiveFlush[0]){
		if(allRanks[0] == 14 && allRanks[3] != 5){
			return [true, 'royal flush'];
		}else{
			return [true, 'straight flush'];
		}	
	}else{		
		return [true, 'straight'];			
	}	
}

const convertConsecutiveIndexesToObject = (showdown, indexes) => {
	let indexesObj = [];
	for(let i = 0; i < indexes.length; i++){		
		indexesObj.push({rank: showdown[indexes[i]].rank, suit: showdown[indexes[i]].suit});
	}
	let totalSuits = countTotalConsecutiveSuits(indexesObj);
	return totalSuits;
}

const countTotalConsecutiveSuits = (indexes) => {
	let totalConsecutiveSuits = {};
	for(let i = 0; i < indexes.length; i++){
		let p = indexes[i];
		totalConsecutiveSuits[p.suit] = (totalConsecutiveSuits[p.suit] || 0) + 1;			
	}		
	let checkedTotalSuits = checkTotalSuits(indexes, totalConsecutiveSuits);
	return checkedTotalSuits;	
}

const countTotalSuits = (showdown) => {
	let totalSuits = {};
	for(let i = 0; i < showdown.length; i++){
		let p = showdown[i];
		totalSuits[p.suit] = (totalSuits[p.suit] || 0) + 1;			
	}
	let checkedTotalSuits = checkTotalSuits(showdown, totalSuits);
	return checkedTotalSuits;
}

const checkTotalSuits = (showdown, totalSuits) => {
	let flush = false;	
	let flushSuit = '';
	for(let key in totalSuits){
		if(totalSuits.hasOwnProperty(key)){
			if(totalSuits[key] == 5){
				flush = true;
				flushSuit = key;
			}
		}
	}			
	let allFlushRanks = getRanksFromFlush(showdown, flushSuit);	
	return [flush, allFlushRanks, flushSuit];	
}

const getRanksFromFlush = (showdown, flushSuit) => {
	let flushRanks = [];
	for(let i = 0; i < showdown.length; i++){
		if(showdown[i].suit == flushSuit){			
			flushRanks.push({rank: showdown[i].rank, suit: flushSuit});			
		}		
	}
	return flushRanks;
}

const checkHighCard = (totalRanksData) => {
	if(totalRanksData[3][0] == 0 && totalRanksData[4][0] == 0 && totalRanksData[5][0] == 0){
		displayShowdown(0, [1, totalRanksData[0][0].rank], totalRanksData[1]);
		return true;
	}else{
		return false;
	}
}

const checkFourOfAKind = (totalRanksData) => {
	let fourOfAKind = false;
	if(totalRanksData[3][0] == 1 && totalRanksData[4][0] == 0 && totalRanksData[5][0] == 0){
		fourOfAKind = true;
	}else if(totalRanksData[3][0] == 1 && totalRanksData[4][0] == 1 && totalRanksData[5][0] == 0){
		fourOfAKind = true;		
	}else if(totalRanksData[3][0] == 1 && totalRanksData[4][0] == 0 && totalRanksData[5][0] == 1){
		fourOfAKind = true;		
	}
	if(fourOfAKind){
		displayShowdown(7, totalRanksData[3], totalRanksData[1]);	
		return true;		
	}else{
		return false;	
	}	
}

const checkThreeOfAKind = (totalRanksData) => {
	if(totalRanksData[3][0] == 0 && totalRanksData[4][0] == 1 && totalRanksData[5][0] == 0){
		displayShowdown(3, totalRanksData[4], totalRanksData[1]);
		return true;		
	}else{
		return false;
	}
}

const checkFullHouse = (totalRanksData) => {
	if(totalRanksData[3][0] == 0 && totalRanksData[4][0] == 1 && totalRanksData[5][0] == 1){
		let fullhouse = [totalRanksData[4][1][0],totalRanksData[5][1][0]];
		displayShowdown(6, fullhouse, totalRanksData[1]); 
		return true;
	}else{
		return false;
	}
}

const checkTwoPair = (totalRanksData) => {
	if(totalRanksData[3][0] == 0 && totalRanksData[4][0] == 0 && totalRanksData[5][0] == 2){
		displayShowdown(2, totalRanksData[5], totalRanksData[1]); 
		return true;
	}else{
		return false;
	}
}

const checkOnePair = (totalRanksData) => {
	if(totalRanksData[3][0] == 0 && totalRanksData[4][0] == 0 && totalRanksData[5][0] == 1){
		displayShowdown(1, totalRanksData[5], totalRanksData[1]);
		return true;
	}else{
		return false;
	}	
}

const sortTotalThree = (threeKey, totalThree) => {
	if(threeKey.length != 0){	
		if(threeKey.length > 1){				
			threeKey.sort(function(a, b){return b - a});
			threeKey.pop();
			totalThree[0] = 1;
		}			
		totalThree.push(threeKey);
	}
}

const sortTotalTwo = (twoKey, totalTwo) => {
	if(twoKey.length != 0){
		if(twoKey.length > 2){
			twoKey.sort(function(a, b){return b-a});
			twoKey.pop();
			totalTwo[0] = 2;
		}						
	}
	if(totalTwo[0] == 2){
		twoKey.sort(function(a, b){return b-a});	
	}	
	totalTwo.push(twoKey);	
}

const sortTotalTwoAndTotalThree = (totalThree, totalTwo) => {
	if(totalThree[0] == 1 && totalTwo[0] == 2){
		totalTwo[1].pop();	
		totalTwo[0] = 1;			
	}
}
