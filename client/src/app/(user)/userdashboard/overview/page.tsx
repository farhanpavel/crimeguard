import React from "react";
import { Chart2 } from "./charts/chart2";
import {Chart1} from './charts/chart1'
import {Chart3} from './charts/chart3'
export default function page() {
  return (
    <div>
      <div className="px-20 py-10 grid grid-cols-2 gap-5">
        <Chart1/>
        <Chart2/>
        <div className="col-span-2">
        <Chart3/>
        </div>
      </div>
    </div>
  );
}
