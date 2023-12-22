import React, {Component, useEffect, useState} from 'react';
import { Line, A } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { memo } from 'react';

Chart.register(StreamingPlugin, ZoomPlugin);

const ChartJS = memo(({handlePrice}) => {
  //we use simple variable instead of state because of specific chart library behavior
  let price;

  useEffect(() => {
    const socket = new WebSocket('wss://casino777.inc4.net/ws/btcusdt');
    socket.addEventListener('message', (event) => {
      price = +event.data;
      handlePrice(price);

    });
  }, []);

  return (
    <Line
      data={{
        datasets: [{
          data: []
        }]
      }}
      options={{
        scales: {
          y: {
            position: 'right',
          },
          x: {
            type: 'realtime',
            realtime: {
              frameRate: 30,
              duration: 20000,
              refresh: 500,
              ttl: 80000,
              delay: 500,
              onRefresh: function (chart) {
                chart.data.datasets[0].data.push({
                  x: Date.now(),
                  y: price
                });
              }
            }
          }
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.3,
            borderColor: '#ffb017'
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              pinch: {
                enabled: true
              },
              wheel: {
                enabled: true
              },
              mode: 'x',
              ttl: 20000,
              refresh: 500,
            },
            limits: {
              x: {
                minDelay: 10,
                maxDelay: 100000,
                minDuration: 1000,
                maxDuration: 80000
              }
            }
          },
          legend: {
            display: false
          }
        }
      }}
    />
  );
});

export default ChartJS;