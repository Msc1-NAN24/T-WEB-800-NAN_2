import React from "react";
import Profile from "@/components/Profile/Profile";

export {};

describe("Basic <Profile />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Profile />);
    cy.get("h1").should("be.visible").should("contain.text", "Mon Profile");
    cy.get("p")
      .should("be.visible")
      .should("contain.text", "Gérer les paramètre de votre profile");
    cy.get("Picture").should("be.visible");
    cy.get("Data").should("be.visible");
    cy.get("UpdateInfo").should("be.visible");
    cy.get("Preference").should("be.visible");
  });
});
