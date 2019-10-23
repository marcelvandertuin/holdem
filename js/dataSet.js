/*
0 int fold									0.125
1 int call/ check							0.375
2 int all in, amount int (multiple of 500)	0.625
3 int bet,  amount int( multiple of 500)	0.875

cards divided by 1000
pot divided by 100000

♥ = 3
♦ = 4
♣ = 5
♠ = 6
*/

let dataSet = [

	// 1
	{input: { cardOne: 0.095, cardTwo: 0.124, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.02, ownPot: 0.15, opponentPot: 0.15, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.875, opponentBet: 0.005 }, output: { playerAction: 0.875, playerBet: 0.005}},

	{input: { cardOne: 0.095, cardTwo: 0.124, houseCardOne: 0.094, houseCardTwo: 0.034, houseCardThree: 0.053, houseCardFour: 0, houseCardFive: 0,
	pot: 0.03, ownPot: 0.15, opponentPot: 0.15, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.875, opponentBet: 0.005 }, output: { playerAction: 0.875, playerBet: 0.005}},
	
	{input: { cardOne: 0.095, cardTwo: 0.124, houseCardOne: 0.094, houseCardTwo: 0.034, houseCardThree: 0.053, houseCardFour: 0.025, houseCardFive: 0,
	pot: 0.04, ownPot: 0.145, opponentPot: 0.145, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.95, cardTwo: 0.124, houseCardOne: 0.094, houseCardTwo: 0.034, houseCardThree: 0.053, houseCardFour: 0.025, houseCardFive: 0.076, 
	pot: 0.06, ownPot: 0.135, opponentPot: 0.135, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.01}},
	
	// 2
	{input: { cardOne: 0.105, cardTwo: 0.124, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.02, ownPot: 0.15, opponentPot: 0.15, opponentCardOne: 0.046, opponentCardTwo: 0.075,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0.005}},
	
	{input: { cardOne: 0.105, cardTwo: 0.124, houseCardOne: 0.125, houseCardTwo: 0.074, houseCardThree: 0.024, houseCardFour: 0, houseCardFive: 0,
	pot: 0.04, ownPot: 0.145, opponentPot: 0.145, opponentCardOne: 0.046, opponentCardTwo: 0.075,
	opponentAction: 0.375, opponentBet: 0.005 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.105, cardTwo: 0.124, houseCardOne: 0.125, houseCardTwo: 0.074, houseCardThree: 0.024, houseCardFour: 0.095, houseCardFive: 0,
	pot: 0.04, ownPot: 0.145, opponentPot: 0.145, opponentCardOne: 0.046, opponentCardTwo: 0.075,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.105, cardTwo: 0.124, houseCardOne: 0.125, houseCardTwo: 0.074, houseCardThree: 0.024, houseCardFour: 0.095, houseCardFive: 0.104,
	pot: 0.04, ownPot: 0.145, opponentPot: 0.145, opponentCardOne: 0.046, opponentCardTwo: 0.075,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 3
	{input: { cardOne: 0.063, cardTwo: 0.126, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.100, opponentPot: 0.150, opponentCardOne: 0.133, opponentCardTwo: 0.086,
	opponentAction: 0.875, opponentBet: 0.005 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.063, cardTwo: 0.126, houseCardOne: 0.124, houseCardTwo: 0.095, houseCardThree: 0.056, houseCardFour: 0, houseCardFive: 0,
	pot: 0.016, ownPot: 0.095, opponentPot: 0.145, opponentCardOne: 0.133, opponentCardTwo: 0.086,
	opponentAction: 0.875, opponentBet: 0.002 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.063, cardTwo: 0.126, houseCardOne: 0.124, houseCardTwo: 0.095, houseCardThree: 0.056, houseCardFour: 0.094, houseCardFive: 0,
	pot: 0.017, ownPot: 0.085, opponentPot: 0.135, opponentCardOne: 0.133, opponentCardTwo: 0.086,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.063, cardTwo: 0.126, houseCardOne: 0.124, houseCardTwo: 0.095, houseCardThree: 0.056, houseCardFour: 0.094, houseCardFive: 0.084,
	pot: 0.017, ownPot: 0.085, opponentPot: 0.135, opponentCardOne: 0.133, opponentCardTwo: 0.086,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 4
	{input: { cardOne: 0.053, cardTwo: 0.085, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.100, opponentPot: 0.150, opponentCardOne: 0.143, opponentCardTwo: 0.023,
	opponentAction: 0.875, opponentBet: 0.015 }, output: { playerAction: 0.875, playerBet: 0.025}},

	{input: { cardOne: 0.053, cardTwo: 0.085, houseCardOne: 0.145, houseCardTwo: 0.036, houseCardThree: 0.044, houseCardFour: 0, houseCardFive: 0,
	pot: 0.115, ownPot: 0.100, opponentPot: 0.150, opponentCardOne: 0.143, opponentCardTwo: 0.023,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.053, cardTwo: 0.085, houseCardOne: 0.145, houseCardTwo: 0.036, houseCardThree: 0.044, houseCardFour: 0.114, houseCardFive: 0,
	pot: 0.115, ownPot: 0.100, opponentPot: 0.150, opponentCardOne: 0.143, opponentCardTwo: 0.023,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.03}},

	{input: { cardOne: 0.053, cardTwo: 0.085, houseCardOne: 0.145, houseCardTwo: 0.036, houseCardThree: 0.044, houseCardFour: 0.114, houseCardFive: 0,
	pot: 0.175, ownPot: 0.100, opponentPot: 0.150, opponentCardOne: 0.143, opponentCardTwo: 0.023,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.04}},
	
	// 5
	{input: { cardOne: 0.065, cardTwo: 0.135, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.15, opponentPot: 0.15, opponentCardOne: 0.074, opponentCardTwo: 0.064,
	opponentAction: 0.875, opponentBet: 0.005 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.065, cardTwo: 0.135, houseCardOne: 0.045, houseCardTwo: 0.053, houseCardThree: 0.063, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.15, opponentPot: 0.15, opponentCardOne: 0.074, opponentCardTwo: 0.064,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.005}},

	{input: { cardOne: 0.065, cardTwo: 0.135, houseCardOne: 0.045, houseCardTwo: 0.053, houseCardThree: 0.063, houseCardFour: 0.043, houseCardFive: 0.136,
	pot: 0.016, ownPot: 0.145, opponentPot: 0.145, opponentCardOne: 0.074, opponentCardTwo: 0.064,
	opponentAction: 0.875, opponentBet: 0.02 }, output: { playerAction: 0.875, playerBet: 0.01}},

	{input: { cardOne: 0.065, cardTwo: 0.135, houseCardOne: 0.045, houseCardTwo: 0.053, houseCardThree: 0.063, houseCardFour: 0.136, houseCardFive: 0,
	pot: 0.02, ownPot: 0.125, opponentPot: 0.125, opponentCardOne: 0.074, opponentCardTwo: 0.064,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 6
	{input: { cardOne: 0.146, cardTwo: 0.136, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.140, opponentPot: 0.145, opponentCardOne: 0.056, opponentCardTwo: 0.144,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.005}},
	
	{input: { cardOne: 0.146, cardTwo: 0.136, houseCardOne: 0.054, houseCardTwo: 0.024, houseCardThree: 0.135, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.135, opponentPot: 0.140, opponentCardOne: 0.056, opponentCardTwo: 0.144,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.05}},

	{input: { cardOne: 0.146, cardTwo: 0.136, houseCardOne: 0.054, houseCardTwo: 0.024, houseCardThree: 0.135, houseCardFour: 0.115, houseCardFive: 0,
	pot: 0.125, ownPot: 0.085, opponentPot: 0.080, opponentCardOne: 0.056, opponentCardTwo: 0.144,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.05}},
	
	{input: { cardOne: 0.146, cardTwo: 0.136, houseCardOne: 0.054, houseCardTwo: 0.024, houseCardThree: 0.135, houseCardFour: 0.115, houseCardFive: 0.065,
	pot: 0.135, ownPot: 0.075, opponentPot: 0.070, opponentCardOne: 0.056, opponentCardTwo: 0.144,
	opponentAction: 0.625, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 7
	{input: { cardOne: 0.034, cardTwo: 0.054, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.145, opponentPot: 0.140, opponentCardOne: 0.095, opponentCardTwo: 0.146,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.005}},

	{input: { cardOne: 0.034, cardTwo: 0.054, houseCardOne: 0.144, houseCardTwo: 0.124, houseCardThree: 0.133, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.140, opponentPot: 0.135, opponentCardOne: 0.095, opponentCardTwo: 0.146,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.01}},

	{input: { cardOne: 0.034, cardTwo: 0.054, houseCardOne: 0.144, houseCardTwo: 0.124, houseCardThree: 0.133, houseCardFour: 0.074, houseCardFive: 0,
	pot: 0.045, ownPot: 0.130, opponentPot: 0.125, opponentCardOne: 0.095, opponentCardTwo: 0.146,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.01}},

	{input: { cardOne: 0.034, cardTwo: 0.054, houseCardOne: 0.144, houseCardTwo: 0.124, houseCardThree: 0.133, houseCardFour: 0.074, houseCardFive: 0.096,
	pot: 0.065, ownPot: 0.120, opponentPot: 0.115, opponentCardOne: 0.095, opponentCardTwo: 0.146,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.04}},
	
	// 8
	{input: { cardOne: 0.045, cardTwo: 0.044, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.145, opponentPot: 0.140, opponentCardOne: 0.144, opponentCardTwo: 0.143,
	opponentAction: 0.815, opponentBet: 0.005 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.045, cardTwo: 0.044, houseCardOne: 0.135, houseCardTwo: 0.133, houseCardThree: 0.024, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.140, opponentPot: 0.135, opponentCardOne: 0.144, opponentCardTwo: 0.143,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.045, cardTwo: 0.044, houseCardOne: 0.135, houseCardTwo: 0.133, houseCardThree: 0.024, houseCardFour: 0.046, houseCardFive: 0,
	pot: 0.025, ownPot: 0.140, opponentPot: 0.135, opponentCardOne: 0.144, opponentCardTwo: 0.143,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.04}},

	{input: { cardOne: 0.045, cardTwo: 0.044, houseCardOne: 0.135, houseCardTwo: 0.133, houseCardThree: 0.024, houseCardFour: 0.046, houseCardFive: 0.095,
	pot: 0.95, ownPot: 0.10, opponentPot: 0.095, opponentCardOne: 0.144, opponentCardTwo: 0.143,
	opponentAction: 0.675, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 9
	{input: { cardOne: 0.044, cardTwo: 0.043, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.145, opponentPot: 0.140, opponentCardOne: 0.053, opponentCardTwo: 0.143,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.01}},

	{input: { cardOne: 0.044, cardTwo: 0.043, houseCardOne: 0.104, houseCardTwo: 0.094, houseCardThree: 0.115, houseCardFour: 0, houseCardFive: 0,
	pot: 0.035, ownPot: 0.135, opponentPot: 0.130, opponentCardOne: 0.053, opponentCardTwo: 0.143,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.044, cardTwo: 0.043, houseCardOne: 0.104, houseCardTwo: 0.094, houseCardThree: 0.115, houseCardFour: 0.073, houseCardFive: 0,
	pot: 0.035, ownPot: 0.135, opponentPot: 0.130, opponentCardOne: 0.053, opponentCardTwo: 0.143,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.03}},

	{input: { cardOne: 0.044, cardTwo: 0.043, houseCardOne: 0.104, houseCardTwo: 0.094, houseCardThree: 0.115, houseCardFour: 0.073, houseCardFive: 0.113,
	pot: 0.095, ownPot: 0.015, opponentPot: 0.01, opponentCardOne: 0.053, opponentCardTwo: 0.143,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.03}},
	
	// 10
	{input: { cardOne: 0.145, cardTwo: 0.146, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.145, opponentPot: 0.140, opponentCardOne: 0.083, opponentCardTwo: 0.084,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.02}},

	{input: { cardOne: 0.145, cardTwo: 0.146, houseCardOne: 0.026, houseCardTwo: 0.085, houseCardThree: 0.113, houseCardFour: 0, houseCardFive: 0,
	pot: 0.045, ownPot: 0.125, opponentPot: 0.120, opponentCardOne: 0.083, opponentCardTwo: 0.084,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.02}},

	{input: { cardOne: 0.145, cardTwo: 0.146, houseCardOne: 0.026, houseCardTwo: 0.085, houseCardThree: 0.113, houseCardFour: 0.104, houseCardFive: 0,
	pot: 0.085, ownPot: 0.015, opponentPot: 0.01, opponentCardOne: 0.083, opponentCardTwo: 0.084,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.02}},

	{input: { cardOne: 0.145, cardTwo: 0.146, houseCardOne: 0.026, houseCardTwo: 0.085, houseCardThree: 0.113, houseCardFour: 0.104, houseCardFive: 0.143,
	pot: 0.085, ownPot: 0.015, opponentPot: 0.01, opponentCardOne: 0.083, opponentCardTwo: 0.084,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 11
	{input: { cardOne: 0.044, cardTwo: 0.045, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.135, opponentPot: 0.140, opponentCardOne: 0.113, opponentCardTwo: 0.123,
	opponentAction: 0.875, opponentBet: 0.005 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.044, cardTwo: 0.045, houseCardOne: 0.146, houseCardTwo: 0.43, houseCardThree: 0.103, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.130, opponentPot: 0.135, opponentCardOne: 0.113, opponentCardTwo: 0.123,
	opponentAction: 0.875, opponentBet: 0.02 }, output: { playerAction: 0.875, playerBet: 0.04}},
	
	{input: { cardOne: 0.044, cardTwo: 0.045, houseCardOne: 0.146, houseCardTwo: 0.43, houseCardThree: 0.103, houseCardFour: 0.046, houseCardFive: 0,
	pot: 0.15, ownPot: 0.08, opponentPot: 0.075, opponentCardOne: 0.113, opponentCardTwo: 0.123,
	opponentAction: 0.625, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.044, cardTwo: 0.045, houseCardOne: 0.146, houseCardTwo: 0.43, houseCardThree: 0.103, houseCardFour: 0.046, houseCardFive: 0.034,
	pot: 0.15, ownPot: 0.005, opponentPot: 0, opponentCardOne: 0.113, opponentCardTwo: 0.123,
	opponentAction: 0, opponentBet: 0 }, output: { playerAction: 0, playerBet: 0}},
	
	// 12
	{input: { cardOne: 0.143, cardTwo: 0.093, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.09, opponentCardOne: 0.076, opponentCardTwo: 0.064,
	opponentAction: 0.875, opponentBet: 0.005 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.143, cardTwo: 0.093, houseCardOne: 0.065, houseCardTwo: 0.033, houseCardThree: 0.063, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.09, opponentPot: 0.085, opponentCardOne: 0.076, opponentCardTwo: 0.064,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.143, cardTwo: 0.093, houseCardOne: 0.065, houseCardTwo: 0.033, houseCardThree: 0.063, houseCardFour: 0.083, houseCardFive: 0,
	pot: 0.015, ownPot: 0.09, opponentPot: 0.085, opponentCardOne: 0.076, opponentCardTwo: 0.064,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.03}},

	{input: { cardOne: 0.143, cardTwo: 0.093, houseCardOne: 0.065, houseCardTwo: 0.033, houseCardThree: 0.063, houseCardFour: 0.083, houseCardFive: 0.106,
	pot: 0.075, ownPot: 0.06, opponentPot: 0.055, opponentCardOne: 0.076, opponentCardTwo: 0.064,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.03}},
	
	// 13
	{input: { cardOne: 0.055, cardTwo: 0.143, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.09, opponentCardOne: 0.056, opponentCardTwo: 0.104,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.055, cardTwo: 0.143, houseCardOne: 0.074, houseCardTwo: 0.093, houseCardThree: 0.133, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.085, opponentPot: 0.08, opponentCardOne: 0.056, opponentCardTwo: 0.104,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.055, cardTwo: 0.143, houseCardOne: 0.074, houseCardTwo: 0.093, houseCardThree: 0.133, houseCardFour: 0.064, houseCardFive: 0,
	pot: 0.025, ownPot: 0.085, opponentPot: 0.08, opponentCardOne: 0.056, opponentCardTwo: 0.104,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.055, cardTwo: 0.143, houseCardOne: 0.074, houseCardTwo: 0.093, houseCardThree: 0.133, houseCardFour: 0.064, houseCardFive: 0.046,
	pot: 0.025, ownPot: 0.085, opponentPot: 0.08, opponentCardOne: 0.056, opponentCardTwo: 0.104,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 14
	{input: { cardOne: 0.106, cardTwo: 0.145, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.09, opponentCardOne: 0.115, opponentCardTwo: 0.124,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.03}},

	{input: { cardOne: 0.106, cardTwo: 0.145, houseCardOne: 0.116, houseCardTwo: 0.023, houseCardThree: 0.133, houseCardFour: 0, houseCardFive: 0,
	pot: 0.055, ownPot: 0.065, opponentPot: 0.06, opponentCardOne: 0.115, opponentCardTwo: 0.124,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.106, cardTwo: 0.145, houseCardOne: 0.116, houseCardTwo: 0.023, houseCardThree: 0.133, houseCardFour: 0.036, houseCardFive: 0,
	pot: 0.065, ownPot: 0.055, opponentPot: 0.05, opponentCardOne: 0.115, opponentCardTwo: 0.124,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.106, cardTwo: 0.145, houseCardOne: 0.116, houseCardTwo: 0.023, houseCardThree: 0.133, houseCardFour: 0.036, houseCardFive: 0.123,
	pot: 0.065, ownPot: 0.055, opponentPot: 0.05, opponentCardOne: 0.115, opponentCardTwo: 0.124,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 15
	{input: { cardOne: 0.144, cardTwo: 0.114, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.09, opponentCardOne: 0.125, opponentCardTwo: 0.143,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.03}},

	{input: { cardOne: 0.144, cardTwo: 0.114, houseCardOne: 0.093, houseCardTwo: 0.053, houseCardThree: 0.113, houseCardFour: 0, houseCardFive: 0,
	pot: 0.075, ownPot: 0.085, opponentPot: 0.08, opponentCardOne: 0.125, opponentCardTwo: 0.143,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.144, cardTwo: 0.114, houseCardOne: 0.093, houseCardTwo: 0.053, houseCardThree: 0.113, houseCardFour: 0.056, houseCardFive: 0,
	pot: 0.095, ownPot: 0.075, opponentPot: 0.07, opponentCardOne: 0.125, opponentCardTwo: 0.143,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.144, cardTwo: 0.114, houseCardOne: 0.093, houseCardTwo: 0.053, houseCardThree: 0.113, houseCardFour: 0.056, houseCardFive: 0.055,
	pot: 0.115, ownPot: 0.075, opponentPot: 0.07, opponentCardOne: 0.125, opponentCardTwo: 0.143,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 16
	{input: { cardOne: 0.083, cardTwo: 0.114, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.09, opponentCardOne: 0.055, opponentCardTwo: 0.085,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.875, playerBet: 0.03}},

	{input: { cardOne: 0.083, cardTwo: 0.114, houseCardOne: 0.033, houseCardTwo: 0.065, houseCardThree: 0.073, houseCardFour: 0, houseCardFive: 0,
	pot: 0.075, ownPot: 0.065, opponentPot: 0.06, opponentCardOne: 0.055, opponentCardTwo: 0.085,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.083, cardTwo: 0.114, houseCardOne: 0.033, houseCardTwo: 0.065, houseCardThree: 0.073, houseCardFour: 0.063, houseCardFive: 0,
	pot: 0.075, ownPot: 0.065, opponentPot: 0.06, opponentCardOne: 0.055, opponentCardTwo: 0.085,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.083, cardTwo: 0.114, houseCardOne: 0.033, houseCardTwo: 0.065, houseCardThree: 0.073, houseCardFour: 0.063, houseCardFive: 0.104,
	pot: 0.095, ownPot: 0.055, opponentPot: 0.05, opponentCardOne: 0.055, opponentCardTwo: 0.085,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
		// 17
	{input: { cardOne: 0.115, cardTwo: 0.023, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.09, opponentPot: 0.095, opponentCardOne: 0.053, opponentCardTwo: 0.055,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.115, cardTwo: 0.023, houseCardOne: 0.136, houseCardTwo: 0.035, houseCardThree: 0.113, houseCardFour: 0, houseCardFive: 0,
	pot: 0.035, ownPot: 0.08, opponentPot: 0.085, opponentCardOne: 0.053, opponentCardTwo: 0.055,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.115, cardTwo: 0.023, houseCardOne: 0.136, houseCardTwo: 0.035, houseCardThree: 0.113, houseCardFour: 0.073, houseCardFive: 0,
	pot: 0.055, ownPot: 0.07, opponentPot: 0.075, opponentCardOne: 0.053, opponentCardTwo: 0.055,
	opponentAction: 0.875, opponentBet: 0.02 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.115, cardTwo: 0.023, houseCardOne: 0.136, houseCardTwo: 0.035, houseCardThree: 0.113, houseCardFour: 0.073, houseCardFive: 0.026,
	pot: 0.095, ownPot: 0.05, opponentPot: 0.055, opponentCardOne: 0.053, opponentCardTwo: 0.055,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 18
	{input: { cardOne: 0.084, cardTwo: 0.125, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.09, opponentPot: 0.095, opponentCardOne: 0.136, opponentCardTwo: 0.046,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.084, cardTwo: 0.125, houseCardOne: 0.134, houseCardTwo: 0.074, houseCardThree: 0.104, houseCardFour: 0, houseCardFive: 0,
	pot: 0.035, ownPot: 0.08, opponentPot: 0.085, opponentCardOne: 0.136, opponentCardTwo: 0.046,
	opponentAction: 0.875, opponentBet: 0.02 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.084, cardTwo: 0.125, houseCardOne: 0.134, houseCardTwo: 0.074, houseCardThree: 0.104, houseCardFour: 0.054, houseCardFive: 0,
	pot: 0.075, ownPot: 0.06, opponentPot: 0.065, opponentCardOne: 0.136, opponentCardTwo: 0.046,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.084, cardTwo: 0.125, houseCardOne: 0.134, houseCardTwo: 0.074, houseCardThree: 0.104, houseCardFour: 0.054, houseCardFive: 0.043,
	pot: 0.075, ownPot: 0.06, opponentPot: 0.065, opponentCardOne: 0.136, opponentCardTwo: 0.046,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 19
	{input: { cardOne: 0.093, cardTwo: 0.145, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.09, opponentPot: 0.095, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.093, cardTwo: 0.145, houseCardOne: 0.024, houseCardTwo: 0.096, houseCardThree: 0.035, houseCardFour: 0, houseCardFive: 0,
	pot: 0.035, ownPot: 0.08, opponentPot: 0.085, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.875, opponentBet: 0.01 }, output: { playerAction: 0.375, playerBet: 0.02}},

	{input: { cardOne: 0.093, cardTwo: 0.145, houseCardOne: 0.024, houseCardTwo: 0.096, houseCardThree: 0.035, houseCardFour: 0.095, houseCardFive: 0,
	pot: 0.075, ownPot: 0.06, opponentPot: 0.065, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0.125, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.02}},
	
	{input: { cardOne: 0.093, cardTwo: 0.145, houseCardOne: 0.024, houseCardTwo: 0.096, houseCardThree: 0.035, houseCardFour: 0.095, houseCardFive: 0.135,
	pot: 0.035, ownPot: 0.08, opponentPot: 0.085, opponentCardOne: 0, opponentCardTwo: 0,
	opponentAction: 0, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 20
	{input: { cardOne: 0.083, cardTwo: 0.113, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.090, opponentCardOne: 0.064, opponentCardTwo: 0.043,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.005}},
	
	{input: { cardOne: 0.083, cardTwo: 0.113, houseCardOne: 0.135, houseCardTwo: 0.104, houseCardThree: 0.136, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.090, opponentPot: 0.085, opponentCardOne: 0.064, opponentCardTwo: 0.043,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.083, cardTwo: 0.113, houseCardOne: 0.135, houseCardTwo: 0.104, houseCardThree: 0.136, houseCardFour: 0.104, houseCardFive: 0,
	pot: 0.025, ownPot: 0.090, opponentPot: 0.085, opponentCardOne: 0.064, opponentCardTwo: 0.043,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.083, cardTwo: 0.113, houseCardOne: 0.135, houseCardTwo: 0.104, houseCardThree: 0.136, houseCardFour: 0.104, houseCardFive: 0.033,
	pot: 0.025, ownPot: 0.090, opponentPot: 0.085, opponentCardOne: 0.064, opponentCardTwo: 0.043,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 21	
	{input: { cardOne: 0.135, cardTwo: 0.086, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.090, opponentPot: 0.095, opponentCardOne: 0.084, opponentCardTwo: 0.115,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.135, cardTwo: 0.086, houseCardOne: 0134, houseCardTwo: 0.023, houseCardThree: 0.045, houseCardFour: 0, houseCardFive: 0,
	pot: 0.035, ownPot: 0.080, opponentPot: 0.085, opponentCardOne: 0.084, opponentCardTwo: 0.115,
	opponentAction: 0.875, opponentBet: 0.2 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.135, cardTwo: 0.086, houseCardOne: 0134, houseCardTwo: 0.023, houseCardThree: 0.045, houseCardFour: 0.113, houseCardFive: 0,
	pot: 0.075, ownPot: 0.060, opponentPot: 0.065, opponentCardOne: 0.084, opponentCardTwo: 0.115,
	opponentAction: 0.875, opponentBet: 0.2 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.135, cardTwo: 0.086, houseCardOne: 0134, houseCardTwo: 0.023, houseCardThree: 0.045, houseCardFour: 0.113, houseCardFive: 0.046,
	pot: 0.115, ownPot: 0.040, opponentPot: 0.045, opponentCardOne: 0.084, opponentCardTwo: 0.115,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 22
	{input: { cardOne: 0.135, cardTwo: 0.035, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.090, opponentCardOne: 0.123, opponentCardTwo: 0.105,
	opponentAction: 0.875, opponentBet: 0.3 }, output: { playerAction: 0.875, playerBet: 0.1}},

	{input: { cardOne: 0.135, cardTwo: 0.035, houseCardOne: 0.113, houseCardTwo: 0.125, houseCardThree: 0.075, houseCardFour: 0, houseCardFive: 0,
	pot: 0.075, ownPot: 0.065, opponentPot: 0.060, opponentCardOne: 0.123, opponentCardTwo: 0.105,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.2}},

	{input: { cardOne: 0.135, cardTwo: 0.035, houseCardOne: 0.113, houseCardTwo: 0.125, houseCardThree: 0.075, houseCardFour: 0.045, houseCardFive: 0,
	pot: 0.115, ownPot: 0.045, opponentPot: 0.040, opponentCardOne: 0.123, opponentCardTwo: 0.105,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.4}},
	
	{input: { cardOne: 0.135, cardTwo: 0.035, houseCardOne: 0.113, houseCardTwo: 0.125, houseCardThree: 0.075, houseCardFour: 0.045, houseCardFive: 0.126,
	pot: 0.185, ownPot: 0.005, opponentPot: 0, opponentCardOne: 0.123, opponentCardTwo: 0.105,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 23
	{input: { cardOne: 0.125, cardTwo: 0.115, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.090, opponentCardOne: 0.146, opponentCardTwo: 0.144,
	opponentAction: 0.875, opponentBet: 0.05 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.125, cardTwo: 0.115, houseCardOne: 0.093, houseCardTwo: 0.026, houseCardThree: 0.103, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.090, opponentPot: 0.085, opponentCardOne: 0.146, opponentCardTwo: 0.144,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.5}},

	{input: { cardOne: 0.125, cardTwo: 0.115, houseCardOne: 0.093, houseCardTwo: 0.026, houseCardThree: 0.103, houseCardFour: 0.084, houseCardFive: 0,
	pot: 0.125, ownPot: 0.040, opponentPot: 0.045, opponentCardOne: 0.146, opponentCardTwo: 0.144,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.5}},
	
	{input: { cardOne: 0.125, cardTwo: 0.115, houseCardOne: 0.093, houseCardTwo: 0.026, houseCardThree: 0.103, houseCardFour: 0.084, houseCardFive: 0.024,
	pot: 0.125, ownPot: 0.040, opponentPot: 0.045, opponentCardOne: 0.146, opponentCardTwo: 0.144,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.625, playerBet: 0}},
	
	// 24
	{input: { cardOne: 0.144, cardTwo: 0.143, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.090, opponentCardOne: 0.105, opponentCardTwo: 0.104,
	opponentAction: 0.875, opponentBet: 0.05 }, output: { playerAction: 0.375, playerBet: 0}},

	{input: { cardOne: 0.144, cardTwo: 0.143, houseCardOne: 0.074, houseCardTwo: 0.053, houseCardThree: 0.054, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.090, opponentPot: 0.085, opponentCardOne: 0.105, opponentCardTwo: 0.104,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.144, cardTwo: 0.143, houseCardOne: 0.074, houseCardTwo: 0.053, houseCardThree: 0.054, houseCardFour: 0.073, houseCardFive: 0,
	pot: 0.045, ownPot: 0.080, opponentPot: 0.075, opponentCardOne: 0.105, opponentCardTwo: 0.104,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.5}},
	
	{input: { cardOne: 0.144, cardTwo: 0.143, houseCardOne: 0.074, houseCardTwo: 0.053, houseCardThree: 0.054, houseCardFour: 0.073, houseCardFive: 0.075,
	pot: 0.145, ownPot: 0.030, opponentPot: 0.025, opponentCardOne: 0.105, opponentCardTwo: 0.104,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 25
	{input: { cardOne: 0.134, cardTwo: 0.106, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.090, opponentPot: 0.095, opponentCardOne: 0.136, opponentCardTwo: 0.063,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.134, cardTwo: 0.106, houseCardOne: 0.036, houseCardTwo: 0.056, houseCardThree: 0.136, houseCardFour: 0, houseCardFive: 0,
	pot: 0.035, ownPot: 0.080, opponentPot: 0.085, opponentCardOne: 0.136, opponentCardTwo: 0.063,
	opponentAction: 0.875, opponentBet: 0.15 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.134, cardTwo: 0.106, houseCardOne: 0.036, houseCardTwo: 0.056, houseCardThree: 0.136, houseCardFour: 0.043, houseCardFive: 0,
	pot: 0.065, ownPot: 0.065, opponentPot: 0.070, opponentCardOne: 0.136, opponentCardTwo: 0.063,
	opponentAction: 0.875, opponentBet: 0.3 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.134, cardTwo: 0.106, houseCardOne: 0.036, houseCardTwo: 0.056, houseCardThree: 0.136, houseCardFour: 0.043, houseCardFive: 0.135,
	pot: 0.125, ownPot: 0.035, opponentPot: 0.040, opponentCardOne: 0.136, opponentCardTwo: 0.063,
	opponentAction: 0.875, opponentBet: 0.5 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 26	
	{input: { cardOne: 0.144, cardTwo: 0.024, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.090, opponentCardOne: 0.104, opponentCardTwo: 0.055,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.05}},
	
	{input: { cardOne: 0.144, cardTwo: 0.024, houseCardOne: 0.033, houseCardTwo: 0.074, houseCardThree: 0.036, houseCardFour: 0, houseCardFive: 0,
	pot: 0.025, ownPot: 0.090, opponentPot: 0.085, opponentCardOne: 0.104, opponentCardTwo: 0.055,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	{input: { cardOne: 0.144, cardTwo: 0.024, houseCardOne: 0.033, houseCardTwo: 0.074, houseCardThree: 0.036, houseCardFour: 0.025, houseCardFive: 0,
	pot: 0.015, ownPot: 0.095, opponentPot: 0.090, opponentCardOne: 0.104, opponentCardTwo: 0.055,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.875, playerBet: 0.6}},
	
	{input: { cardOne: 0.144, cardTwo: 0.024, houseCardOne: 0.033, houseCardTwo: 0.074, houseCardThree: 0.036, houseCardFour: 0.025, houseCardFive: 0.113,
	pot: 0.135, ownPot: 0.035, opponentPot: 0.030, opponentCardOne: 0.104, opponentCardTwo: 0.055,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}},
	
	// 27
	{input: { cardOne: 0.125, cardTwo: 0.124, houseCardOne: 0, houseCardTwo: 0, houseCardThree: 0, houseCardFour: 0, houseCardFive: 0,
	pot: 0.015, ownPot: 0.090, opponentPot: 0.095, opponentCardOne: 0.096, opponentCardTwo: 0.066,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.3}},
	
	{input: { cardOne: 0.125, cardTwo: 0.124, houseCardOne: 0.134, houseCardTwo: 0.043, houseCardThree: 0.073, houseCardFour: 0, houseCardFive: 0,
	pot: 0.075, ownPot: 0.060, opponentPot: 0.065, opponentCardOne: 0.096, opponentCardTwo: 0.066,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.3}},
	
	{input: { cardOne: 0.125, cardTwo: 0.124, houseCardOne: 0.134, houseCardTwo: 0.043, houseCardThree: 0.073, houseCardFour: 0.035, houseCardFive: 0,
	pot: 0.135, ownPot: 0.030, opponentPot: 0.035, opponentCardOne: 0.036, opponentCardTwo: 0.066,
	opponentAction: 0.875, opponentBet: 0.1 }, output: { playerAction: 0.875, playerBet: 0.3}},
	
	{input: { cardOne: 0.125, cardTwo: 0.124, houseCardOne: 0.134, houseCardTwo: 0.043, houseCardThree: 0.073, houseCardFour: 0.035, houseCardFive: 0.106,
	pot: 0.195, ownPot: 0.030, opponentPot: 0.035, opponentCardOne: 0.036, opponentCardTwo: 0.066,
	opponentAction: 0.375, opponentBet: 0 }, output: { playerAction: 0.375, playerBet: 0}}
	
];