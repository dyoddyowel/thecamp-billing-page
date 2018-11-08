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
        console.log(text)
        if (text.search('-') > -1)
        {
            let newString;
            let a = text.split('-');
            if(a.length > 2) {
                let firstword = a[0].charAt(0).toUpperCase() + a[0].slice(1);
                let secondword = a[1].charAt(0).toUpperCase()+ a[1].slice(1);
                let thirdword = a[2].charAt(0).toUpperCase()+ a[2].slice(1);
                newString = firstword + '-' + secondword + '-' + thirdword;
            } else {
                let firstword = a[0].charAt(0).toUpperCase() + a[0].slice(1);
                let secondword = a[1].charAt(0).toUpperCase()+ a[1].slice(1);
                    newString = firstword + '-' + secondword;
            }
            return newString;

        }
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    submitHandler = (e) => {
        let a = this.props.locations;
        console.log(this.props.match.params.id)
        let t = this.capitalizeFirstLetter(this.props.match.params.id);
        let x = {
            SiteID: a[t]['siteID'],
            ProgramID: a[t]['programID'],
            TagID: a[t]['tagID'],
            PixelID: a[t]['pixelID']
        }
        this.props.initPixel(x.PixelID);
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