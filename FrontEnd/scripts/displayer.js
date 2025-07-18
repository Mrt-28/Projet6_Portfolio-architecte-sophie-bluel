import { getRessource } from "./request.js";

const categoriesData = await getRessource("http://localhost:5678/api/categories");
const worksData      = await getRessource("http://localhost:5678/api/works");

console.log(categoriesData);
console.log(worksData);

import { setConexion } from "./request.js";

let conected = false;
const conexionButon = document.querySelector(".header__login");
const conexionForm = document.querySelector(".conexion__form");

conexionButon.addEventListener("click", () => {
    if (!conected){
        if (document.querySelector(".conexion").classList.contains("hidden")) {
            displayConexionForm(true);
        }
        else {
            displayConexionForm(false);
        }
    }
    else{
        //disconect the user 
        logout();
    }
});

conexionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#conexion__email").value;
    const password = document.querySelector("#conexion__password").value;

    try {
        const data = await setConexion({ email, password });
        console.log("Connexion réussie :", data);    
        displayConexionForm(false);
        login(data.userId, data.token);

    } catch (error) {
        console.error("Erreur de connexion :", error.message);
        alert("Erreur de connexion : " + error.message);
    }
});

function login(userId, token) {
    conected = true;
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    clearConexionForm();
    enableEditionMode();
    conexionButon.textContent = "Logout";
}

function logout() {
    conected = false;
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    unenableEditionMode();    
    conexionButon.textContent = "Login";
}
/*-----------------------------------------*/
// Display modify button and modify barre 
function getDistancePourcentFromRight(element) {
    const rect = element.getBoundingClientRect();
    console.log(rect.right);
    const pourcent = (rect.right / window.innerWidth) * 100; 
    return pourcent.toFixed(2);
}

function displayModifyButton(conected = false) {
    const titleAndModify = document.querySelector(".title-and-modify");
    if (!conected) {
        titleAndModify.removeChild(titleAndModify.lastChild); // Remove the modify button if not connected
    }
    else{
        const modifyButton = document.createElement("button");

        const modifyButtonImg = document.createElement("img");
        modifyButtonImg.src = "assets/icons/modify.svg";
        modifyButtonImg.alt = "Modifier les projets";
           
        const modifyButtonText = document.createElement("p");
        modifyButtonText.textContent = "Modifier";

        modifyButton.appendChild(modifyButtonImg);
        modifyButton.appendChild(modifyButtonText);
        modifyButton.classList.add("title-and-modify__modify");

        const titleElement = document.querySelector(".title-and-modify__title");
        modifyButton.style.left = getDistancePourcentFromRight(titleElement) + "%";

        titleAndModify.appendChild(modifyButton);

        modifyButton.addEventListener("click", () => {
            if (document.querySelector(".galery-manager-overlay").classList.contains("hidden")) {
                displayOverlayAndFormIO(true);
            }
            else {
                displayOverlayAndFormIO(false);
            }
        });
    }
}

function enableEditionMode(){
    const modifyModeBar = document.querySelector(".modify-mode-bar");
    modifyModeBar.classList.remove("hidden");

    const body = document.querySelector("body");
    body.style.paddingTop = "50px"; // Add padding to avoid header overlapping the content

    displayModifyButton(true); 
}

function unenableEditionMode(){
    const modifyModeBar = document.querySelector(".modify-mode-bar");
    modifyModeBar.classList.add("hidden");

    const body = document.querySelector("body");
    body.style.paddingTop = "0"; // Remove padding

    displayModifyButton(false);
}

/*-----------------------------------------*/
// Display the overlay and the form for connexion
function displayConexionForm(display = false) {
    const sectionIntroduction = document.querySelector(".introduction");
    const sectionPortfolio= document.querySelector(".portfolio");
    const sectionContact = document.querySelector(".contact");
    const conexionForm = document.querySelector(".conexion");    

    if (!display) {
        conexionButon.style.fontWeight = 400;
        sectionIntroduction.classList.remove("hidden");
        sectionPortfolio.classList.remove("hidden");
        sectionContact.classList.remove("hidden");
        conexionForm.classList.add("hidden");
    }
    else{
        conexionButon.style.fontWeight = 600;
        sectionIntroduction.classList.add("hidden");
        sectionPortfolio.classList.add("hidden");
        sectionContact.classList.add("hidden");        
        conexionForm.classList.remove("hidden");
    }
}

