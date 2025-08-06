// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2507-Kevin"; // Make sure to change this!
const RESOURCE = "/players";
const API = BASE + COHORT + RESOURCE;
console.log(API);

// === State ===
let puppies = [];
let selectedPuppy;

// === Utility Functions ===
/** Updates state with all puppies from the API */
const getPuppies = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    puppies = data.data.players;
    render();
    // console.log(puppies);
    return puppies;
  } catch (e) {
    console.error(e);
  }
};

/** Updates state with a single puppy from the API */
const getSinglePuppy = async (id) => {
  try {
    const response = await fetch(API + "/" + id);
    const data = await response.json();
    selectedPuppy = data.data.player;
    render();
  } catch (e) {
    console.error(e);
  }
};

//////////////// DO LATER AFTER YOU GET THE APP RUNNING ////////////////
/** USE POST METHOD TO ADD NEW PARTY FROM THE API, and call getPuppies() */
const addPuppyPOST = async (puppy) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(puppy),
    });
    await getPuppies();
  } catch (e) {
    console.error(e);
  }
};

/** USE DELETE METHOD TO REMOVE THE PARTY FROM THE API WITH THE ID */
const removePuppyDELETE = async (id) => {
  try {
    const response = await fetch(API + "/" + id, {
      method: "DELETE",
    });
  } catch (e) {
    console.error(e);
  }
  selectedPuppy = null;
  getPuppies();
};

// === Components ===
/** Puppy name that shows more details about the artist when clicked */
const displayPuppyBoxes = (puppy) => {
  const $li = document.createElement("li");
  $li.classList.add("puppies");
  $li.innerHTML = `
  <a href="selected">
    <img src="${puppy.imageUrl}" 
    alt="${puppy.name}"> ${puppy.name}
  </a>
  `;
  //** Add event Listener
  $li.addEventListener("click", function (event) {
    event.preventDefault();
    getSinglePuppy(puppy.id);
  });
  return $li;
};

/** A list of names of all puppies with pictures */
const displayPuppies = () => {
  const $ul = document.createElement("ul");
  for (const puppy of puppies) {
    const $li = displayPuppyBoxes(puppy);
    $ul.append($li);
  }
  return $ul;
};

/** Detailed information about the selected puppy */
const displayPuppyDetails = () => {
  if (!selectedPuppy) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a PUPPY to see more details.";
    return $p;
  }

  const $puppyDetail = document.createElement("section");
  $puppyDetail.innerHTML = `
    <figure> 
      <img src="${selectedPuppy.imageUrl}" alt="${selectedPuppy.name}"> 
    </figure>
    <div>
      <p><strong>Name: </strong>${selectedPuppy.name}</p>
      <p><strong>ID: </strong>${selectedPuppy.id}</p>
      <p><strong>Breed: </strong>${selectedPuppy.breed}</p>
      <p><strong>Team: </strong>${
        selectedPuppy.team && selectedPuppy.team.name
          ? selectedPuppy.team.name
          : "Unassigned"
      } </p>
      <p><strong>Status: </strong>${selectedPuppy.status}</p>
    </div>
    <button type="button">Remove from roster</button>
  `;
  //////////////// DO LATER AFTER YOU GET THE APP RUNNING ////////////////
  /** Add event listener delete a puppy */
  $puppyDetail
    .querySelector("button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      removePuppyDELETE(selectedPuppy.id);
    });

  return $puppyDetail;
};

const addNewPuppyForm = () => {
  const $puppyForm = document.createElement("form");
  $puppyForm.innerHTML = `
    <label>
      Name
      <input name="name" required/>
    </label>
    <label>
      Breed
      <input name="breed" required/>
    </label>
    <label>
      Status
      <select name="status" required>
        <option value="">-- Select Status --</option>
        <option value="bench">Bench</option>
        <option value="field">Field</option>
      </select>
    </label>
    <label>
      Image URL
      <input name="imageUrl" required/>
    </label>
    <button type="submit">Add Puppy</button>
  `;

  //////////////// DO LATER AFTER YOU GET THE APP RUNNING ////////////////
  /** Add event listener to add a puppy to the form */
  $puppyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // console.log("In submit function");
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
    // console.log(event.target[2].value);
    // console.log(event.target[3].value);
    const puppyObj = {
      name: event.target[0].value,
      breed: event.target[1].value,
      status: event.target[2].value,
      imageUrl: event.target[3].value,
    };
    addPuppyPOST(puppyObj);
  });
  return $puppyForm;
};

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>PUPPY BOWL</h1>
    <main>
      <section>
        <h2>Puppy Lineup</h2>
        <displayPuppies></displayPuppies>
        <h3>Add a puppy</h3>
        <addNewPuppyForm></addNewPuppyForm>
      </section>
      <section id="selected">
        <h2>Puppy Details</h2>
        <displayPuppyDetails></displayPuppyDetails>
      </section>
    </main>
  `;
  $app.querySelector("displayPuppies").replaceWith(displayPuppies());
  $app.querySelector("addNewPuppyForm").replaceWith(addNewPuppyForm());
  $app.querySelector("displayPuppyDetails").replaceWith(displayPuppyDetails());
}

const init = async () => {
  await getPuppies();
  render();
};

init();
