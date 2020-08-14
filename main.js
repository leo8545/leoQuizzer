const _ = require("lodash");
const Stopwatch = require("timer-stopwatch");

// All questions
const questions = [
	{
		statement: "Who is the founder of Pakistan?",
		options: [
			"Allama Iqbal",
			"Fatimah Jinnah",
			"Sir Syed Ahmad",
			"Muhammad Ali Jinnah",
		],
		answer: 3, // index of options
		level: "easy",
		category: "pakistan",
	},
	{
		statement: "Who is the national poet of Pakistan?",
		options: [
			"Allama Iqbal",
			"Fatimah Jinnah",
			"Sir Syed Ahmad",
			"Muhammad Ali Jinnah",
		],
		answer: 0, // index of options
		level: "easy",
		category: "pakistan",
	},
	{
		statement:
			"Allama Muhammad Iqbal delivered his famous Allahabad Address in?",
		options: ["1929", "1930", "1931", "1932"],
		answer: 1, // index of options
		level: "medium",
		category: "pakistan",
	},
	{
		statement:
			"What official name was given to Pakistan in 1956 constitution?",
		options: [
			"United States of Pakistan",
			"Republic of Pakistan",
			"Islamic Pakistan",
			"Islamic Republic of Pakistan",
		],
		answer: 3, // index of options
		level: "medium",
		category: "pakistan",
	},
	{
		statement: "When first constitution of Pakistan was enforced?",
		options: [
			"8th June 1956",
			"23rd March 1956",
			"14th August 1956",
			"25th December 1956",
		],
		answer: 1, // index of options
		level: "hard",
		category: "pakistan",
	},
	{
		statement:
			"Who was the Prime Minister of Pakistan during enforcement of first constitution?",
		options: [
			"Mohammad Ali Bogra",
			"Khwaja Nazim Uddin",
			"Choudhry Mohammad Ali",
			"Ibrahim Ismail Chundrigar",
		],
		answer: 2, // index of options
		level: "hard",
		category: "pakistan",
	},
];

// Filter questions based on their level

const easyQ = questions.filter((q, i) => q.level === "easy");
const mediumQ = questions.filter((q, i) => q.level === "medium");
const hardQ = questions.filter((q, i) => q.level === "hard");

let choosenQuestions = [
	..._.sampleSize(easyQ, 1),
	..._.sampleSize(mediumQ, 1),
	..._.sampleSize(hardQ, 1),
];

// Logic
const quizzerWrapper = document.querySelector(".quizzer-wrapper");
if (quizzerWrapper) {
	const questionsWrapper = document.querySelector("#quizzer-questions");

	document.querySelector("#totalQ").textContent = choosenQuestions.length;

	// Markup for questions
	choosenQuestions.forEach((q, i) => {
		// Single question wrapper
		const eListItem = document.createElement("li");
		eListItem.classList.add("quizzer-q", `quizzer-q-${i}`);

		// Statement
		const eStatement = document.createElement("span");
		eStatement.textContent = q.statement;

		// Options
		const eOptionsWrapper = document.createElement("div");
		eOptionsWrapper.classList.add("q-opts-wrapper");
		q.options.forEach((opt, index) => {
			const optId = `q-${i}-opt-${index}`;

			// Label
			const eOptLabel = document.createElement("label");
			eOptLabel.setAttribute("for", optId);

			// Option
			const eOption = document.createElement("input");
			eOption.setAttribute("type", "radio");
			eOption.setAttribute("value", opt);
			eOption.setAttribute("id", optId);
			eOption.setAttribute("name", `q-${i}`);

			eOptLabel.append(eOption);
			eOptLabel.append(opt);
			eOptionsWrapper.append(eOptLabel);
		});

		eListItem.append(eStatement);
		eListItem.append(eOptionsWrapper);
		questionsWrapper.append(eListItem);
	});

	// Timer
	const eTimer = document.querySelector("#seconds");
	const timerWrapper = document.querySelector(".timer");
	const numOfSeconds = 30;
	var timer = new Stopwatch(numOfSeconds * 1000, { refreshRateMS: 1000 }); // A new countdown timer with 10 seconds
	timer.start();
	// Fires every 50ms by default. Change setting the 'refreshRateMS' options
	timer.onTime(function (time) {
		let sec = Math.ceil(time.ms / 1000);
		let min = sec > 60 ? Math.floor(sec / 60) : 0;
		sec = min > 0 ? sec - min * 60 : sec;
		eTimer.textContent = `${min} m ${sec} s`;
	});
	// Fires when the timer is done
	timer.onDone(function () {
		timerWrapper.textContent = "Your time is finished.";
		document.querySelector("#q-submit").click();
		document.querySelectorAll('input[type="radio"]').forEach((ele) => {
			ele.setAttribute("disabled", "");
		});
	});

	// On submit
	const btn = document.querySelector("#q-submit");
	let result = 0;
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		timer.stop();
		let correctOnes = [];
		for (let i = 0; i < choosenQuestions.length; i++) {
			document
				.querySelectorAll(`input[name="q-${i}"]`)
				.forEach((field, index) => {
					if (field.checked) {
						if (
							field.value ===
							choosenQuestions[i].options[choosenQuestions[i].answer]
						) {
							correctOnes.push(i);
							if (!field.parentNode.querySelector("span.status")) {
								const eStatus = document.createElement("span");
								eStatus.classList.add("success", "status");
								eStatus.textContent = "Correct";
								document
									.querySelector(`label[for="q-${i}-opt-${index}"]`)
									.append(eStatus);
							} else {
								field.parentNode
									.querySelector("span.status")
									.classList.add("success");
								field.parentNode.querySelector(
									"span.status"
								).textContent = "Correct";
							}
						} else {
							if (!field.parentNode.querySelector("span.status")) {
								const eStatus = document.createElement("span");
								eStatus.classList.add("error", "status");
								eStatus.textContent = "Wrong";
								document
									.querySelector(`label[for="q-${i}-opt-${index}"]`)
									.append(eStatus);
							} else {
								field.parentNode
									.querySelector("span.status")
									.classList.add("error");
								field.parentNode.querySelector(
									"span.status"
								).textContent = "Wrong";
							}
						}
					}
				});
		}
		result =
			(100 *
				Math.round(
					(correctOnes.length / choosenQuestions.length + Number.EPSILON) *
						100
				)) /
			100;

		// Result markup
		const eResult = document.querySelector(".result");
		eResult.style.display = "block";
		eResult.textContent = `You secured: ${result}%`;
	});
}
