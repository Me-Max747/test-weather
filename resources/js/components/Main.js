import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import City from './City';

class Main extends Component {

    constructor(props) {

        super(props);

        this.state = {
            cities: [],
            currentCity: null
        }
    }

    componentDidMount() {
        fetch('/api/weather')
            .then(response => {
                return response.json();
            })
            .then(cities => {
                cities = Object.values(cities);
                this.setState({ cities: cities });
            });
    }

    renderCities() {
        return this.state.cities.map((city) => {
            return (
                <a href="#" className="list-group-item list-group-item-action"
                   onClick={ () => this.handleClick(city) } key={ city.code }>
                    { city.name }
                </a>
            );
        })
    }

    handleClick(city) {
        this.setState({ currentCity:city });
    }

    render() {
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="list-group">
                            { this.renderCities() }
                        </div>
                    </div>
                </div>
                <City city={ this.state.currentCity } />
            </div>
        );
    }
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
