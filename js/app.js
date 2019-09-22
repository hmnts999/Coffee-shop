//constructor function

// hide preloader
// all the imaged scripts links have finished loading

// window event list

eventListeners();
function eventListeners() {
	const ui = new UI();

	window.addEventListener("load", function() {
		ui.hidePreloader();
	});

	// nav btn
	document.querySelector(".navBtn").addEventListener("click", function() {
		ui.showNav();
	});

	//submit the form
	document
		.querySelector(".drink-form")
		.addEventListener("submit", function(event) {
			event.preventDefault();
			const name = document.querySelector(".input-name").value;
			const lastName = document.querySelector(".input-lastname").value;
			const email = document.querySelector(".input-email").value;

			let value = ui.checkEmpty(name, lastName, email);

			if (value) {
				let customer = new Customer(name, lastName, email);
				ui.addCustomer(customer);
				ui.showFeedback("customer added to the list", "success");
			} else {
				ui.showFeedback("some form values empty", "error");
			}
		});
}

//constructor function
function UI() {}

// hide preloader
UI.prototype.hidePreloader = function() {
	document.querySelector(".preloader").style.display = "none";
};

// show Nav
UI.prototype.showNav = function() {
	document.querySelector(".nav").classList.toggle("nav--show");
};

//check the empty values
UI.prototype.checkEmpty = function(name, lastname, email) {
	let result;

	if (name === "" || lastname === "" || email === "") {
		result = false;
	} else {
		result = true;
	}
	return result;
};

UI.prototype.showFeedback = function(text, type) {
	if (type === "success") {
		document.querySelector(".drink-form__feedback");
		feedback.classList.add("success");
		feedback.innerText = text;
		this.removeAlert("error");
	} else if (type === "error") {
		let feedback = document.querySelector(".drink-form__feedback");
		feedback.classList.add("error");
		feedback.innerText = text;
		this.removeAlert("error");
	}
};
// remove alert
UI.prototype.removeAlert = function(type) {
	setTimeout(function() {
		document.querySelector(".drink-form__feedback").classList.remove(type);
	}, 3000);
};

// add customer
UI.prototype.addCustomer = function(customer) {
	const images = [1, 2, 3, 4, 5];
	let random = Math.floor(Math.random() * images.length);
	const div = document.createElement("div");
	div.classList.add("person");
	div.innerHTML = `<img
	src="img/person-${random}.jpeg"
	alt="person"
	class="person_thumbnail"
/>
<h4 class="person__name">${customer.name}</h4>
<h4 class="person__last-name">${customer.lastname}</h4>`;
	document.querySelector(".drink-card__list").appendChild(div);
};

function Customer(name, lastname, email) {
	(this.name = name), (this.lastname = lastname), (this.email = email);
}
