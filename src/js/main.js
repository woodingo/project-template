'use strict'

$(document).ready(function() {

  // Если в проекте используются встроенные js-плагины от Foundation, разкомментировать
  // $(document).foundation();

  var skills = document.querySelectorAll('.checkbox input');
  var arrow = document.querySelector('.speedometer-graph .arrow');
  var skillLevelContainer = document.querySelector('#skill-level');
  var approved = document.querySelector('#candidate-approved');
  var skillsJs = [];
  var angle = 0;
  var skillLevel = 0;

  skills.forEach(function(element) {
    if (element.dataset.js === "") {
      skillsJs.push(element);
    };
  });

  var angleStep = 180 / skillsJs.length;
  var skillStep = Math.round(1000 / skillsJs.length);

  skillsJs.forEach(function(element) {
    element.addEventListener("click", changeLevel, false)
    if (element.checked) {
      angle = angle + angleStep;
      skillLevel = skillLevel + skillStep;
    }
  });

  arrow.style.transform = `rotate(${angle}deg)`;
  skillLevelContainer.innerHTML = skillLevel;

  if (skillLevel > 500) {
    approved.style.display = 'block';
    setTimeout(function() {
      approved.classList.add('true');
    }, 1);
  } else {
    approved.classList.remove('true');
    setTimeout(function() {
      approved.style.display = 'none';
    }, 300);
  }

  function changeLevel(e) {
    angle = 0;
    var skillLevelPrev = skillLevel;
    skillLevel = 0;
    skillsJs.forEach(function(element) {
      if (element.checked) {
        angle = angle + angleStep;
        skillLevel = skillLevel + skillStep;
        if (skillLevel > 1000) skillLevel = 1000;
      };
    });

    if (skillLevel > 500) {
      approved.style.display = 'block';
      setTimeout(function() {
        approved.classList.add('true');
      }, 1);
    } else {
      approved.classList.remove('true');
      setTimeout(function() {
        approved.style.display = 'none';
      }, 300);
    }

    if (skillLevel > skillLevelPrev) {
      var timer = setInterval(function() {
        if (skillLevelPrev >= skillLevel) {
          clearInterval(timer);
          skillLevelContainer.innerHTML = skillLevel;
        } else {
          skillLevelPrev = skillLevelPrev + 10;
          skillLevelContainer.innerHTML = skillLevelPrev;
        }
      }, 10);
    } else if (skillLevel < skillLevelPrev) {
      var timer = setInterval(function() {
        if (skillLevelPrev <= skillLevel) {
          clearInterval(timer);
          skillLevelContainer.innerHTML = skillLevel;
        } else {
          skillLevelPrev = skillLevelPrev - 10;
          skillLevelContainer.innerHTML = skillLevelPrev;
        }
      }, 10);
    }

    arrow.style.transform = `rotate(${angle}deg)`;
  }
});