function clearConexionForm (){
    const emailInput = conexionForm.querySelector("#conexion__email");
    const passwordInput = conexionForm.querySelector("#conexion__password");

    emailInput.value = "";
    passwordInput.value = "";
}

function displayOverlayAndFormIO(displayed = false) {
    if (!displayed) {
        const modifyModeOverlay = document.querySelector(".galery-manager-overlay");
        const modifyModeContent = document.querySelector(".gallery-manager-window");

        modifyModeOverlay.classList.add("hidden");
        modifyModeContent.classList.add("hidden");
    }
    else{
        const modifyModeOverlay = document.querySelector(".galery-manager-overlay");
        const modifyModeContent = document.querySelector(".gallery-manager-window");

        modifyModeOverlay.classList.remove("hidden");
        modifyModeContent.classList.remove("hidden");

        generateGalleryManagement(modifyModeContent);
    }
}



function generateGalleryManagement(modifyModeContent) {
    // Need two div one for display all work with a button for delete them and one for the form for add a new work
    // The second is not displayed at first 
    // When the user click on the "Ajouter une photo" button undisplay first div and display the second one
    // TODO: Add the code to delete a work and add a new work
    // TODO: Decompose this function in several functions for better readability
    // TODO: Rework the indentation of the code and the placement of the appendChild() methods
    /*------------------------------------------*/
    // Create the nav barre for the modale
    const navBar = document.createElement("nav");
    navBar.classList.add("gallery-manager-window__nav");

    const returnButton = document.createElement("button");
    returnButton.classList.add("gallery-manager-window__nav__return");
    returnButton.classList.add("gallery-manager-window__nav__button");

    const returnButtonImg = document.createElement("img");
    returnButtonImg.src = "assets/icons/arrow-left.svg";
    returnButtonImg.alt = "Retour à la galerie";

        returnButton.addEventListener("click", () => {
            galleryManagement.classList.remove("hidden"); // Show the gallery management block
            addWorkBlock.classList.add("hidden"); // Hide the add work form block
            returnButton.classList.add("hidden"); // Hide the return button
        });

    returnButton.classList.add("hidden"); // Hide the return button at first

    returnButton.appendChild(returnButtonImg);
    navBar.appendChild(returnButton);

    const closeButton = document.createElement("button");
    closeButton.classList.add("gallery-manager-window__nav__close");
    closeButton.classList.add("gallery-manager-window__nav__button");

    const closeButtonImg = document.createElement("img");
    closeButtonImg.src = "assets/icons/xmark.svg";
    closeButtonImg.alt = "Fermer la modale";

        closeButton.addEventListener("click", () => {
            const modalChildrens = modifyModeContent.children;
            for (let i = modalChildrens.length - 1; i >= 0; i--) {
                modifyModeContent.removeChild(modalChildrens[i]);
            }
            displayOverlayAndFormIO(false); // Hide the overlay and form
        });

    closeButton.appendChild(closeButtonImg);
    navBar.appendChild(closeButton);
    /*------------------------------------------*/
    // Create the block for manage the gallery
    const galleryManagement = document.createElement("div");
    galleryManagement.classList.add("gallery-manager-window__content");
    galleryManagement.classList.add("gallery-manager-window__delete-work");

    const galleryManagementTitle = document.createElement("h3");
    galleryManagementTitle.textContent = "Galerie photo";
    galleryManagement.appendChild(galleryManagementTitle);

    const galleryManagementGrid = document.createElement("div");
    galleryManagementGrid.classList.add("gallery-manager-window__delete-work__grid");
    galleryManagement.appendChild(galleryManagementGrid);

    worksData.forEach(work => {
        const workElement = document.createElement("figure");
        workElement.classList.add("gallery-manager-window__delete-work__work");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl.toString();//toString() maybe useless here, maybe do other for security
        imageElement.alt = work.title.toString();
        imageElement.classList.add("gallery-manager-window__delete-work__work__img");
        workElement.appendChild(imageElement);        

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("gallery-manager-window__delete-work__work__delete-button");
        // add id of th image in a data-id
        deleteButton.setAttribute("data-id", work.id);
        workElement.appendChild(deleteButton);

        const imgDeleleteButton = document.createElement("img");
        imgDeleleteButton.src = "assets/icons/trash.svg";
        imgDeleleteButton.alt = "Supprimer le projet";
        deleteButton.appendChild(imgDeleleteButton);

        deleteButton.addEventListener("click", async () => {
            const workId = deleteButton.getAttribute("data-id");
            try {
                const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    console.log("Work deleted successfully");
                    // Remove the work element from the gallery management grid
                    galleryManagementGrid.removeChild(workElement);
                    // Also remove the work from the main gallery
                    const gallery = document.querySelector(".gallery");
                    const workToRemove = gallery.querySelector(`figure[gallery-data-id="${workId}"]`);
                    if (workToRemove) {
                        gallery.removeChild(workToRemove);
                    }
                } else {
                    console.error("Error deleting work:", response.statusText);
                    alert("Erreur lors de la suppression de la photo : " + response.statusText);
                }
            } catch (error) {
                console.error("Error deleting work:", error);
                alert("Erreur lors de la suppression de la photo : " + error.message);
            }
        });

        galleryManagementGrid.appendChild(workElement);
    });

    const galleryManagementSeparator = document.createElement("hr");
    galleryManagement.appendChild(galleryManagementSeparator);

    const addWorkButton = document.createElement("button");
    addWorkButton.classList.add("gallery-manager-window__content__green-button");
    addWorkButton.textContent = "Ajouter une photo";

        addWorkButton.addEventListener("click", () => {
            galleryManagement.classList.add("hidden"); // Hide the gallery management block
            addWorkBlock.classList.remove("hidden"); // Show the add work form block
            returnButton.classList.remove("hidden"); // Show the return button
        });

    galleryManagement.appendChild(addWorkButton);

    /*------------------------------------------*/
    /*------------------------------------------*/
    // Create the block for add a new work

    const addWorkBlock = document.createElement("div");
    addWorkBlock.classList.add("gallery-manager-window__content");
    addWorkBlock.classList.add("gallery-manager-window__add-work");

    const addWorkTitle = document.createElement("h3");
    addWorkTitle.textContent = "Ajout photo";
    addWorkBlock.appendChild(addWorkTitle);

    const addWorkForm = document.createElement("form");
    addWorkBlock.appendChild(addWorkForm);

    const imageInputBlock = document.createElement("div");
    imageInputBlock.classList.add("gallery-manager-window__add-work__addimage");

    const imageInputLabel = document.createElement("label"); // Use label for styling the input image_add-work
    imageInputLabel.setAttribute( "for", "image_add-work");
    imageInputLabel.classList.add("gallery-manager-window__add-work__addimage__label");

    const imageInputFile = document.createElement("input");
    Object.assign(imageInputFile, {
        id: "image_add-work",
        name: "image_add-work",
        type: "file",
        accept: ".jpg, .jpeg, .png"
    });
    Object.assign(imageInputFile.style, {
        opacity: "0",
        position: "absolute",
        width: "0"
    });
    
        imageInputFile.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                if (imageInputBlock.lastChild.tagName === "IMG") {
                    imageInputBlock.removeChild(imageInputBlock.lastChild); // Remove the preview image if no file is selected
                }

                const previewImage = document.createElement("img");
                previewImage.src = URL.createObjectURL(file);
                previewImage.alt = "Aperçu de l'image";
                previewImage.style.height = "100%";

                imageInputIcon.classList.add("hidden");
                imageInputText.classList.add("hidden");
                imageInputDesc.classList.add("hidden");

                imageInputBlock.appendChild(previewImage);
            }
            else {
                if (imageInputBlock.lastChild.tagName === "IMG") {
                    imageInputBlock.removeChild(imageInputBlock.lastChild); // Remove the preview image if no file is selected
                }

                imageInputIcon.classList.remove("hidden");
                imageInputText.classList.remove("hidden");
                imageInputDesc.classList.remove("hidden");
                console.log("no image selected yet");
            }
        });

    const imageInputIcon = document.createElement("img");
    imageInputIcon.src = "assets/icons/imgicon.svg";
    imageInputIcon.alt = "Ajouter une photo";
    imageInputIcon.classList.add("gallery-manager-window__add-work__addimage__icon");

    const imageInputText = document.createElement("p");
    imageInputText.classList.add("gallery-manager-window__add-work__addimage__text");
    imageInputText.textContent = "+ Ajouter photo";

    const imageInputDesc = document.createElement("p");
    imageInputDesc.classList.add("gallery-manager-window__add-work__addimage__desc");
    imageInputDesc.textContent = "jpg, png : 4mo max";

    imageInputBlock.required = true;

    imageInputBlock.appendChild(imageInputLabel);
    imageInputBlock.appendChild(imageInputFile);
    imageInputBlock.appendChild(imageInputIcon);
    imageInputBlock.appendChild(imageInputText);
    imageInputBlock.appendChild(imageInputDesc);

    addWorkForm.appendChild(imageInputBlock);      

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Titre";
    addWorkForm.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.type = "text";
    titleInput.required = true;
    addWorkForm.appendChild(titleInput);

    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "category");
    categoryLabel.textContent = "Catégorie";
    addWorkForm.appendChild(categoryLabel);

    const categorySelect = document.createElement("select");
    categorySelect.id = "category";
    categorySelect.name = "category";
    categorySelect.required = true;
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categorySelect.appendChild(defaultOption);    

    categoriesData.forEach(category => {
        if (category.name !== "Tous") {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        }
    });
    addWorkForm.appendChild(categorySelect);

    const addWorkFormSeparator = document.createElement("hr");
    addWorkForm.appendChild(addWorkFormSeparator);

    const submitButton = document.createElement("button");
    submitButton.classList.add("gallery-manager-window__content__green-button");
    submitButton.type = "submit";
    submitButton.textContent = "Valider";

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            // Here you can add the code to send the form data to the server
            // TODO: Implement the API call to add the new work
            console.log("Form submitted");
            console.log("Image URL:", imageInput.value);
            console.log("Title:", titleInput.value);
            console.log("Category ID:", categorySelect.value);
            // Reset the form
            imageInput.value = "";
            titleInput.value = "";
            categorySelect.value = "";
            defaultOption.selected = true;
        });
        
    addWorkForm.appendChild(submitButton);

    addWorkBlock.classList.add("hidden"); // Hide the form at first
    /*------------------------------------------*/
    modifyModeContent.appendChild(navBar);
    modifyModeContent.appendChild(galleryManagement);
    modifyModeContent.appendChild(addWorkBlock);
}

