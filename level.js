document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;

    // Check if the page is level.html
    if (pathname.includes('level.html')) {
        // Add event listeners to level buttons
        document.getElementById('easy-button').addEventListener('click', function() {
            sessionStorage.setItem('ballSpeed', 'slow');
            window.location.href = 'index.html';
        });

        document.getElementById('medium-button').addEventListener('click', function() {
            sessionStorage.setItem('ballSpeed', 'moderate');
            window.location.href = 'index.html';
        });

        document.getElementById('hard-button').addEventListener('click', function() {
            sessionStorage.setItem('ballSpeed', 'fast');
            window.location.href = 'index.html';
        });
    } else {
        // Check if the level button is clicked
        document.getElementById('level-button').addEventListener('click', function() {
            window.location.href = 'level.html';
        });

        // Adjust ball speed based on the selected level
        let ballSpeed = 4; // Default speed

        const selectedLevel = sessionStorage.getItem('ballSpeed');
        switch (selectedLevel) {
            case 'slow':
                ballSpeed = 2.5; // Adjust speed for Easy level
                break;
            case 'fast':
                ballSpeed = 5; // Adjust speed for Hard level
                break;
            // Medium level uses default speed
        }

        // Update ballSpeedX and ballSpeedY with the adjusted speed
        ballSpeedX = ballSpeed;
        ballSpeedY = ballSpeed;
    }
});
