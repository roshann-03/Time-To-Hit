Find the number game.
///* Name of the Game*///
Time to hit.
-------------------------

System Design Planning:
    * Developed a structured plan for game features including number generation, scoring, and timer management.
    * Implemented levels of difficulty, enhancing user engagement.
    * Integrated local storage for saving player data.


///* Initialize *///

1)ask for Player Name
2)Show Start Panel
3)Show Game Panel


///* Logic and Functions/Features */// 
-------------------------------------------------------------------
1) generate numbers:-
    -> generate numbers in a specified range (1 to n).
    -> use a closure function for number generation.

2) print numbers:-
    -> display the generated numbers in the game panel.
    -> number must be display in shuffled order.

3) generate number to be hit:-
    ->  generate a target number within the range (1 to n).
    ->  ensure numbers are in sequence and do not repeat.
    ->  continue generating until all numbers on the panel are accounted for.

4) timer for hitting number:-
    ->  display a countdown timer in the panel.
    ->  time is allotted for each number that needs to be hit.
    ->  end the game if the time limit is exceeded.

5) check if number is hit:-
    ->  indicate whether the selected number was hit.
    ->  provide feedback on the panel regarding the hit status.
    ->  limit the player to three chances to hit.

6) show current score:-
    ->  display the current score.
    ->  update the score if it surpasses the previous high score.

7) show high score:-
    ->  display the high score.
    ->  update the high score if the current score exceeds it.

8) reset game:-
    ->  allow the player to reset the game if they wish to play again.
    ->  automatically reset if the game is over and the player opts to continue.

9) levels in game: 
    a) easy:-
        generate numbers in the range of 1-25.
    b) medium:-
        generate numbers in the range of 1-45.
    c) hard:-
        generate numbers in the range of 1-100.

10) game rules:- 
    ->  player must be able to enter a name.
    ->  player must be able to select a difficulty level.
    ->  player must be able to reset the game if they wish to play again.
    ->  player must be able to exit the game.

///* Data Storage *///
1) store data:-
    ->  save game data in local storage for future access.


///* Requirements *///
1) game requirements and technology used:-
    ->  HTML, CSS, JavaScript, and JQuery.


///* Conclusion *///
-----------------------------------------------------------------
1) game summary:-
    ->  The game is designed to be simple and easy to learn.
    ->  The game is designed to be fun and engaging.
    ->  The game is designed to be challenging and interactive. 

///*Game features*///
    ->  generate numbers in a specified range (1 to n).
    ->  display the generated numbers in the game panel board.
    ->  number must be display in shuffled order.
    ->  generate a target number within the range (1 to n).
    ->  ensure numbers are in sequence and do not repeat.
    ->  continue generating until all numbers on the panel are accounted for.
    ->  display a progress bar for the timer in the panel.
    ->  time is allotted for each number that needs to be hit.
    ->  end the game if the time limit is exceeded.
    ->  indicate whether the selected number was hit.
    ->  provide feedback on the panel regarding the hit status.
    ->  limit the player to three chances to hit.
    ->  display the current score.
    ->  update the score if it surpasses the previous high score.
    ->  update the high score if the current score exceeds it.
    ->  display the high score.
    ->  allow the player to reset the game if they wish to play again.
    ->  allow the player to exit the game.
    ->  automatically reset if the game is over and the player opts to continue.
    ->  generate numbers in the range of selected levels.