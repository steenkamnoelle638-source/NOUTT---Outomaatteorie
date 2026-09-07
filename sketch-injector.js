(() => {
  const sketches = [
    { needle: "Gebruik die onderstaande DFA. Verwerk die string 101101", src: "./diagrams/dfa-end-01.png", label: "Skets: DFA wat op 01 eindig" },
    { needle: "Gebruik die onderstaande DFA en verwerk 001011", src: "./diagrams/dfa-even-ones.png", label: "Skets: DFA vir ’n ewe aantal 1’e" },
    { needle: "Verwerk die string 110101 deur die gegewe DFA", src: "./diagrams/dfa-odd-zeros.png", label: "Skets uit die oefenvraestel: DFA vir ’n onewe aantal 0’e" },
    { needle: "Gebruik die ε-NFA-skets hieronder", src: "./diagrams/epsilon-nfa.png", label: "Skets: ε-NFA" },
    { needle: "Gegee die DFA wat stringe met 'n ewe aantal 1'e aanvaar", src: "./diagrams/dfa-even-ones.png", label: "Skets: DFA vir ’n ewe aantal 1’e" },
    { needle: "Gebruik die DFA-skets vir 'begin met 1'", src: "./diagrams/dfa-start-1.png", label: "Skets: DFA wat met 1 begin" },
    { needle: "Gebruik die DFA vir onewe aantal 0'e", src: "./diagrams/dfa-odd-zeros.png", label: "Skets: DFA vir ’n onewe aantal 0’e" },
    { needle: "Gebruik die DFA-skets vir 'begin met 1'", src: "./diagrams/dfa-start-1.png", label: "Skets: DFA wat met 1 begin" },
  ];

  const normalize = (value) => (value || "").replace(/\s+/g, " ").trim();
  const imageFor = (question) => sketches.find((item) => normalize(question).includes(item.needle));

  function addSketches() {
    document.querySelectorAll(".paper-question").forEach((card) => {
      const questionText = normalize(card.querySelector(".paper-q-copy strong")?.textContent);
      const sketch = imageFor(questionText);
      if (!sketch) return;

      const makeFigure = () => {
        const figure = document.createElement("figure");
        figure.className = "question-sketch";
        figure.setAttribute("data-sketch-src", sketch.src);
        const image = document.createElement("img");
        image.src = sketch.src;
        image.alt = sketch.label;
        image.loading = "lazy";
        figure.appendChild(image);
        const caption = document.createElement("figcaption");
        caption.textContent = sketch.label;
        figure.appendChild(caption);
        return figure;
      };

      if (!card.querySelector(`.question-sketch[data-sketch-src="${sketch.src}"]`)) {
        const response = card.querySelector(".paper-response");
        if (response) response.insertBefore(makeFigure(), response.firstChild);
      }

      const answer = card.querySelector(".paper-answer");
      if (answer && !answer.querySelector(`.question-sketch[data-sketch-src="${sketch.src}"]`)) {
        answer.appendChild(makeFigure());
      }
    });
  }

  const observer = new MutationObserver(addSketches);
  const start = () => {
    addSketches();
    observer.observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
