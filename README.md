# Personal Website By Atharva Kerkar

https://akerkar2005.github.io

## Introduction
Hi! This public GitHub repository holds the source code for my personal website. I am hosting it (the URL link to the website will be added at the start of this README once this is finalized) so that potential recruiters and other interested people can see what I've been up to and learn more about me. In this README, I will go over the thoughts I had towards each section of this website, some tests I ran, and the things I learned through this project.

## Section 1: The Terminal
The terminal was somewhat challenging to code. Keep in mind that this was the first time I ever coded a website with React, and the first time I designed a website myself without proper help. I wanted to create a Computer Science-y introduction to my website and I was inspired by the [GitHub software engineering mailing list](https://swelist.com) to have an animated introduction that had something to do with a pseudo terminal. I got to work and researched online, and the solution I settled with was somewhat inefficient but got the job done. I hope that, with more experience, I can find efficient ways to solve problems like these, especially in the backend aspect of JavaScript, Python, or other lower level languages (which I didn't really do for any parts of this website). In regards to whether I will update the introduction... I am not sure yet. It is not mobile-friendly, and I am not sure if I ever will make it mobile friendly. I feel like it is short, simple, sweet, and engaging enough to the average user on a decent computer, and I had a lot of fun with it. I started learning about how CSS, JSX, and React worked together during this part of the project. My only hope for the future web pages I design is that I won't struggle as much as I did with this! It was quite the learning curve. For the next web pages, I will be sure to optimize for mobile if possible.

Summary of things I learned:
- dealing with race conditions for an asynchronous function;
- how to make text slowly appear one at a time on screen with JavaScript;
- general CSS workshopping and making sure the frontend looks good.

## Section 2: The Home Page
Setting up the home page was trickier than it seemed at first glance, but after doing it, I feel like I did a bulk of the work going forward. 

In this section, I designed the sticky header with navigation buttons (the links they follow when clicked are detailed in App.js and Home.js), and I'm still optimizing this functionality for phones and other devices with simple CSS. The way I am optimizing for all devices involves some level of brute-force and playing with CSS precedence.

## Section 3: The Projects Page
I wanted to be somewhat creative with this page even though, as of today, I do not have many projects under my belt. Regardless, I tried making a cool circular React component that consists of the programming languages and frameworks I have delved into. After that, I thought of just doing a generic timeline for the projects I have done. Nothing much to say about this.

## Section 4: The 182 Page
This is an interesting page to include because I was originally going to design my website to only have 2 pages ——— a home page and a projects page. I wasn't really planning on digitizing my 182 project for a couple reasons (the biggest reason being the fact that some entries in the book are insane). Still, I wanted it to be out there because I believe my target audience won't be interested in something like this and I still think it's a cool social experiment. However, it would be strange if any potential recruiters saw it, so I set a complicated password and wrote a small backend, deploying the code to Heroku. Additionally, I moved the 182 project entries to Cloudfare and parse a single file to get the first N entries (I have to change this every time I deploy), making the links anonymous. My Cloudfare worker has a CORS policy that is pretty good... I think. This is the first time I have used Cloudfare and its free plan is incredible. Hopefully nobody stress tests my innocent website :/ but I think it's going to be fine.

## Final Thoughts
For the final part of developing this website, I started relying a lot more on AI for the frontend since this entire website is frontend and LLMs do decently when it comes to frontend development. I had some interesting epiphanies on the incorporation of LLMs into the frontend workflow, and I slowly realized that while I was getting a good head start, the actual building process went so much slower and the code got more muddled and difficult to understand. Had I just worked on it myself, I would have solved a lot of the problems the LLM couldn't see for a smaller net cost even though I didn't see it that way. I think it might be fine to use LLMs for a good start on a project. This whole situation is attributed to how lazy I got on the last leg of the project because I just wanted to move on to something else, but I hope you got some enjoyment out of the finished product. If I had to develop a new website, I would embrace a more minimalistic design and try to not use React next time to try something else out. React was pretty cool and some of the tricks you can do with it were impressive. I looked at a couple other personal websites and realized how cool it is for them to make their website essentially just Markdown, embracing minimalism without sacrificing aesthetic. I would love to do that if I ever wanted to write blogs, but that's for another time.

## Credits
Like I said on my final thoughts, I am bummed that I had to use LLMs to develop quite a large part of this website (it is harder to credit people for certain parts if I don't know where the code might've come from), but I also used some tutorials and cool gimmicks online that need to be credited.
### Hamburger Icon
If you were on your phone and saw this website, you'd see that a hamburger icon is integrated into this website. The hamburger icon itself is not my code, and here is the tutorial I followed to integrate it into my own website: https://www.youtube.com/watch?v=dAIVbLrAb_U ; there's some changes I needed to make for React, but this was basically the framework I used.
### Terminal Intro
Yes, the terminal introduction you saw was not my idea, but it's pretty cool I implemented it right? I am crediting it again in the credits section: https://swelist.com (it's ironic that I got inspired by a job mailing list website for what is essentially my own resume website).