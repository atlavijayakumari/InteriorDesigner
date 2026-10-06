const designs = [

    {
        category: "living",
        name: "Modern Living Room",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        description: "A warm and elegant living space with modern furniture.",
        price: "From ₹1,50,000"
    },

    {
        category: "bedroom",
        name: "Luxury Bedroom",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        description: "A peaceful bedroom designed for comfort and relaxation.",
        price: "From ₹1,20,000"
    },

    {
        category: "kitchen",
        name: "Modern Kitchen",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        description: "A practical kitchen combining style and functionality.",
        price: "From ₹1,80,000"
    },

    {
        category: "office",
        name: "Minimal Office",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
        description: "A clean and productive workspace for modern professionals.",
        price: "From ₹90,000"
    },

    {
        category: "living",
        name: "Elegant Lounge",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        description: "A sophisticated lounge with comfortable modern furniture.",
        price: "From ₹1,70,000"
    },

    {
        category: "bedroom",
        name: "Cozy Bedroom",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        description: "A cozy bedroom with soft tones and natural textures.",
        price: "From ₹1,10,000"
    },

    {
        category: "kitchen",
        name: "Contemporary Kitchen",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        description: "A stylish kitchen with smart storage and modern finishes.",
        price: "From ₹2,00,000"
    },

    {
        category: "office",
        name: "Creative Workspace",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
        description: "A creative workspace designed for focus and collaboration.",
        price: "From ₹1,00,000"
    }

];


let currentCategory = "all";


const $ = id => document.getElementById(id);


/* MODALS */

function openModal(id) {
    $(id).classList.add("show");
}


function closeModal(id) {
    $(id).classList.remove("show");
}


function switchModal(closeId, openId) {
    closeModal(closeId);
    openModal(openId);
}


document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", e => {

        if (e.target === modal) {
            closeModal(modal.id);
        }

    });

});


document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        document.querySelectorAll(".modal.show")
            .forEach(modal => closeModal(modal.id));

    }

});


/* DESIGN CARDS */

function displayDesigns() {

    const search = $("search").value.toLowerCase();

    const filtered = designs.filter(d =>

        (currentCategory === "all" ||
         d.category === currentCategory)

        &&

        (d.name.toLowerCase().includes(search) ||
         d.category.toLowerCase().includes(search))

    );


    $("designGrid").innerHTML = filtered.map(d => {

        const index = designs.indexOf(d);

        return `

            <div class="design-card">

                <div class="design-image">

                    <img src="${d.image}"
                         alt="${d.name}">

                    <button class="favorite"
                            onclick="favorite(${index})">
                        ♡
                    </button>

                </div>


                <div class="design-info">

                    <small class="tag">
                        ${d.category.toUpperCase()}
                    </small>

                    <h3>
                        ${d.name}
                    </h3>

                    <p>
                        ${d.description}
                    </p>

                    <button class="view-btn"
                            onclick="showDetails(${index})">
                        View Design →
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


function filterDesigns() {
    displayDesigns();
}


function filterCategory(category, button) {

    currentCategory = category;

    document.querySelectorAll(".filters button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    displayDesigns();
}


function scrollToDesigns() {

    $("designs").scrollIntoView({
        behavior: "smooth"
    });

}


/* FAVORITES */

function favorite(index) {

    let favorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    const name = designs[index].name;


    if (favorites.includes(name)) {

        favorites = favorites.filter(
            item => item !== name
        );

        toast("Removed from favorites");

    } else {

        favorites.push(name);

        toast("Added to favorites ♥");

    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}


/* DESIGN DETAILS */

function showDetails(index) {

    const design = designs[index];

    $("detailImage").src = design.image;

    $("detailCategory").textContent =
        design.category.toUpperCase();

    $("detailTitle").textContent =
        design.name;

    $("detailDescription").textContent =
        design.description;

    $("detailPrice").textContent =
        design.price;

    openModal("designModal");

}


function openConsultation() {

    closeModal("designModal");

    openModal("consultationModal");

}


/* SIGNUP */

$("signupForm").addEventListener("submit", e => {

    e.preventDefault();


    const name =
        $("signupName").value.trim();

    const email =
        $("signupEmail").value.trim();

    const password =
        $("signupPassword").value;

    const confirm =
        $("confirmPassword").value;


    if (password.length < 6) {

        toast("Password must contain 6 characters");

        return;

    }


    if (password !== confirm) {

        toast("Passwords do not match");

        return;

    }


    localStorage.setItem(
        "user",
        JSON.stringify({
            name,
            email,
            password
        })
    );


    e.target.reset();

    closeModal("signupModal");

    toast("Account created successfully!");


    setTimeout(() => {

        openModal("loginModal");

    }, 700);

});


/* LOGIN */

$("loginForm").addEventListener("submit", e => {

    e.preventDefault();


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    if (!user) {

        toast("Please create an account first");

        return;

    }


    if (
        $("loginEmail").value !== user.email ||
        $("loginPassword").value !== user.password
    ) {

        toast("Invalid email or password");

        return;

    }


    localStorage.setItem(
        "loggedIn",
        "true"
    );


    updateAccount();

    closeModal("loginModal");

    toast(`Welcome, ${user.name}!`);

});


/* ACCOUNT */

function updateAccount() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const loggedIn =
        localStorage.getItem("loggedIn") === "true";


    if (loggedIn && user) {

        $("navButtons").style.display = "none";

        $("userMenu").classList.add("show");

        $("userName").textContent =
            `Hi, ${user.name.split(" ")[0]}`;

    } else {

        $("navButtons").style.display = "flex";

        $("userMenu").classList.remove("show");

    }

}


function logout() {

    localStorage.removeItem("loggedIn");

    updateAccount();

    toast("You have been logged out");

}


/* PASSWORD */

function showPassword(id) {

    const input = $(id);

    input.type =
        input.type === "password"
        ? "text"
        : "password";

}


/* CONSULTATION */

$("consultForm").addEventListener("submit", e => {

    e.preventDefault();


    const consultation = {

        name: $("clientName").value,

        email: $("clientEmail").value,

        room: $("room").value,

        message: $("message").value

    };


    localStorage.setItem(
        "consultation",
        JSON.stringify(consultation)
    );


    e.target.reset();

    closeModal("consultationModal");

    toast("Consultation request submitted!");

});


/* MOBILE MENU */

function toggleMenu() {

    $("navLinks").classList.toggle("show");

}


/* TOAST */

let toastTimer;


function toast(message) {

    const box = $("toast");

    box.textContent = message;

    box.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        box.classList.remove("show");

    }, 2500);

}


/* START */

displayDesigns();

updateAccount();