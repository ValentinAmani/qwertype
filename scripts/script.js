/**
 * @param {number} score
 * @param {number} numberSuggestedWords
 */
function displayResult(score, numberSuggestedWords) {
  let spanScore = document.querySelector(".score-area span");
  let displayScore = `${score} / ${numberSuggestedWords}`;
  spanScore.innerText = displayScore;
}

/**
 * @param {string} proposal
 */
function displayProposal(proposal) {
  let proposalArea = document.querySelector(".proposal-area");
  proposalArea.innerText = proposal;
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} score
 */
function displayEmail(name, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Qwertype&body=Salut, je suis ${name} et je viens de réaliser le score ${score} sur le site Qwertype !`;
  location.href = mailto;
}

/**
 * @param {string} name
 * @throws {Error}
 */
function validateName(name) {
  if (name.length < 2) {
    throw new Error("Le nom est trop court. ");
  }
}

/**
 * @param {string} email
 * @throws {Error}
 */
function validateEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    throw new Error("L'email n'est pas valide.");
  }
}

/**
 * @param {string} message
 */
function displayMessageError(message) {
  let spanErrorMessage = document.getElementById("errorMessage");

  if (!spanErrorMessage) {
    let popup = document.querySelector(".popup");
    spanErrorMessage = document.createElement("span");
    spanErrorMessage.id = "errorMessage";

    popup.append(spanErrorMessage);
  }

  spanErrorMessage.innerText = message;
}

/**
 * @param {string} scoreEmail
 */
function manageForm(scoreEmail) {
  try {
    let nameTag = document.getElementById("name");
    let name = nameTag.value;
    validateName(name);

    let emailTag = document.getElementById("email");
    let email = emailTag.value;
    validateEmail(email);
    displayMessageError("");
    displayEmail(name, email, scoreEmail);
  } catch (error) {
    displayMessageError(error.message);
  }
}

/**
 */
function startGame() {
  initAddEventListenerPopup();
  let score = 0;
  let i = 0;
  let proposalList = wordsList;

  let btnValidateWord = document.getElementById("btn-validate-word");
  let writeInput = document.getElementById("write-input");

  displayProposal(proposalList[i]);

  btnValidateWord.addEventListener("click", () => {
    if (writeInput.value === proposalList[i]) {
      score++;
    }
    i++;
    displayResult(score, i);
    writeInput.value = "";
    if (proposalList[i] === undefined) {
      displayProposal("Le jeu est fini");
      btnValidateWord.disabled = true;
    } else {
      displayProposal(proposalList[i]);
    }
  });

  let btnRadioList = document.querySelectorAll(".option-source input");
  for (let index = 0; index < btnRadioList.length; index++) {
    btnRadioList[index].addEventListener("change", (event) => {
      if (event.target.value === "1") {
        proposalList = wordsList;
      } else {
        proposalList = sentencesLlist;
      }
      displayProposal(proposalList[i]);
    });
  }

  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let scoreEmail = `${score} / ${i}`;
    manageForm(scoreEmail);
  });

  displayResult(score, i);
}
