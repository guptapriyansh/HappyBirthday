/*JavaScript*/
canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"), canvas.width = window.innerWidth, canvas.height = window.innerHeight, cx = ctx.canvas.width / 2, cy = ctx.canvas.height / 2;
let confetti = [];
const confettiCount = 300,
	gravity = .5,
	terminalVelocity = 5,
	drag = .075,
	colors = [{
		front: "red",
		back: "darkred"
	}, {
		front: "green",
		back: "darkgreen"
	}, {
		front: "blue",
		back: "darkblue"
	}, {
		front: "yellow",
		back: "darkyellow"
	}, {
		front: "orange",
		back: "darkorange"
	}, {
		front: "pink",
		back: "darkpink"
	}, {
		front: "purple",
		back: "darkpurple"
	}, {
		front: "turquoise",
		back: "darkturquoise"
	}];
resizeCanvas = () => {
	canvas.width = window.innerWidth, canvas.height = window.innerHeight, cx = ctx.canvas.width / 2, cy = ctx.canvas.height / 2
}, randomRange = (t, n) => Math.random() * (n - t) + t, initConfetti = () => {
	for (let t = 0; t < 300; t++) confetti.push({
		color: colors[Math.floor(randomRange(0, colors.length))],
		dimensions: {
			x: randomRange(10, 20),
			y: randomRange(10, 30)
		},
		position: {
			x: randomRange(0, canvas.width),
			y: canvas.height - 1
		},
		rotation: randomRange(0, 2 * Math.PI),
		scale: {
			x: 1,
			y: 1
		},
		velocity: {
			x: randomRange(-25, 25),
			y: randomRange(0, -50)
		}
	})
}, render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height), confetti.forEach(((t, n) => {
		let a = t.dimensions.x * t.scale.x,
			o = t.dimensions.y * t.scale.y;
		ctx.translate(t.position.x, t.position.y), ctx.rotate(t.rotation), t.velocity.x -= t.velocity.x * drag, t.velocity.y = Math.min(t.velocity.y + .5, 5), t.velocity.x += Math.random() > .5 ? Math.random() : -Math.random(), t.position.x += t.velocity.x, t.position.y += t.velocity.y, t.position.y >= canvas.height && confetti.splice(n, 1), t.position.x > canvas.width && (t.position.x = 0), t.position.x < 0 && (t.position.x = canvas.width), t.scale.y = Math.cos(.1 * t.position.y), ctx.fillStyle = t.scale.y > 0 ? t.color.front : t.color.back, ctx.fillRect(-a / 2, -o / 2, a, o), ctx.setTransform(1, 0, 0, 1, 0, 0)
	})), confetti.length <= 10 && initConfetti(), window.requestAnimationFrame(render)
}, initConfetti(), render(), window.addEventListener("resize", (function() {
	resizeCanvas()
})), window.addEventListener("click", (function() {
	initConfetti()
}));
