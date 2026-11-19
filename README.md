# Blind Lemming Gravity Room

Open `index.html` in a browser to run the physics test. No installation is required.

## Core rules

- The lemming walks perpendicular to gravity, even in midair. It turns around when it hits a wall in its path. It cannot jump or find its way to the exit on its own.
- The arrow keys set the direction of gravity rather than steering the lemming. Changing gravity resets its fall speed and rotates its walking direction.
- The simulation pauses when the yellow lemming touches the green exit in the upper-right corner. Press **R** to restart.

## Physics reference

| Parameter | Test setting |
| --- | --- |
| Room size | 720 × 400 px |
| Lemming hitbox | 20 × 20 px |
| Starting position | Center at (80, 80) px from the upper-left corner; gravity points down and the lemming walks right. |
| Walking speed | 85 px/s |
| Gravitational acceleration | 700 px/s² |
| Maximum fall speed | 360 px/s |
| Fixed time step | 1/120 s; each frame catches up by at most 0.1 s. |
| Boundary response | Landing stops the fall without a bounce. Walking into a wall reverses the walking direction. |

**Quick check:** Without input, the lemming should land and pace along the floor. Press **R**, then **Up Arrow**: it should fall toward the ceiling, walk along it, and reach the exit. To tune the physics, edit the constants at the top of `main.js`.
