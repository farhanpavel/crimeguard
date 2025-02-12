"use client";
import { motion } from "framer-motion";

export default function Carousel() {
  return (
    <div>
      <div className="w-full inline-flex flex-nowrap overflow-hidden mt-5">
        {/* Motion div for animation */}
        <motion.div
          className="flex items-center justify-start space-x-8"
          animate={{
            x: ["0%", "-100%"], // Moves from start to end
          }}
          transition={{
            repeat: Infinity, // Loop infinitely
            duration: 25, // Adjust the speed of the animation
            ease: "linear", // Smooth continuous animation
          }}
        >
          {/* First list of logos */}
          <ul className="flex items-center justify-start space-x-8">
            <li>
              <img
                src="/images/facebook.svg"
                className="fill-blue-600"
                alt="Facebook"
              />
            </li>
            <li>
              <img
                src="/images/disney.svg"
                className="fill-blue-500"
                alt="Disney"
              />
            </li>
            <li>
              <img
                src="/images/airbnb.svg"
                className="text-red-500"
                alt="Airbnb"
              />
            </li>
            <li>
              <img src="/images/apple.svg" className="text-black" alt="Apple" />
            </li>
            <li>
              <img
                src="/images/spark.svg"
                className="text-yellow-400"
                alt="Spark"
              />
            </li>
            <li>
              <img
                src="/images/samsung.svg"
                className="text-blue-700"
                alt="Samsung"
              />
            </li>
            <li>
              <img
                src="/images/quora.svg"
                className="text-red-600"
                alt="Quora"
              />
            </li>
            <li>
              <img
                src="/images/sass.svg"
                className="text-pink-500"
                alt="Sass"
              />
            </li>
          </ul>

          {/* Duplicate the list to make the animation seamless */}
          <ul className="flex items-center justify-start space-x-8">
            <li>
              <img
                src="/images/facebook.svg"
                className="text-blue-600"
                alt="Facebook"
              />
            </li>
            <li>
              <img
                src="/images/disney.svg"
                className="text-blue-500"
                alt="Disney"
              />
            </li>
            <li>
              <img
                src="/images/airbnb.svg"
                className="text-red-500"
                alt="Airbnb"
              />
            </li>
            <li>
              <img src="/images/apple.svg" className="text-black" alt="Apple" />
            </li>
            <li>
              <img
                src="/images/spark.svg"
                className="text-yellow-400"
                alt="Spark"
              />
            </li>
            <li>
              <img
                src="/images/samsung.svg"
                className="text-blue-700"
                alt="Samsung"
              />
            </li>
            <li>
              <img
                src="/images/quora.svg"
                className="text-red-600"
                alt="Quora"
              />
            </li>
            <li>
              <img
                src="/images/sass.svg"
                className="text-pink-500"
                alt="Sass"
              />
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