/*-----------------------------------------*/
// Display categories in the filter menu
const filterMenu = document.querySelector(".filter");

categoriesData.unshift({ id: 0, name: "Tous" }); // Add "Tous" category at the beginning

function displayFilters(filter) {
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("filter__button");
    if (filter.name === "Tous") {
        buttonElement.classList.add("filter__button--active");
    }
    buttonElement.textContent = filter.name;
    buttonElement.setAttribute("data-filter", filter.name.toLowerCase());
    filterMenu.appendChild(buttonElement);
}
categoriesData.forEach(filter => {
    displayFilters(filter);
});
/*-----------------------------------------*/
//Display works in the gallery
const gallery = document.querySelector(".gallery");

function displayWorks(work) {
    const workElement = document.createElement("figure");
    workElement.setAttribute("gallery-data-id", work.id);

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl.toString();
    imageElement.alt = work.title.toString();

    const titleElement = document.createElement("figcaption");
    titleElement.textContent = work.title;

    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
    gallery.appendChild(workElement);
}
worksData.forEach(work => {
    displayWorks(work);
});

/*-----------------------------------------*/
// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll(".filter__button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.classList.contains("filter__button--active")) { return; }

        const filterName = button.getAttribute("data-filter");
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("filter__button--active"));
        
        // Add active class to the clicked button
        button.classList.add("filter__button--active");

        gallery.innerHTML = "";
        // Filter works based on the selected category
        if (filterName === "tous") {
            worksData.forEach(work => {
                displayWorks(work);
            });
        }
        else{
            const filteredWorks = worksData.filter(work => 
                work.category.name.toLowerCase() === filterName
            );          
            filteredWorks.forEach(work => displayWorks(work));
        }

    });
});