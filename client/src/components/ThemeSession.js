import React, { Component } from 'react';

class ThemeSession extends Component {
    constructor() {
        super()
        this.state = {
            themesNames: [],
            selectedTheme: null
        }
    }

    componentDidMount() {
        fetch('/themes').then(r => r.json())
            .then(obj => this.setState({
                themesNames: obj.themesNames,
                selectedTheme: obj.theme
            }));
    }

    HandleThemeChanged(newTheme) {
        fetch('/themes', {
            method: 'POST',
            body: JSON.stringify({ themeName: newTheme }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(r => r.json())
            .then(selectedTheme => this.setState({ selectedTheme }));
    }

    render() {
        const { themesNames, selectedTheme } = this.state;
        if (themesNames.length === 0) {
            return <h2>Loading... </h2>
        }

        if (selectedTheme == null) {
            return <h2>Loading... </h2>
        }

        const divStyle = {
            color: selectedTheme.color,
            background: selectedTheme.background,
            height: selectedTheme.height
        }

        return (
            <div style={divStyle}>
                <h1>Theme type:</h1>
                <select style={{ width: "100px" }} onChange={(event) => this.HandleThemeChanged(event.target.value)}>
                    {/* <option value="none"></option> */}
                    {themesNames.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                </select>
            </div >);
    }
}


export default ThemeSession;