# Personal Website By Atharva Kerkar

## Introduction
Hi! This public GitHub repository holds the source code for my personal website. I am hosting it (the URL link to the website will be added at the start of this README once this is finalized) so that potential recruiters and other interested people can see what I've been up to and learn more about me. In this README, I will go over the thoughts I had towards each section of this website, some tests I ran, and the things I learned through this project.

## Section 1: The Terminal
The terminal was somewhat challenging to code. Keep in mind that this was the first time I ever coded a website with React, and the first time I designed a website myself without proper help. I wanted to create a Computer Science-y introduction to my website and I was inspired by the [GitHub software engineering mailing list](https://swelist.com) to have an animated introduction that had something to do with a pseudo terminal. I got to work and researched online, and the solution I settled with was somewhat inefficient but got the job done. I hope that, with more experience, I can find efficient ways to solve problems like these, especially in the backend aspect of JavaScript, Python, or other lower level languages (which I didn't really do for any parts of this website). In regards to whether I will update the introduction... I am not sure yet. It is not mobile-friendly, and I am not sure if I ever will make it mobile friendly. I feel like it is short, simple, sweet, and engaging enough to the average user on a decent computer, and I had a lot of fun with it. I started learning about how CSS, JSX, and React worked together during this part of the project. My only hope for the future web pages I design is that I won't struggle as much as I did with this! It was quite the learning curve. For the next web pages, I will be sure to optimize for mobile if possible.

Summary of things I learned:
- dealing with race conditions for an asynchronous function;
- how to make text slowly appear one at a time on screen with JavaScript;
- general CSS workshopping and making sure the frontend looks good.

## Section 2: The Home Page
Setting up the home page was trickier than it seemed at first glance, but after doing this, I feel like I did a bulk of the work going forward. 

In this section, I designed the sticky header with navigation buttons (the links they follow when clicked are detailed in App.js and Home.js), and optimized this functionality for phones and other devices with simple CSS. The way I optimized for all devices involved some level of brute-force and playing with CSS precedence. However, I think it worked out nicely overall.