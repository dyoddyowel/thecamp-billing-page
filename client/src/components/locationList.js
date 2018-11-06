import React, { Component } from 'react';

class LocationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.match.params.id,
            clean: ""
        };
    }

    componentDidMount() {
        this.submitHandler();
        let newString = this.state.selected.replace(/-/g, " ");
        this.setState({ clean: newString });
    }

    renderLocations = (options) => {
        let keys = Object.keys(options);
        let values = Object.values(options);
        let arr = [];
        for(let i of keys.keys()) {
            let x = <option value={values[i]} key={i}>{keys[i]}</option>
            arr.push(x);
        }
        return arr;
    }

    capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    submitHandler = (e) => {
        console.log("props locations", this.props.locations);
        let a = this.props.locations;
        let t = this.capitalizeFirstLetter(this.props.match.params.id);
        let x = {
            SiteID: a[t]['siteID'],
            ProgramID: a[t]['programID']
        }
        this.props.saveData(x);
    }

    onChange = (e) => {
        const key = Object.keys(this.props.locations).find(key => this.props.locations[key] === e.target.value);
        this.setState({ selected: key });
        e.target.style.display = 'none';
        this.submitHandler();
        // e.target.class = 'hide';
    }

    render() {
        return(
            <div>
                <h2 className="proper">The Camp @ {this.state.clean}</h2>
                <select onChange={this.onChange} value={this.state.selected} className={this.state.selected !== ('' || null) ? "hide" : "display"}>
                    {
                        this.renderLocations(this.props.locations)
                    }
                </select>
            </div>
        );
    }
}

export default LocationList;