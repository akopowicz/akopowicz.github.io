window.onload = () => {
  quiz.init();
}

class Quiz {
  currentQuestionIndex = -1;
  async init() {
    this.progress = document.getElementById('progress');
    this.countDownInfo = document.getElementById('count-down');
    this.questionHeading = document.getElementById('question-heading');
    this.answersList = document.getElementById('answers-list');
    this.summary = document.querySelector('.summary');
    this.submitButton = document.getElementById('submit-answer');

    this.submitButton.addEventListener('click', this.submitAnswer);
    this.restartButton = document.getElementById('restart-quiz');

    this.restartButton.addEventListener('click', this.restartQuiz);

    await this.loadData();
    this.restartQuiz();
  }

  loadData = async () => {
    const serverData = await fetch('questions.json');
    const jsonData = await serverData.json();

    if (!jsonData.questions) {
      return;
    }

    this.quizMaxTime = jsonData.quizMaxTime * 1000;
    this.questions = jsonData.questions;
  }

  submitAnswer = () => {
    let userSelectedInput = document.querySelector("input[type='radio']:checked");

    if (userSelectedInput) {
      const userSelectedIndex = userSelectedInput.value;

      const question = this.questions[this.currentQuestionIndex];
      question.userSelectedIndex = userSelectedIndex;

      this.setNextQuestionData();
    }
  }

  restartQuiz = () => {
    this.questions.forEach(q => q.userSelectedIndex = -1);
    this.currentQuestionIndex = -1;
    this.countDown();
    this.setNextQuestionData();

    this.answersList.classList.remove('hide');
    this.submitButton.classList.remove('hide');
    this.restartButton.classList.remove('show');
    this.summary.classList.add('hide');

  }

  countDown = () => {
    if (!this.countDownInterval) {
      this.quizStartTime = new Date().getTime();
      this.quizEndTime = this.quizStartTime + this.quizMaxTime;

      this.countDownInterval = setInterval(() => {
        const currentTime = new Date().getTime();

        if (currentTime >= this.quizEndTime) {
          this.stopCountDown();
          this.showSummary();
          return;
        }

        let timeLeft = Math.floor((this.quizEndTime - currentTime) / 1000);
        this.countDownInfo.textContent = `Pozostało: ${timeLeft}s`;
      }, 1000);

    }
  }

  setNextQuestionData = () => {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.showSummary();
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    this.questionHeading.textContent = question.q;

    const progressStr = `Pytanie ${this.currentQuestionIndex + 1} z ${this.questions.length}`;
    this.progress.textContent = progressStr;

    const answersHtml = question.answers.map((answerText, index) => {
      const answerId = `answer${index}`;
      return `
      <li>
        <input type="radio" name="answer" id="${answerId}" value="${index}" data-index="${index}" class="answer">
        <label for="${answerId}">${answerText}</label>
      </li>
      `
    }).join("");
    this.answersList.innerHTML = answersHtml;
  }

  stopCountDown = () => {
    clearInterval(this.countDownInterval);
    this.countDownInterval = null;
    this.countDownInfo.textContent = '';
  }

  showSummary = () => {
    this.stopCountDown();
    this.answersList.classList.add('hide');
    this.submitButton.classList.add('hide');
    this.restartButton.classList.add('show');
    this.summary.classList.remove('hide');

    this.questionHeading.textContent = 'Podsumowanie wyników:';

    let numCorrectAnswers = 0;

    let summaryHtml = this.questions.map((question, index) => {
      const answerId = `answer${index}`;

      const answersHtml = question.answers.map((answerText, answerIndex) => {
        let classToAdd = '';
        let checkedAttr = '';

        if (question.userSelectedIndex !== undefined) {
          if (question.userSelectedIndex == question.correctAnswerNum && answerIndex == question.correctAnswerNum) {
            classToAdd = 'correct-answer';
            checkedAttr = 'checked';
            numCorrectAnswers++;
          } 

          if (question.userSelectedIndex != question.correctAnswerNum && answerIndex== question.userSelectedIndex) {
            classToAdd = 'wrong-answer';
            checkedAttr = 'checked';
          }
        }

        const answerId = `answer${index}`;
        return `
        <li class="${classToAdd}">
          <input ${checkedAttr} disabled type="radio" name="answer" id="${answerId}" value="" data-index="" class="answer">
          <label for="${answerId}">${answerText}</label>
        </li>`;
      }).join("");
      this.summary.scrollTop = "0";
      return `
      <h4>Pytanie nr. ${index + 1}: ${question.q}</h4>
      <ul>
      ${answersHtml}
      </ul>`;
    }).join("");

    summaryHtml += `
    <hr>
    <h3>Ilość prawidłowych odpowiedzi ${numCorrectAnswers} na ${this.questions.length}</h3>`;

    this.summary.innerHTML = summaryHtml;
  }
}

const quiz = new Quiz();