import { introJs } from "intro.js";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import customerTour from "./customerTour";
import shopOwnerTour from "./shopOwnerTour";
import * as Collections from "../../../../lib/collections/collections";

const intro = introJs();

const tour = () => {
  let steps;
  // Determine the tour to display based on the type of user
  if (Reaction.hasPermission("admin")) {
    steps = shopOwnerTour;
  } else {
    steps = customerTour;
  }
  // Set intro options
  intro.setOptions({
    showBullets: false,
    showProgress: true,
    scrollToElement: true,
    steps
  });

  // Set localstorage when tour is over
  intro.oncomplete(() => {
    const user = Collections.Accounts.find({ userId: Meteor.userId() }).fetch();
    if (Meteor.user().emails.length === 0) {
      localStorage.setItem("takenTour", true);
    } else if (user) {
      Collections.Accounts.update(
        { _id: Meteor.userId() },
        { $set: { takenTour: true } }
      );
    } else {
      return user;
    }
  });

  // Start tour
  setTimeout(() => {
    intro.start();
  }, 3000);
};


//* ************************************************ *//
//* *************APP MANUAL TOUR STARTS HERE******** *//
//* ************************************************ *//
const startManualTour = () => {
  let steps;
  // Determine the tour to display based on the type of user
  if (Reaction.hasPermission("admin")) {
    steps = shopOwnerTour;
  } else {
    steps = customerTour;
  }
  // Set intro options
  intro.setOptions({
    showBullets: false,
    showProgress: true,
    scrollToElement: true,
    steps
  });

  intro.start();
};

const tourSetup = {
  tour,
  startManualTour
};

export default tourSetup;
