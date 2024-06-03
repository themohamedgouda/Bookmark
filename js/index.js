// DOM Elements
var bookNameInput = document.getElementById('bookNameInput');
var bookSiteInput = document.getElementById('bookSiteInput');
var bookSearchInput = document.getElementById('bookSearchInput');
var tableRowData = document.getElementById('tableData');
var addButton = document.getElementById('btn-add');
var updateButton = document.getElementById('btn-update');

// Variables
var globalIndex = '';
var productContainer = [];

// Load bookmarks from localStorage
if (localStorage.getItem('bookMark') !== null) {
    productContainer = JSON.parse(localStorage.getItem('bookMark'));
    displayBookMark();
}

// Display bookmarks
function displayBookMark() {
    var cartona = '';
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `<tr>
            <td class=" h5">${i + 1}</td>
            <td> ${getSocialIcon(productContainer[i].url)} </td>
            <td class=" h5"><a class="" href="${productContainer[i].url}" target="_blank">${productContainer[i].name}</a></td>
            <td><button class="btn btn-visit px-3"><i class="fa-solid fa-eye pe-2"></i><a target="_blank" href="${productContainer[i].url}">Visit</a></button></td>
            <td><button class="btn btn-update px-3" onclick="setForm(${i})"><i class="fa-solid fa-arrows-rotate pe-2"></i>Update</button></td>
            <td><button class="btn btn-delete px-3" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`;
    }
    tableRowData.innerHTML = cartona;
    clearForm();
}

// Add bookmark
function addBookMark() {
    if (bookNameInput.value.trim() === '' || bookSiteInput.value.trim() === '' || !isValidURL(bookSiteInput.value)) {
        var emptyInputModal = new bootstrap.Modal(document.getElementById('emptyInputModal'));
        emptyInputModal.show();
        return;
    }

    var bookMark = {
        name: bookNameInput.value,
        url: bookSiteInput.value,
    }
    productContainer.push(bookMark);
    localStorage.setItem('bookMark', JSON.stringify(productContainer));
    displayBookMark();
}

// Clear form
function clearForm() {
    bookNameInput.value = '';
    bookSiteInput.value = '';
}

// Delete bookmark
function deleteBookMark(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('bookMark', JSON.stringify(productContainer));
    displayBookMark();
}

// Set form for update
function setForm(index) {
    bookNameInput.value = productContainer[index].name;
    bookSiteInput.value = productContainer[index].url;
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none");
    globalIndex = index;
}

// Update bookmark
function updateMarkBook() {
    if (bookNameInput.value.trim() === '' || bookSiteInput.value.trim() === '' || !isValidURL(bookSiteInput.value)) {
        var emptyInputModal = new bootstrap.Modal(document.getElementById('emptyInputModal'));
        emptyInputModal.show();
        return;
    }

    productContainer[globalIndex].name = bookNameInput.value;
    productContainer[globalIndex].url = bookSiteInput.value;
    localStorage.setItem('bookMark', JSON.stringify(productContainer));
    displayBookMark();
    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
}

// Search bookmarks
function SearchMarkBook() {
    var displayFilteredBookMarks = '';
    var searchValue = bookSearchInput.value.toLowerCase();
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchValue)) {
            displayFilteredBookMarks += `<tr>
                <td class=" h5">${i + 1}</td>
                <td> ${getSocialIcon(productContainer[i].url)} </td>
                <td class=" h5"><a class="" href="${productContainer[i].url}" target="_blank">${productContainer[i].name}</a></td>
                <td><button class="btn btn-visit px-3"><i class="fa-solid fa-eye pe-2"></i><a target="_blank" href="${productContainer[i].url}">Visit</a></button></td>
                <td><button class="btn btn-update px-3" onclick="setForm(${i})"><i class="fa-solid fa-arrows-rotate pe-2"></i>Update</button></td>
                <td><button class="btn btn-delete px-3" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>`;
        }
    }
    tableRowData.innerHTML = displayFilteredBookMarks;
}

