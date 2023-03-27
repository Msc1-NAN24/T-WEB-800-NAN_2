import { Data } from "@react-google-maps/api";

describe("Basic <Data />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Data />);
    cy.get("h2")
      .should("be.visible")
      .should("contain.text", "Vos données sont confidentielles");
  });
});
