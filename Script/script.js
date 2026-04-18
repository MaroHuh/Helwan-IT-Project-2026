const input = document.getElementById("search");
const items = document.querySelectorAll(".searchable");
const body = document.body;
input.addEventListener("input", function () {
const query = input.value.toLowerCase();

items.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
        item.classList.remove("hidden");
    } else {
        item.classList.add("hidden");
    }
    });
});

function changeTheme() {
    body.classList.toggle("dark");
}