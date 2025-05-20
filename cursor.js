document.addEventListener("DOMContentLoaded", () => {
const trailSize = 20; // Number of trail elements
const trailElements = [];
let mouseX = 0, mouseY = 0;
let isMouseMoving = false;

// Create trailing elements but DO NOT place them yet
for (let i = 0; i < trailSize; i++) {
    let trail = document.createElement("div");
    trail.classList.add("trail");
    const cur = document.getElementById("cursor");
    cur.appendChild(trail);
    trail.style.opacity = "0"; // Hide initially
    trailElements.push({ element: trail, x: -200, y: -200 }); // Start off-screen
}

// Mouse movement event
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMouseMoving) {
        // On the first move, initialize all trails to the body.cursor position
        trailElements.forEach((point) => {
            point.x = mouseX;
            point.y = mouseY;
        });
    }

    isMouseMoving = true;

    // Reveal trails only after movement starts
    trailElements.forEach(({ element }) => {
        element.style.opacity = "1";
    });
});

// Animation loop
function animate() {
    if (!isMouseMoving) return requestAnimationFrame(animate);

    let prevX = mouseX, prevY = mouseY;

    trailElements.forEach((point, index) => {
        let { element, x, y } = point;

        // Apply smooth easing
        let dx = (prevX - x) * 0.14;
        let dy = (prevY - y) * 0.14;

        point.x += dx;
        point.y += dy;

        element.style.transform = `translate(${point.x}px, ${point.y}px) scale(${1 - index * 0.05})`;

        prevX = point.x;
        prevY = point.y;
    });

    requestAnimationFrame(animate);
}

// Start animation loop
animate();

});
