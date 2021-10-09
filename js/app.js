/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

//declare global variables
const sections = Array.from(document.querySelectorAll("section"));
const navigationBar = document.getElementById("navbar__list");
const main = document.getElementsByClassName("main__hero");
const menu = document.getElementsByClassName("menu__link");
const mainn = document.getElementsByTagName("main");

// declare and intialize counters that help us
let add0ne = 4;
let counter = 1;

//make a button and add listner to it to add a new section when click it
let btn = document.createElement("button");
btn.innerHTML = "Add section";

btn.addEventListener("click", function () {
  add0ne = add0ne + 1;
  // create new section start from the last section
  const newSection = document.createElement("section");
  newSection.setAttribute("id", "section" + add0ne);
  newSection.setAttribute("data-nav", "Section" + " " + add0ne);
  newSection.setAttribute("class", "your-active-class");

  newSection.innerHTML = `  
  <div class="landing__container">
    <h2>Section ${add0ne}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div> `;

  // when a new section is created then push it to the array of sections and put it after the last section
  sections.push(newSection);
  document.querySelector("main").insertAdjacentElement("beforeEnd", newSection);

  //when a new section added then a new item in nav bar added by it's name
  const listElement = document.createElement("li");
  const nameOfSection = newSection.getAttribute("data-nav");

  listElement.innerHTML = `<li class = menu__link>${nameOfSection}</li>`;
  listElement.id = `section${add0ne}test`;
  //when click to the item in navbar it will scroll to this section
  listElement.addEventListener("click", function scrollToTop() {
    newSection.scrollIntoView(true);
  });
  navigationBar.appendChild(listElement);
});
document.querySelector("section").insertAdjacentElement("afterBegin", btn);

// function to build navbar items by section names and whenever click to any of them it will scroll to the this section
(function MakeSectionsItems() {
  //use fragment to the performance and decrease reflow
  const fragment = document.createDocumentFragment();

  sections.forEach((section) => {
    const listElement = document.createElement("li");
    const nameOfSection = section.getAttribute("data-nav");

    listElement.innerHTML = `<li class = menu__link>${nameOfSection}</li>`;
    listElement.id = `section${counter}test`;

    counter++;
    listElement.addEventListener("click", function scrollToTop() {
      section.scrollIntoView(true);
    });

    fragment.appendChild(listElement);
    navigationBar.insertAdjacentElement("beforeEnd", listElement);
  });

  navigationBar.appendChild(fragment);
})();

// check if the section appears in the view port
function checkViewPort(sectionn) {
  var secInfo = {
    top: sectionn.offsetTop,
    height: sectionn.offsetHeight,
  };

  if (
    secInfo.top + secInfo.height < window.pageYOffset ||
    secInfo.top > window.pageYOffset + window.innerHeight
  ) {
    return false;
  } else {
    return true;
  } 

}

// Add class 'active' to section when it's in the viewport to distinguish it
document.addEventListener("scroll", function checkActiveClass() {
  sections.forEach((section) => {
    if (checkViewPort(section) === true) {
      section.classList.add("your-active-class");
      let idd = document.getElementById(`${section.getAttribute("id")}test`);
      // to highlight the navbar item whenever scroll to this section
      idd.firstElementChild.classList.add("active");
    } else {
      let idd = document.getElementById(`${section.getAttribute("id")}test`);
      section.classList.remove("your-active-class");
      idd.firstElementChild.classList.remove("active");
    }
  });
});


