import React, { Component } from 'react';

class City  extends Component {

    constructor(props) {

        super(props);
        this.state = {
            weatherCity: null
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.city !== prevProps.city && this.props.city){
            fetch('/api/weather/'+this.props.city.code)
                .then(response => {
                    return response.json();
                })
                .then(weather => {
                    //weather = Object.values(weather);
                    this.setState({ weatherCity: weather });
                });
        }
    }

    renderWeather(weather) {
        return weather.items.map((item) => {
            return (
                <tr key={item.code}>
                    <th scope="row">{ item.datetime }</th>
                    <td>{ item.temp }</td>
                    <td>{ item.humidity }</td>
                    <td>{ item.clouds }</td>
                    <td>{ item.wind }</td>
                    <td>{ item.description }</td>
                </tr>
            );
        })
    }

    render() {
        if(!this.props.city || !this.state.weatherCity) {
            return(
                <div className="row mt-5">
                    <div className="col-12">
                        <h2>Выберите город из списка</h2>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="row mt-5">
                    <div className="col-12">
                        <h2>Погода в городе {this.props.city.name}</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Дата и время</th>
                                <th scope="col">Температура</th>
                                <th scope="col">Влажность</th>
                                <th scope="col">Облачность</th>
                                <th scope="col">Ветер</th>
                                <th scope="col">Погода</th>
                            </tr>
                            </thead>
                            <tbody>
                                { this.renderWeather(this.state.weatherCity) }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default City;
