// Country filter. The page works without JavaScript (all flags are visible);
// with JavaScript, a row of buttons lets you focus on one country.
(function () {
  const grid = document.querySelector("#grid");
  const cards = Array.from(grid.querySelectorAll(".card"));
  const filters = document.querySelector("#filters");
  const list = document.querySelector("#filter-list");
  const status = document.querySelector("#status");

  const buttons = [];

  function makeButton(label, id) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = label;
    btn.dataset.id = id;
    btn.addEventListener("click", () => select(id, true));
    li.appendChild(btn);
    list.appendChild(li);
    buttons.push(btn);
  }

  function select(id, updateHash) {
    const known = cards.some((c) => c.id === id);
    const target = known ? id : "all";

    cards.forEach((card) => {
      card.hidden = target !== "all" && card.id !== target;
    });
    grid.dataset.single = String(target !== "all");
    buttons.forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.id === target)));

    const shown = cards.filter((c) => !c.hidden).length;
    status.textContent = target === "all" ? `Showing all ${shown} flags.` : `Showing the flag of ${cards.find((c) => c.id === target).dataset.name}.`;

    if (updateHash) {
      const url = target === "all" ? location.pathname + location.search : "#" + target;
      history.replaceState(null, "", url);
    }
  }

  makeButton("Show all", "all");
  cards.forEach((card) => makeButton(card.dataset.name, card.id));
  filters.hidden = false;

  select(location.hash.slice(1), false);
  window.addEventListener("hashchange", () => select(location.hash.slice(1), false));
})();
