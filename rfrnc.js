    function openFile(path) {
      window.open(path, '_blank');
    }

    document.getElementById('searchInput').addEventListener('input', function () {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll('#fileTable tr:not(:first-child)');
      rows.forEach(row => {
        const text = row.cells[0].innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });

    function toggleTheme() {
      document.body.classList.toggle('light');
    }

    const dp = document.getElementById("dp");
    const popup = document.getElementById("popupMenu");
    dp.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.style.display = popup.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", (e) => {
      if (!popup.contains(e.target) && e.target !== dp) {
        popup.style.display = "none";
      }
    });

    const quotes = [
      "Knowledge is power.",
      "Learning never exhausts the mind. – Leonardo da Vinci",
      "Books are a uniquely portable magic. – Stephen King",
      "Education is the most powerful weapon you can use to change the world. – Nelson Mandela",
      "Read to lead."
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
  