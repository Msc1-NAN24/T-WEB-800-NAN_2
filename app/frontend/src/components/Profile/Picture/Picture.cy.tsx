import Picture from "@/components/Profile/Picture/Picture";

describe("Basic <Picture />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Picture />);
    cy.get("img").should("be.visible");
    cy.get("button")
      .should("be.visible")
      .should("contain.text", "Changer de photo");
    cy.get("button").should("be.visible").should("contain.text", "Supprimer");
  });
});
