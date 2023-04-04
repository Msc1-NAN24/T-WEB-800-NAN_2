import { Preference } from "@/components/Profile/Preference/Preference";

describe("Basic <Picture />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Preference />);
    cy.get("span")
      .should("be.visible")
      .should("contain.text", "Sauvegarder mes filtres");
    cy.get("input").should("be.visible");
  });
});
