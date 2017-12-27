/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, checkSix, checkArray, activePlayer, gamePlaying, gameScore;




function newGame() {
	scores=[0,0];
	roundScore = 0;
	activePlayer = 0;
	checkArray = [];
	checkSix = [];
	gamePlaying = true;
	gameScore = document.querySelector('.score-game').value;

	
	if (isNaN(gameScore)) {
		gameScore = 20;
	} else {
		gameScore = document.querySelector('.score-game').value;
	}

	
	

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('#name-0').textContent= 'Player 1';
	document.querySelector('#name-1').textContent= 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	checkSix=[];

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

};

newGame();





document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {
			//checkSix = [];
			var dice0 = Math.floor(Math.random() * 6) + 1 ;
			checkArray.push(dice0);
			var dice1 = Math.floor(Math.random() * 6) + 1 ;
			checkArray.push(dice1);

			console.log (checkArray);

			var dices = dice0+dice1;	

			if (dice0===6) {
				checkSix.push(dice0);
			}

			if (dice1===6) {
				checkSix.push(dice1);
			}

			// 2. Display the result
			var dice0DOM = document.querySelector('.dice-0');
			dice0DOM.style.display = 'block';
			dice0DOM.src = 'dice-'+dice0+'.png';

			var dice1DOM = document.querySelector('.dice-1');
			dice1DOM.style.display = 'block';
			dice1DOM.src = 'dice-'+dice1+'.png';

			// 3. Update the result if the result of the dice is not 1
			if (dice0===1 || dice1 ===1) {
				nextPlayer();
			
			} else if (checkSix.length===2) {	
				scores[activePlayer] = 0;
				//checkSix=[];
				nextPlayer();


			} else {
				roundScore += dices
				document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';

			}
	}




});


document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying) {
				// add the round score to the total score
		scores[activePlayer] += roundScore;
		// update the interface
		document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
		// check if the player won the game
		if (scores[activePlayer] >= gameScore) {
			document.querySelector('#name-'+activePlayer).textContent= 'Winner!';
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		};
	}

	


});	


document.querySelector('.btn-new').addEventListener('click', function() {
	newGame();
});	




