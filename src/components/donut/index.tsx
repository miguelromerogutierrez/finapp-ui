import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

import './styles.scss';

function getRGB(level : number) {
  let initial = [255,255,0,1];
  if (level > 15) {
    initial = [255 - level, 255 - level, 0, 1];
  }
  return `rgba(${initial[0] - (level * 8)}, ${initial[1] - (level * 16)}, ${initial[2] + (level * 8)}, ${initial[3]})`
}

export interface DonutDatasetProp {
  labels: string[],
  data: number[]
}

export interface Props {
  dataset: DonutDatasetProp,
  mainValue: String
}

const Donut : React.FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (!!canvasRef.current) {
      const __chart = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          labels: props.dataset.labels,
          datasets: [
            {
              data: props.dataset.data,
              backgroundColor: props.dataset.data.map((el, ix) => getRGB(ix))
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                if (data.datasets) {
                  let index = tooltipItem.index || 0;
                  let datasetIndex = tooltipItem.datasetIndex || 0;
                  let dataset = data.datasets[datasetIndex] || [];
                  let label = (data.labels||[])[index] || "";

                  return `${label}: ${(dataset.data || [])[index]}%` || ""
                }

                return ""
              }
            }
          }
        }
      });
      setChart(__chart);
    }
    return () => {
      chart?.destroy();
    };
  }, [props.dataset]);

  return (
    <div className="donut" style={{width: 800}}>
      <div className="donut--container">
        <span className="donut--main-value">{props.mainValue}</span>
      </div>
      <canvas ref={ref => canvasRef.current = ref} />
    </div>
  )
};

export default Donut;
