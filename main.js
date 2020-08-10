// Data
const questions = [
	{
		statement: "Who is the founder of Pakistan?",
		options: [
			"Allama Iqbal",
			"Fatimah Jinnah",
			"Sir Syed Ahmad",
			"Muhammad Ali Jinnah",
		],
		answer: 3,
		category: "Easy",
	},
];
// Logic
const quizzerWrapper = document.querySelector(".quizzer-wrapper");
if (quizzerWrapper) {
	const questionsWrapper = document.querySelector("#quizzer-questions");
	questions.forEach((q, i) => {
		// Single question wrapper
		const eListItem = document.createElement("li");
		eListItem.classList.add("quizzer-q", `quizzer-q-${i}`);

		// Statement
		const eStatement = document.createElement("span");
		eStatement.textContent = q.statement;

		// Options
		const eOptionsWrapper = document.createElement("div");
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
