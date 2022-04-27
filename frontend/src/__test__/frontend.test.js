import React from "react";
import {render, fireEvent} from "@testing-library/react"
import SaveButton from "../components/SaveButton"
import Theme from "../components/Theme"
import SettingsPopup from "../components/SettingsPopup";
import '@testing-library/jest-dom/extend-expect'

// User story 3
test("save button white when unsaved",()=>{
    const {getByTestId} = render(<SaveButton isSaved={false} />)
    const unsave_svg = getByTestId("test-save-svg")
    expect(unsave_svg).toHaveClass("save-svg")

})

test("save button blue when saved",()=>{
    const {getByTestId} = render(<SaveButton isSaved={true} />)
    const saved_svg = getByTestId("test-save-svg")
    expect(saved_svg).toHaveClass("save-svg primary")
})

// User story 5
test("Auto button selected by default",()=>{
    const {unmount} = render(<Theme />)
    unmount()
    const{getByTestId} = render(<SettingsPopup />)

    const dark_button = getByTestId("dark-button")
    const light_button = getByTestId("light-button")
    const auto_button = getByTestId("auto-button")

    expect(dark_button).toHaveClass("button")
    expect(light_button).toHaveClass("button")
    expect(auto_button).toHaveClass("button selected")
})

test("Clicking on a button selects it", ()=>{
    const {getByTestId} = render(<SettingsPopup />)

    const dark_button = getByTestId("dark-button")
    const light_button = getByTestId("light-button")
    const auto_button = getByTestId("auto-button")

    fireEvent.click(dark_button)
    expect(dark_button).toHaveClass("button selected")
    expect(light_button).toHaveClass("button")
    expect(auto_button).toHaveClass("button")

    fireEvent.click(light_button)
    expect(dark_button).toHaveClass("button")
    expect(light_button).toHaveClass("button selected")
    expect(auto_button).toHaveClass("button")

    fireEvent.click(auto_button)
    expect(dark_button).toHaveClass("button")
    expect(light_button).toHaveClass("button")
    expect(auto_button).toHaveClass("button selected")
})

test("Theme is auto by default",()=>{
    render(<Theme />)
    expect(document.body.classList[0]).toBe("colorAuto")
})

test("Theme switches when button is clicked",()=>{
    render(<Theme />)

    const {getByTestId} = render(<SettingsPopup />)
    const dark_button = getByTestId("dark-button")
    const light_button = getByTestId("light-button")
    const auto_button = getByTestId("auto-button")

    fireEvent.click(dark_button)
    expect(document.body.classList[0]).toBe("colorDark")
    fireEvent.click(light_button)
    expect(document.body.classList[0]).toBe("colorLight")
    fireEvent.click(auto_button)
    expect(document.body.classList[0]).toBe("colorAuto")
})




