import { Chart1 } from "@/app/(user)/userdashboard/overview/charts/chart1";
import { Chart2 } from "@/app/(user)/userdashboard/overview/charts/chart2";
import { Chart3 } from "@/app/(user)/userdashboard/overview/charts/chart3";
import React from "react";

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
