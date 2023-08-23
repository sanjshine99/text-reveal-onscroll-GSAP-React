import React, { useEffect, useRef } from "react";
import "./TextReveal.css"; // Importing a CSS file for styling
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Importing the ScrollTrigger plugin

function TextReveal() {
  const [wordsRef, setWordsRef] = useArrayRef(); // Using a custom hook to manage an array of refs
  const triggerRef = useRef(null);

  function useArrayRef() {
    const wordsRef = useRef([]); // Creating a ref to hold an array of refs
    wordsRef.current = [];
    return [wordsRef, (ref) => ref && wordsRef.current.push(ref)]; // Adding a new ref to the array
  }

  gsap.registerPlugin(ScrollTrigger); // Registering the ScrollTrigger plugin
  const text =
    "ACT BECAUSE YOU HAVE HANDS, THAT BRING TO LIFE YOUR EVERY COMMAND. WITH THEM YOU CAN CREATE AND BUILD, AND BRING TO LIFE WHAT ONCE WAS STILLED.";

  const words = text.split(" "); // Splitting the text into an array of words
  useEffect(() => {
    const anim = gsap.to(wordsRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: 0.5, // Adjusting the scroll speed
        start: "top center",
        end: "bottom 85%",
      },
      color: "#2A2A2A",
      duration: 10,
      stagger: {
        each: 1,
        from: "random", // Animating each word from a random starting point
      },
    });
    return () => {
      anim.kill(); // Killing the animation when the component unmounts
    };
  }, [wordsRef]);

  return (
    <div className="container">
      {/* A container div for centering */}
      <div className="spacing-small"></div>
      <div className="reveal">
        <div ref={triggerRef}>
          {words.map((word, index) => (
            <span className="reveal-text" key={index} ref={setWordsRef}>
              {word} {/* Adding a space after each word */}
            </span>
          ))}
        </div>
      </div>
      <div className="spacing"></div>
    </div>
  );
}

export default TextReveal;
