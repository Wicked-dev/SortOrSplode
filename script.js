"use strict";
/**
 * ICS3UC Final Project S1 2023-24
 *
 * Author: Dudley Delcy
 * Description: Sort or 'Splode, a remake.
 *
 */

let scoreB = 0;
let scoreR = 0;
let game_score = 0;
document.getElementById("score_B").textContent = scoreB;
document.getElementById("score_R").textContent = scoreR;
document.getElementById("game_score").textContent = game_score;

function updateScore() {
  document.getElementById("score_B").textContent = scoreB;
  document.getElementById("score_R").textContent = scoreR;
  game_score = scoreB + scoreR;
  document.getElementById("game_score").textContent = game_score;
}

function getRandomIntX(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntY(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function $(id) {
  return document.getElementById(id);
}