// Get icon of websites
function getSocialIcon(url) {
    var iconClass = '';
    var iconColor = '';
    var link = '';
    url = url.toLowerCase(); // Convert URL to lowercase
    if (url.includes("facebook.com")) {
        iconClass = "fab fa-xl fa-facebook";
        iconColor = "#3b5998";
        link = "https://www.facebook.com";
    } else if (url.includes("twitter.com")) {
        iconClass = "fab fa-xl fa-twitter";
        iconColor = "#1da1f2";
        link = "https://twitter.com";
    } else if (url.includes("instagram.com")) {
        iconClass = "fab fa-xl fa-instagram";
        iconColor = "#e4405f";
        link = "https://www.instagram.com";
    } else if (url.includes("linkedin.com")) {
        iconClass = "fab fa-xl fa-linkedin-in";
        iconColor = "#0077b5";
        link = "https://www.linkedin.com";
    } else if (url.includes("pinterest.com")) {
        iconClass = "fab fa-xl fa-pinterest";
        iconColor = "#bd081c";
        link = "https://www.pinterest.com";
    } else if (url.includes("youtube.com")) {
        iconClass = "fab fa-xl fa-youtube";
        iconColor = "#ff0000";
        link = "https://www.youtube.com";
    } else if (url.includes("tumblr.com")) {
        iconClass = "fab fa-xl fa-tumblr";
        iconColor = "#36465d";
        link = "https://www.tumblr.com";
    } else if (url.includes("reddit.com")) {
        iconClass = "fab fa-xl fa-reddit";
        iconColor = "#ff4500";
        link = "https://www.reddit.com";
    } else if (url.includes("snapchat.com")) {
        iconClass = "fab fa-xl fa-snapchat-ghost"; 
        iconColor = "#fffc00";
        link = "https://www.snapchat.com";
    } else if (url.includes("whatsapp.com")) {
        iconClass = "fab fa-xl fa-whatsapp";
        iconColor = "#25d366";
        link = "https://www.whatsapp.com";
    } else if (url.includes("skype.com")) {
        iconClass = "fab fa-xl fa-skype";
        iconColor = "#00aff0";
        link = "https://www.skype.com";
    } else if (url.includes("discord.com")) {
        iconClass = "fab fa-xl fa-discord";
        iconColor = "#7289da";
        link = "https://www.discord.com";
    } else if (url.includes("slack.com")) {
        iconClass = "fab fa-xl fa-slack";
        iconColor = "#4a154b";
        link = "https://www.slack.com";
    } else if (url.includes("telegram.org")) {
        iconClass = "fab fa-xl fa-telegram";
        iconColor = "#0088cc";
        link = "https://telegram.org";
    } else if (url.includes("viber.com")) {
        iconClass = "fab fa-xl fa-viber";
        iconColor = "#665cac";
        link = "https://www.viber.com";
    } else if (url.includes("discourse.org")) {
        iconClass = "fab fa-xl fa-discourse";
        iconColor = "#000000";
        link = "https://www.discourse.org";
    } else if (url.includes("medium.com")) {
        iconClass = "fab fa-xl fa-medium";
        iconColor = "#000000";
        link = "https://www.medium.com";
    } else if (url.includes("github.com")) {
        iconClass = "fab fa-xl fa-github";
        iconColor = "#181717";
        link = "https://www.github.com";
    } else if (url.includes("gitlab.com")) {
        iconClass = "fab fa-xl fa-gitlab";
        iconColor = "#fc6d26";
        link = "https://www.gitlab.com";
    } else if (url.includes("bitbucket.org")) {
        iconClass = "fab fa-xl fa-bitbucket";
        iconColor = "#0052cc";
        link = "https://bitbucket.org";
    } else if (url.includes("snapchat.com")) {
        iconClass = "fab fa-xl fa-snapchat-ghost";
        iconColor = "#FFFC00";
        link = "https://www.snapchat.com";
    } else if (url.includes("tiktok.com")) {
        iconClass = "fab fa-xl fa-tiktok"; 
        iconColor = "#000";
        link = "https://www.tiktok.com";
    } else if (url.includes("paypal.com")) {
        iconClass = "fab fa-xl fa-paypal"; 
        iconColor = "#009cde";
        link = "https://www.paypal.com";
    } else {
        // Default icon and color for other websites
        iconClass = "fas fa-xl fa-globe";
        iconColor = "#333333";
        link = url;
    }
    return `<a href="${link}" target="_blank"><i class="${iconClass}" style="color: ${iconColor};"></i></a>`;
}

// Validate inputs and show feedback
function validationInputs(element) {
    var regex = {
        bookNameInput: /.+/,
        // Ensuring the URL starts with http or https
        bookSiteInput: /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
        bookSearchInput: /.+/,
    }

    // Convert the input value to lowercase for case-insensitive matching
    var value = element.value.toLowerCase();

    if (regex[element.id].test(value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}

// Check if URL is valid
function isValidURL(url) {
    // Ensuring the URL starts with http or https
    var urlPattern = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlPattern.test(url.toLowerCase());
}