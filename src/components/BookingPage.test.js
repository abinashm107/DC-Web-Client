import { render, screen, cleanup } from "@testing-library/react   ";
import BookingPage from "./BookingPage";

test("Should be able to render Booking Page Component", () => {
  render(<BookingPage />);
    const bookingPage = screen.getByTestId("todo-1");
    expect(bookingPage).toBeInTheDocument();
});
