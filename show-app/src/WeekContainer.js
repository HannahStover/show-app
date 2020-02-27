import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import './Card.css';

class WeekContainer extends React.Component {
  state = {
    fullData: [],
    dailyData: [],
    degreeType: 'fahrenheit'
  };

  updateForecastDegree = event => {
    this.setState(
      {
        degreeType: event.target.value
      }
      //   () => console.log(this.state)
    );
  };

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.owmKey}`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading =>
          reading.dt_txt.includes('18:00:00')
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData
          },
          () => console.log(this.state)
        );
      });
  };

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index, degreeType) => (
      <DayCard
        reading={reading}
        key={index}
        degreeType={this.state.degreeType}
      />
    ));
  };

  render() {
    return (
      <div className='container'>
        <h1 className='display-1'>
          5-Day Forecast
          <hr />
        </h1>
        <h5 className='display-5'>Seattle, US</h5>
        <DegreeToggle
          updateForecastDegree={this.updateForecastDegree}
          degreeType={this.state.degreeType}
        />
        <div className='row justify-content-center'>
          {this.formatDayCards()}
        </div>
      </div>
    );
  }
}

export default WeekContainer;
