particlesJS("particles-js-1", { "particles": { "number": { "value": 100, "density": { "enable": true, "value_area": 500 } }, "color": { "value": "#ffffd4" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 3 }, "image": { "src": "", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 2, "opacity_min": 0.2, "sync": false } }, "size": { "value": 2, "random": true, "anim": { "enable": true, "speed": 58.42970176506395, "size_min": 15.418949076891874, "sync": false } }, "line_linked": { "enable": false, "distance": 0, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 0.3, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 150, "size": 3, "duration": 3.9764658145668523, "opacity": 0.9575978900385481, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, update; count_particles = document.querySelector('.js-count-particles'); update = function () { if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) requestAnimationFrame(update); }; requestAnimationFrame(update);;
