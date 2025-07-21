import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../index";

describe("LoadingSpinner Component", () => {
  it("renders loading spinner with default props", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status", { name: "Carregando..." });

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("h-6", "w-6", "text-primary-600");
  });

  it("applies small size correctly", () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("h-4", "w-4");
  });

  it("applies medium size by default", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("h-6", "w-6");
  });

  it("applies large size correctly", () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("h-8", "w-8");
  });

  it("applies extra large size correctly", () => {
    render(<LoadingSpinner size="xl" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("h-12", "w-12");
  });

  it("applies primary variant by default", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("text-primary-600");
  });

  it("applies secondary variant correctly", () => {
    render(<LoadingSpinner variant="secondary" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("text-secondary-600");
  });

  it("applies white variant correctly", () => {
    render(<LoadingSpinner variant="white" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("text-white");
  });

  it("applies gray variant correctly", () => {
    render(<LoadingSpinner variant="gray" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("text-gray-600");
  });

  it("applies custom className", () => {
    render(<LoadingSpinner className="custom-spinner" />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("custom-spinner");
  });

  it("has animate-spin class for animation", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveClass("animate-spin");
  });

  it("has proper accessibility attributes", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");

    expect(spinner).toHaveAttribute("role", "status");
    expect(spinner).toHaveAttribute("aria-label", "Carregando...");
  });

  it("renders with label when provided", () => {
    render(<LoadingSpinner label="Loading data..." />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders without label by default", () => {
    render(<LoadingSpinner />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
