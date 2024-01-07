import React, { Component } from 'react';

import './stopwatch.css';



class Stopwatch extends Component {

  constructor(props) {

    super(props);

    this.state = {

      hours: 0,

      minutes: 0,

      seconds: 0,

      milliseconds: 0,

      isRunning: false,

      isPaused: false,

    };

  }

  handleStartStop = () => {

    this.setState(

      (prevState) => ({

        isRunning: !prevState.isRunning,

        isPaused: false,

      }),

      () => {

        if (this.state.isRunning) {

          this.timer = setInterval(() => {

            this.setState((prevState) => {

              const currentTime = prevState.hours * 3600 + prevState.minutes * 60 + prevState.seconds + prevState.milliseconds / 1000;

              const newTime = currentTime + 0.1; // Increment by 0.1 seconds

              return {

                hours: Math.floor(newTime / 3600),

                minutes: Math.floor((newTime % 3600) / 60),

                seconds: Math.floor(newTime % 60),

                milliseconds: Math.floor((newTime % 1) * 1000),

              };

            });

          }, 100);

        } else {

          clearInterval(this.timer);

        }

      }

    );

  };

  

 handlePause = () => {

    this.setState({

      isRunning: false,

      isPaused: true,

    });

    clearInterval(this.timer);

  };



  handleReset = () => {

    this.setState({

      hours: 0,

      minutes: 0,

      seconds: 0,

      milliseconds: 0,

      isRunning: false,

      isPaused: false,

    });

    clearInterval(this.timer);

  };



  componentWillUnmount() {

    clearInterval(this.timer);

  }



  render() {

    const { hours, minutes, seconds, milliseconds } = this.state;

    return (

      <div className="stopwatch-container">

        <div className="time">

          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}:{String(milliseconds).padStart(3, '0')}

        </div>

        <div className="buttons">

          <button onClick={this.handleStartStop} className='Start-time'>

            {this.state.isRunning ? 'Stop' : 'Start'}

          </button>

         

          <button onClick={this.handleReset} className='Reset-time'>Reset</button>

        </div>

      </div>

    );

  }

}

export default Stopwatch;