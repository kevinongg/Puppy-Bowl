// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2507-Kevin"; // Make sure to change this!
const RESOURCE = "/players";
const API = BASE + COHORT + RESOURCE;
console.log(API);

// === State ===
let puppies = [];
// let selectedPuppy =

// === Utility Functions ===
/** Updates state with all puppies from the API */
const getPuppies = async () => {};

/** Updates state with a single puppy from the API */
const getSinglePuppy = async (id) => {};

//////////////// DO LATER AFTER YOU GET THE APP RUNNING ////////////////
/** USE POST METHOD TO ADD NEW PARTY FROM THE API */
/** USE DELETE METHOD TO REMOVE THE PARTY FROM THE API WITH THE ID */

// === Components ===
/** Puppy name that shows more details about the artist when clicked */
const displayPuppyBoxes = (party) => {};
/** Add event Listener 


/** A list of names of all puppies with pictures */
const displayPuppyies = () => {};

/** Detailed information about the selected puppy */
const displayPuppyDetails = () => {};
//////////////// DO LATER AFTER YOU GET THE APP RUNNING ////////////////
/** Add event listener delete a puppy */

const addNewPuppyForm = () => {};
//////////////// DO LATER AFTER YOU GET THE APP RUNNING ////////////////
/** Add event listener add a puppy to the form */

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
  // $app.querySelector("displayPuppies").replaceWith(displayPuppies());
  // $app.querySelector("addNewPuppyForm").replaceWith(addNewPuppyForm());
  // $app.querySelector("displayPuppyDetails").replaceWith(displayPuppyDetails());
}

const init = async () => {
  // await getParties();
  render();
};

init();
