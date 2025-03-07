let circles = [];
let lastScrollY = 0;
let scrollStopped = false;
let floatOffset = [];

function setup() {
    createCanvas(windowWidth, windowHeight * 2);
    noStroke();

    // Create multiple circles with different pastel colors and sizes
    for (let i = 0; i < 20; i++) {  // Increased number of bubbles
        circles.push({
            x: random(width),
            y: random(height * 1.5),
            size: random(50, 150),
            speed: random(0.2, 1),
            baseColor: color(random(200, 255), random(150, 255), random(200, 255)) // Pastel colors
        });
        floatOffset.push(random(TWO_PI)); // Random starting position for float animation
    }
}

function draw() {
    background(20, 20, 30);  // Dark background

    let scrollY = window.scrollY;
    scrollStopped = abs(scrollY - lastScrollY) < 1; // Check if scrolling stopped

    // Loop through each circle and animate it
    for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        let newY = c.y - scrollY * c.speed;
        let fade = map(newY, 0, height * 1.5, 255, 50, true);

        // If scrolling stopped, make the circles float
        if (scrollStopped) {
            floatOffset[i] += 0.05; // Increase offset over time
            newY += sin(floatOffset[i]) * 5; // Floating effect
        }

        // Apply the pastel colors and fading effect
        fill(c.baseColor.levels[0], c.baseColor.levels[1], c.baseColor.levels[2], fade); 
        ellipse(c.x, newY, c.size, c.size);  // Draw the bubble
    }

    lastScrollY = scrollY; // Update last scroll position
}
