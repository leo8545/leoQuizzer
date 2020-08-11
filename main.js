const _ = require("lodash");

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
		statement: "What official name was given to Pakistan in 1956 constitution?",
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

	// Markup
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
}
