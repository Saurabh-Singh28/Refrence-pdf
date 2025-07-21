    function openFile(path) {
      window.open(path, '_blank');
    }

   // Search
    document.getElementById('searchInput').addEventListener('input', function () {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll('#fileTable tr:not(:first-child)');
      rows.forEach(row => {
        const text = row.cells[0].innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });

    // Theme toggle
    function toggleTheme() {
      document.body.classList.toggle('light');
    }
// dp popup menu
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

// file table
   const fileList = [
      {
        name: "Why Gandhi is not Father of the Nation",
        file: "gandhi-not-father.pdf",
        description: "PDF Article in Hindi"
      },
      {
        name: "History Report",
        file: "history-report.pdf",
        description: "A document on colonial India"
      },
      {
        name: "Freedom Notes",
        file: "freedom-notes.pdf",
        description: "Student notes on the independence movement"
      },{
        name: "History Report",
        file: "history-report.pdf",
        description: "A document on colonial India"
      },
      {
        name: "Freedom Notes",
        file: "freedom-notes.pdf",
        description: "Student notes on the independence movement"
      },
      {
        name: "History Report",
        file: "history-report.pdf",
        description: "A document on colonial India"
      },
      {
        name: "Freedom Notes",
        file: "freedom-notes.pdf",
        description: "Student notes on the independence movement"
      },
      {
        name: "History Report",
        file: "history-report.pdf",
        description: "A document on colonial India"
      },
      {
        name: "Freedom Notes",
        file: "freedom-notes.pdf",
        description: "Student notes on the independence movement"
      },
      {
        name: "History Report",
        file: "history-report.pdf",
        description: "A document on colonial India"
      },
      {
        name: "Freedom Notes",
        file: "freedom-notes.pdf",
        description: "Student notes on the independence movement"
      }
    ];

    const table = document.getElementById("fileTable");

    fileList.forEach(item => {
      const row = document.createElement("tr");
      row.classList.add('item');  // Important for pagination

      row.innerHTML = `
        <td>${item.name} <br><i>${item.description}</i></td>
        <td>
          <button class="open-button" onclick="window.open('files/${item.file}', '_blank')">Open</button>
          <a href="files/${item.file}" download>
            <button class="open-button">Download</button>
          </a>
        </td>
      `;
      document.querySelector('#fileTable tbody').appendChild(row);
});
   

// page load
 let currentPage = 1;
    const itemsPerPage = 5;

    function displayPage(page) {
      const items = document.querySelectorAll('.item');
      const totalItems = items.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      items.forEach((item, index) => {
        item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'table-row' : 'none';
      });

      document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;
    }

    function nextPage() {
      const totalItems = document.querySelectorAll('.item').length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
      }
    }

    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
      }
    }

    displayPage(currentPage);

    // Random Quote
    const quotes = [
      "Knowledge is power.",
      "Learning never exhausts the mind. – Leonardo da Vinci",
      "Books are a uniquely portable magic. – Stephen King",
      "Education is the most powerful weapon you can use to change the world. – Nelson Mandela",
      "Read to lead.",
      "Because Every File Has a Story",
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

    // Scroll to top
    document.getElementById("scrollToTop").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll to bottom
    document.getElementById("scrollToBottom").addEventListener("click", function () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });