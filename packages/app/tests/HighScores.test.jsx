import { expect, it, describe } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "./test-utils/__HighScores";

describe("HighScores component", () => {
  it("renders high scores table for puzzle #1", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent(/high scores/i);
      expect(screen.getByRole("caption")).toHaveTextContent(/puzzle #1/i);
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("updates the table with the selected puzzle data", async () => {
    renderComponent();
    const user = userEvent.setup();

    await waitFor(async () => {
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent(/puzzle #1/i);
      await user.click(button);

      const link = screen.getByRole("link", { name: /puzzle #2/i });
      expect(link).toBeInTheDocument();
      await user.click(link);

      expect(screen.getByRole("caption")).toHaveTextContent(/puzzle #2/i);
    });
  });

  it("renders a message indicating no high scores instead of table", async () => {
    renderComponent(true);

    await waitFor(() => {
      expect(screen.getByText(/no high scores/i)).toBeInTheDocument();
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });
  });
});
